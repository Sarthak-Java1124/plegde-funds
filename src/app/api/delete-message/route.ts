import dbConnect from "@/lib/dbConnect";
import PledgeModel from "@/models/Pledge";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request : NextRequest){
    await dbConnect();
     const body = await request.json();
     const pledgeNumber = body.pledgeNumber;

     console.log("The pledge Number is : " , pledgeNumber);

     try {
           const message = await PledgeModel.deleteOne({pledgeNumber : pledgeNumber});

           if(message){
            return NextResponse.json({message : "The message has been deleted"});
           }else {
            return NextResponse.json({message : "The message not found"});
           }
     }catch(error){
        console.log("The error in deleting the message is : " , error);
    
     }

}