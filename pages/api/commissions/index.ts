import { NextApiRequest, NextApiResponse } from 'next'
    import { getSession } from 'next-auth/react'
    import { PrismaClient } from '@prisma/client'
    import { z } from 'zod'
    import rateLimit from 'express-rate-limit'
    import { applyMiddleware } from '../../middleware'

    const prisma = new PrismaClient()

    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100 // limit each IP to 100 requests per windowMs
    })

    const commissionSchema = z.object({
      referralId: z.number().positive(),
      amount: z.number().positive()
    })

    const updateCommissionSchema = z.object({
      status: z.enum(['PENDING', 'PAID', 'CANCELLED'])
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
              const commission = await prisma.commission.findUnique({
                where: { id: Number(req.query.id) },
                include: { referral: true }
              })
              return res.json(commission || { error: 'Commission not found' })
            } else {
              const commissions = await prisma.commission.findMany({
                where: { referral: { userId: session.user.id } }
              })
              return res.json(commissions)
            }

          case 'POST':
            try {
              const data = commissionSchema.parse(req.body)
              const commission = await prisma.commission.create({
                data: {
                  ...data,
                  status: 'PENDING'
                }
              })
              return res.status(201).json(commission)
            } catch (error) {
              return res.status(400).json({ error: 'Invalid data' })
            }

          case 'PUT':
            if (!req.query.id) {
              return res.status(400).json({ error: 'Missing commission ID' })
            }
            try {
              const data = updateCommissionSchema.parse(req.body)
              const commission = await prisma.commission.update({
                where: { id: Number(req.query.id) },
                data
              })
              return res.json(commission)
            } catch (error) {
              return res.status(400).json({ error: 'Invalid data' })
            }

          case 'DELETE':
            if (!req.query.id) {
              return res.status(400).json({ error: 'Missing commission ID' })
            }
            await prisma.commission.delete({
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
