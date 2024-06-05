import prisma from "@/app/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider  from "next-auth/providers/credentials"; 
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from "next-auth";
import bcrypt from 'bcrypt';
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {label: 'Email', type: 'email', placeholder: 'example@mail.com'},
                password: {label: 'Password', type: 'password', placeholder: 'Enter Password' },
            },
            async authorize(credentials) {

                //check to see if email and password is in the database
                if(!credentials?.email || !credentials.password) {
                    throw new Error('Please enter an email and password.')
                }

                //check to see if user exist
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                //if no user was found
                if (!user || !user?.hashedPassword){
                    throw new Error('No user found')
                }

                // check to see if password match when user is found
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                if(!passwordMatch) {
                    throw new Error('Incorret Password')
                }

                return user


            }
        })
    ],
    callbacks: {
        jwt: async ({token, user, session, trigger}: {token: JWT, user?:  any , session?: any, trigger?: any}): Promise<any>  => {
            if (trigger === 'update' && session?.credit) {
                console.log('Updating token credit:', session.credit);
                token.credit = session.credit;
            }
            if (trigger === 'update' && session?.name) {
                console.log('Updating name:', session.name);
                token.name = session.name;
            }
            if (trigger === 'update' && session?.email) {
                console.log('Updating name:', session.email);
                token.email = session.email;
            }

           // passing in user id, calories, height, weight, age, and gender to token
           if(user) {
         
            return {
                ...token, 
                id: user?.id,
                credit: user?.credit,
                password: user?.hashedPassword,
                name: user?.name,
                email: user?.email
            }
        }

        //updating the user info on the database
        if (token.id && typeof token.credit !== 'undefined') {
            await prisma.user.update({
                where: { id: token.id as string },
                data: { credit: token.credit! }
            });
        }

        
        
            return token
        },
        session: async ({session, token, user}): Promise<any> => {
        
            // adding the users age, weight, height, gender, caloires, and id through the token on the session
            return {
                ...session, 
                user: {
                    ...session.user,
                   id: token?.id,
                   credit: token?.credit,
                   password: token?.hashedPassword,
                   name: token?.name,
                   email: token?.email
                }
            };

        }
    },
    secret: process.env.NEXTAUTH_SECRET!,
    session: {
        strategy: 'jwt',
    },
    pages:{
        signIn: '/login',
        error: '/',
    },
    debug: process.env.NODE_ENV === 'development'
}