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

    const payoutSchema = z.object({
      amount: z.number().positive(),
      commissionIds: z.array(z.number().positive())
    })

    const updatePayoutSchema = z.object({
      status: z.enum(['PENDING', 'PAID', 'FAILED'])
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
              const payout = await prisma.payout.findUnique({
                where: { id: Number(req.query.id) },
                include: { commissions: true }
              })
              return res.json(payout || { error: 'Payout not found' })
            } else {
              const payouts = await prisma.payout.findMany({
                where: { userId: session.user.id }
              })
              return res.json(payouts)
            }

          case 'POST':
            try {
              const data = payoutSchema.parse(req.body)
              const payout = await prisma.payout.create({
                data: {
                  amount: data.amount,
                  status: 'PENDING',
                  userId: session.user.id,
                  commissions: {
                    connect: data.commissionIds.map(id => ({ id }))
                  }
                }
              })
              return res.status(201).json(payout)
            } catch (error) {
              return res.status(400).json({ error: 'Invalid data' })
            }

          case 'PUT':
            if (!req.query.id) {
              return res.status(400).json({ error: 'Missing payout ID' })
            }
            try {
              const data = updatePayoutSchema.parse(req.body)
              const payout = await prisma.payout.update({
                where: { id: Number(req.query.id) },
                data
              })
              return res.json(payout)
            } catch (error) {
              return res.status(400).json({ error: 'Invalid data' })
            }

          default:
            return res.status(405).json({ error: 'Method not allowed' })
        }
      } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
      }
    }
