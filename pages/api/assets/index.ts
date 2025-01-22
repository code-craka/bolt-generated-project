import { NextApiRequest, NextApiResponse } from 'next'
    import { getSession } from 'next-auth/react'
    import { PrismaClient } from '@prisma/client'
    import { z } from 'zod'
    import rateLimit from 'express-rate-limit'
    import { applyMiddleware } from '../../middleware'

    const prisma = new PrismaClient()

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100
    })

    const assetSchema = z.object({
      name: z.string().min(3),
      type: z.enum(['IMAGE', 'VIDEO', 'DOCUMENT']),
      url: z.string().url(),
      campaignId: z.number().positive().optional()
    })

    export default async function handler(
      req: NextApiRequest,
      res: NextApiResponse
    ) {
      try {
        await applyMiddleware(req, res, limiter)
        const session = await getSession({ req })
        
        if (!session) {
          return res.status(401).json({ error: 'Unauthorized' })
        }

        switch (req.method) {
          case 'GET':
            if (req.query.id) {
              const asset = await prisma.asset.findUnique({
                where: { id: Number(req.query.id) }
              })
              return res.json(asset || { error: 'Asset not found' })
            } else {
              const assets = await prisma.asset.findMany({
                where: { userId: session.user.id }
              })
              return res.json(assets)
            }

          case 'POST':
            try {
              const data = assetSchema.parse(req.body)
              const asset = await prisma.asset.create({
                data: {
                  ...data,
                  userId: session.user.id
                }
              })
              return res.status(201).json(asset)
            } catch (error) {
              return res.status(400).json({ error: 'Invalid data' })
            }

          case 'DELETE':
            if (!req.query.id) {
              return res.status(400).json({ error: 'Missing asset ID' })
            }
            await prisma.asset.delete({
              where: { id: Number(req.query.id) }
            })
            return res.status(204).end()

          default:
            return res.status(405).json({ error: 'Method not allowed' })
        }
      } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
      }
    }
