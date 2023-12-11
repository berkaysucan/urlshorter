import CardClient from "@/components/CardClient";
import { Card, CardBody } from "@nextui-org/card";
import toast, { Toaster } from "react-hot-toast";

export default async function Home() {



  
  return (
    
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div><Toaster/></div>
      <CardClient />
      <Card className="w-full md:w-3/5 text-center">
      <CardBody >

        <h1 className="text-sky-600 uppercase text-2xl mb-4 text-center">A fast and simple URL shortener</h1>
        <p className="text-center text-sm">

    Free URL Shortener for transforming long, ugly links into nice, memorable and trackable short URLs. Use it to shorten links for any social media platforms, blogs, SMS, emails, ads, or pretty much anywhere else you want to share them. Twitter, Facebook, YouTube, Instagram, WhatsApp, emails, SMS, videos.</p>
      </CardBody>
    </Card>
    <Card className="w-full md:w-3/5 text-center">
      <CardBody >

        
        <p className="text-center text-sm">

        You can register for free and check the number of clicks that your URL or delete & update. </p>
      </CardBody>
    </Card>
      <h1>
      
      </h1>
    </section>
  );
}
