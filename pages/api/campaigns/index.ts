import { NextApiRequest, NextApiResponse } from 'next'
    import { getSession } from 'next-auth/react'
    import { PrismaClient } from '@prisma/client'
    import { z } from 'zod'

    const prisma = new PrismaClient()

    const campaignSchema = z.object({
      name: z.string().min(3),
      description: z.string().optional(),
      startDate: z.string().datetime(),
      endDate: z.string().datetime().optional(),
      budget: z.number().positive()
    })

    export default async function handler(
      req: NextApiRequest,
      res: NextApiResponse
    ) {
      const session = await getSession({ req })
      
      if (!session) {
        return res.status(401).json({ error: 'Unauthorized' })
      }

      if (req.method === 'GET') {
        const campaigns = await prisma.campaign.findMany({
          where: { userId: session.user.id }
        })
        return res.json(campaigns)
      }

      if (req.method === 'POST') {
        try {
          const data = campaignSchema.parse(req.body)
          const campaign = await prisma.campaign.create({
            data: {
              ...data,
              userId: session.user.id
            }
          })
          return res.status(201).json(campaign)
        } catch (error) {
          return res.status(400).json({ error: 'Invalid data' })
        }
      }

      return res.status(405).json({ error: 'Method not allowed' })
    }
