"use client"
import React, { useState, useEffect } from 'react';
import pool from "@/app/libs/db";
import TableComponent from '@/components/TableComponent';
import axios from 'axios';
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from 'next/navigation';
export default function Dashboard() {
  const { data: session, status } = useSession();
  const email = session?.user?.email;
  const [urls, setUrls] = useState([]);
  const router = useRouter();
  // Fetch users from your API or wherever you're getting them
  const fetchData = async () => {
    
    try {
      const { data } = await axios.post("/api/showUrl", { email });
     
      setUrls(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch data once when the session data is available
  useEffect(() => {
    if (session) {
      fetchData();
    }
    
  }, [session]);

  // If the session is loading or there are no session, don't render
 
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      {session ? (
        <>
          <Toaster />
          <p className="font-bold text-inherit text-2xl text-sky-600 text-center">Dashboard</p>
          <TableComponent rows={urls} />
          </>
      ) : (
        <div></div>
      )}
    </section>
  );
}