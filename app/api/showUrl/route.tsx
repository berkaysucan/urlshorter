import pool, { SearchEmail } from "@/app/libs/db"

import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    

    const {email} = await request.json();
    
    const result  = await SearchEmail(email)

    
    
    
    if(result)
    {
    return new NextResponse(JSON.stringify(result), { status: 200 });
    }
    else
    {
      return new NextResponse(JSON.stringify({message:"Not Found"}), { status: 404 });
    }
  }