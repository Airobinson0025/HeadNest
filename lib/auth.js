import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "./db"
import { compare } from "bcrypt"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        CredentialsProvider({
          name: "Credentials",
          credentials: {
            username: { label: "Username", type: "text", placeholder: "jsmith" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials) {
            if(!credentials?.email || !credentials?.password) {
                return null
            }
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: credentials?.email
                }
            })
            if(!existingUser) {
                return null
            }

            const passwordMatch = await compare(credentials.password, existingUser.password)

            if(!passwordMatch) {
                return null
            }

            return {
                id:`${existingUser.id}`,
                email: existingUser.email
            }
          }
        })

    ]
}