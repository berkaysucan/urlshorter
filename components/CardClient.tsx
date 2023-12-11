"use client";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { Snippet } from "@nextui-org/snippet";
import { useState } from "react";

import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";

import { UrlType } from "@/app/type/type";
import { Tooltip } from "@nextui-org/react";
import QRCode from "react-qr-code";
type Input = {
  link: string;
  route: string;
};

const CardClient = () => {
  const [input, setInput] = useState<Input>({ link: "", route: "" });

  const [success, setSuccess] = useState<boolean>();

  const { data: session } = useSession();

  
  const email = session?.user?.email;
  

  const handleSubmit = async () => {

    if (!input.link || !input.route) {
      toast.error("Please fill in all fields!");
      return;
    }
    const data:UrlType = {route: input.route, link: input.link, email: email,view:0}
    ;

    data.link = data.link.startsWith("http")
      ? data.link
      : `http://${data.link}`;

    try {
      const response = await axios.post("/api/createUrl", data);
      setSuccess(true);
      toast.success("Successfull!")
    } catch (error) {
      toast.error("This Route Already Exist! ")

    }
  };

  return (
    <Card className="w-full md:w-3/5">
      <CardBody>
        <div className="flex flex-col gap-4">
          <p className="font-bold text-inherit text-2xl text-sky-600 text-center">
            Url Shorter
          </p>
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              type="text"
              placeholder="Enter the link here"
              className="w-full"
              size="sm"
              variant="faded"
              value={input.link}
              onChange={(e) => {
                setSuccess(false);
                setInput({ ...input, link: e.target.value });
              }}
            />
                <Tooltip content="Add your own words at the end of a link (e.g., go for google.com)">
                <Input
              type="text"
              placeholder="Short Word"
              className="w-full md:w-1/4"
              size="sm"
              variant="faded"
              value={input.route}
              onChange={(e) => {
                setSuccess(false);
                setInput({ ...input, route: e.target.value });
              }}
            />
                </Tooltip>
            
            <Button
              onClick={handleSubmit}
              className="text-sm font-normal text-default-600 bg-default-100 h-12 px-8"
            >
              Shorten URL
            </Button>
          </div>

          <div>
            <Snippet
              color="default"
              symbol=""
              className={success ? "flex" : "hidden"}
            >
              <span>localhost:3000/{input.route}</span>
            </Snippet>
          </div>
          
          
        </div>
      </CardBody>
    </Card>
  );
};

export default CardClient;
