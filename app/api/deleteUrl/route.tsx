// delete api

import pool, { DeleteNewUrl } from "@/app/libs/db"
import { NextRequest, NextResponse } from "next/server";





export async function POST(request: NextRequest) {
    
    
    const id = await request.json();
    

    const result = await DeleteNewUrl(id);


    
    return new NextResponse ("Url Deleted",{status: 200});

    

}