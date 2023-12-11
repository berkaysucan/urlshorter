"use client"
import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,  useDisclosure, Checkbox,} from "@nextui-org/react"
import {MailIcon} from '@/components/icons';
import {LockIcon} from '@/components/icons';
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import axios from "axios";
import toast from "react-hot-toast";
type Input = {
  email: string;
  password: string;
};
export default function RegisterForm() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

 
  const [input, setInput] = useState<Input>({ email: "", password: "" });

  const handleSubmit = async () => {


    const data = input;

    
    try {
      const response = await axios.post("/api/createUser", data);
           
      toast.success("Successfull!")
    } catch (error) {
      toast.error("This Email Already Registered! ")
    }
    
  };
  return (
    <>
      <Button onPress={onOpen} color="primary">Register</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                  value={input.email}
                  onChange={(e) => {
                  setInput({ ...input, email: e.target.value });
              }}
                />
                <Input
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                  value={input.password}
                  onChange={(e) => {
                  setInput({ ...input, password: e.target.value });
              }}
                />

              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose} >
                  Close
                </Button>
                <Button color="primary" onClick={handleSubmit} >
                  Sign up
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

