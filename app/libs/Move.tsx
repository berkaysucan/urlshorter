"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

type MoveProps = {
  url: string;
};



const Move: React.FC<MoveProps> = ({ url }) => {
  const router = useRouter();

  useEffect(() => {
    if (url) {
      router.push(url);
    }
  }, [url, router]);

  return <div></div>;
};

// getLayout özelliği boş bir şey döndürerek devre dışı bırakıldı


export default Move;
