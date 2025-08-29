import dbConnect from "@/lib/dbConnect";
import PledgeModel from "@/models/Pledge";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/option";


export async function POST(request : NextRequest){
    await dbConnect();
 
  const session = await getServerSession(authOptions);
    try {
        const {
          habbitName,
          Duration,
          stakeAmount,
          startTime,
          endTime,
          

        } = await request.json();
        

    
        const newPledge = await PledgeModel.create({
          habbitName,
          Duration,
          stakeAmount,
          startTime,
          endTime,
          userId : session?.user.randomId,
          pledgeNumber : Math.floor(Math.random() * 1000 + 1),
        });
        newPledge.save();

        return NextResponse.json({
            success : true,
            message : "The Pledge Have been Created"
        });
        
         
        
    } catch (error) { 
        return NextResponse.json({
          success: false,
          message: "The Pledge Cannot be created",
        });
    }
}

