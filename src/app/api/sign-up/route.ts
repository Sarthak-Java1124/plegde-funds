import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";

import { NextRequest } from "next/server";



export async function POST(request : NextRequest){
      await dbConnect();
  const { email , password , firstname , lastname  } = await request.json();
 
  
  const randomIdUser = Math.floor(Math.random() * 1e12);
  const hashedPassword = await bcrypt.hash(password , 10);
      try {
        const userEmail= await UserModel.findOne({email : email });
        if(userEmail){
              return Response.json({
                success: "false",
                message: "Account is already registered go to sign in",
              } , {status : 200});
          
          
        }else {
             const user = await UserModel.create({
                email : email ,
                password : hashedPassword,
                firstname : firstname,
                lastname : lastname,
                randomId : randomIdUser,
                
             });
             user.save();
               return Response.json({
                 success: "true",
                 message: "User Successfully signed in",
               } , {status : 500});
        }


                                                       }catch{
                return Response.json({
                  success: "false",
                  message: "Error in signing up",
                });
         }
}