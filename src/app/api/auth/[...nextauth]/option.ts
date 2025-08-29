

import dbConnect from "@/lib/dbConnect";

import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export type credentialsType = {
  email: string;
  password: string;
};
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },


      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<any> {
        await dbConnect();

        if (!credentials) {
          return null;
        }

        try {
          const userFound = await UserModel.findOne({
            email: credentials.email,
          });
          if (userFound) {
            if (credentials.password !== undefined) {
              const passwordMatching = await bcrypt.compare(
                credentials.password,
                userFound.password
              );
              if (passwordMatching) {
                return {
                  randomId: userFound.randomId?.toString() || "",
                  email: userFound.email,
                  firstname: userFound.firstname,
                  lastname: userFound.lastname,
                  _id: userFound._id?.toString() || "",
                };
              }
              throw new Error("Password not matching");
            }
          } else {
            throw new Error("User not registered");
          }
        } catch (error) {
          throw new Error("Error in Logging in");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.isVerified = user.isVerified;
        token.email = user.email;
        token.randomId = user.randomId;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.isVerified = token.isVerified;
        session.user.email = token.email;
        session.user.randomId = token.randomId;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET || "your-fallback-secret-key-here",
};
