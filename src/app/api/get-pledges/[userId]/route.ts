import dbConnect from "@/lib/dbConnect";
import PledgeModel from "@/models/Pledge";
import { getServerSession } from "next-auth";
import {  NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/option";


export async function GET(
 
  
) {
  await dbConnect();

  try {
   
      const session = await getServerSession(authOptions);
      if (!session) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
      }
      const userId = session?.user.randomId;

    const findPledge = await PledgeModel.find({ userId }).sort({ createdAt: -1 });

    if (!findPledge || findPledge.length === 0) {
      console.log("No pledges found for this user.");
    }

    return NextResponse.json({ findPledge }, { status: 200 });

  } catch (error) {
    console.error("Error fetching pledges:", error);
    return NextResponse.json({ error: "Cannot get the pledges" }, { status: 500 });
  }
}
