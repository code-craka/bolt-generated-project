import NextAuth from "next-auth"
    import CredentialsProvider from "next-auth/providers/credentials"
    import { PrismaClient } from "@prisma/client"
    import bcrypt from "bcryptjs"

    const prisma = new PrismaClient()

    export default NextAuth({
      providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if (!credentials) return null
            
            const user = await prisma.user.findUnique({
              where: { email: credentials.email }
            })

            if (!user) return null

            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (!isValid) return null

            return { id: user.id, email: user.email, role: user.role }
          }
        })
      ],
      callbacks: {
        async jwt({ token, user }) {
          if (user) {
            token.role = user.role
          }
          return token
        },
        async session({ session, token }) {
          session.user.role = token.role
          return session
        }
      },
      secret: process.env.NEXTAUTH_SECRET,
      pages: {
        signIn: "/auth/signin"
      }
    })
