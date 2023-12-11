import pool, { InsertNewUrl, SearchRoute } from "@/app/libs/db"

import { NextResponse } from "next/server"



import { UrlType } from "@/app/type/type";


export async function POST(request: Request) {
  try {
      // Kullanıcıdan gelen JSON verisini çıkar
      const requestData:UrlType = await request.json();

      
      // Kullanıcıyı veritabanına ekleyin

      const search = await (SearchRoute(requestData.route));
      
      if(search.rows.length > 0)
      {
        return new NextResponse ("Route Exist", { status: 500 });
      }
    
      const result = await InsertNewUrl(requestData);

      return new NextResponse ("Succesful",{status: 200});

  } catch (error) {
      return new NextResponse ("Error!", { status: 500 });
  }
}