import pool, { InsertNewUser, SearchEmailFromUser } from "@/app/libs/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"





export async function POST(request: Request) {
    try {
        // Kullanıcıdan gelen JSON verisini çıkar
        const requestData = await request.json();
  
        const { email, password  } = requestData;
        // Kullanıcıyı veritabanına ekleyin
  
        
        const search = await SearchEmailFromUser(email);
        
        
        if(search)
        {
          return new NextResponse ("User Exist", { status: 500 });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await InsertNewUser(email, hashedPassword);
  
        
        return new NextResponse ("Succesful",{status: 200});
  
    } catch (error) {
        return new NextResponse ("Error!", { status: 500 });
    }
  }