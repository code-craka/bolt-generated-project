import { NextApiRequest, NextApiResponse } from 'next'
    import { getSession } from 'next-auth/react'
    import { PrismaClient } from '@prisma/client'
    import { z } from 'zod'

    const prisma = new PrismaClient()

    const referralSchema = z.object({
      customerEmail: z.string().email(),
      conversionValue: z.number().positive(),
      campaignId: z.number().positive()
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
        const referrals = await prisma.referral.findMany({
          where: { userId: session.user.id },
          include: { campaign: true }
        })
        return res.json(referrals)
      }

      if (req.method === 'POST') {
        try {
          const data = referralSchema.parse(req.body)
          const referral = await prisma.referral.create({
            data: {
              ...data,
              userId: session.user.id
            }
          })
          return res.status(201).json(referral)
        } catch (error) {
          return res.status(400).json({ error: 'Invalid data' })
        }
      }

      return res.status(405).json({ error: 'Method not allowed' })
    }
