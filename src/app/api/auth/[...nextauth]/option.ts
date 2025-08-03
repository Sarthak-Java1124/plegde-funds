import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions : NextAuthOptions = {
providers: [
  CredentialsProvider({
   
    name: "credentials",
    id : "credentials",
    credentials: {
      email: { label: "Email", type: "text", placeholder: "example@email.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials :  any ) : Promise<any> {
        await dbConnect();

        try {
       const userFound = await UserModel.findOne({email : credentials.email});
       if(userFound){
            const passwordMatching = await bcrypt.compare(credentials.password , userFound.password);
            if(passwordMatching){
              console.log("Password Matched");
              return userFound;
            } 
            throw new Error("Password not matching")

       }else {
           throw new Error("User not registered");
       }
            




        }catch(error){
              console.log("The error in signing up is "  , error);
               throw new Error("Error in Logging in");
        }
         
            

    
    }
  })
],

callbacks : {
  async jwt({token , user}){
          if(user){
            token._id = user._id;
          token.isVerified = user.isVerified;
          token.email = user.email;
          token.randomId = user.randomId;
          token.firstname = user.firstname;
          token.lastname = user.lastname;
          }
          return token;
   },
   async session({session , token}){
          if(token){
            session.user._id = token._id;
            session.user.firstname = token.firstname;
            session.user.lastname = token.lastname;
          session.user.isVerified = token.isVerified;
          session.user.email = token.email;
          session.user.randomId = token.randomId;
          }
          return session;
   }

},
pages : {
  signIn : "/sign-in"
},

session : {
  strategy : "jwt"
} ,

secret : process.env.NEXTAUTH_SECRET
   

}



