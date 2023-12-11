"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";

import React from "react";
import {
  User,
} from "@nextui-org/react";

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";


import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import ModalForm from "./LoginForm";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

import { Avatar, AvatarIcon } from "@nextui-org/react";
export const Navbar = () => {

  const { data: session } = useSession();

  const user = JSON.stringify(session);

  
  return (
    <NextUINavbar maxWidth="xl" position="sticky" isBordered>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink
            className="flex justify-start items-center gap-1"
            href="/"
            replace
          >
            <p className="font-bold text-inherit text-2xl text-sky-600">
              Url Shorter
            </p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {/* //if user is logged in hide login and register buttons */}

        {session ? (
          <>
            <User
              name={session?.user?.email}
              description="Free Member"
              avatarProps={{
                src: "",
              }}
            />
            <NavbarItem className="hidden md:flex">
              <Button
                color="default"
                onClick={() => {
                  signOut();
                }}
              >
                Sign Out
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="hidden md:flex">
              <LoginForm />
            </NavbarItem>
            <NavbarItem className="hidden md:flex">
              <RegisterForm  />
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
        
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color="foreground"
                
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
            
          ))}
          
          {session ? <NavbarMenuItem key={`Logout`}>
              <Link
                color={"danger"}
                  
                
                href="#"
                size="lg"
                onClick={()=>{signOut()}}
              >
                Logout
              </Link>
            </NavbarMenuItem> 
              :
             <>
            <NavbarMenuItem key={`Register`}>
              <Link
                color={"primary"}
                  
                
                href="#"
                size="lg"
              >
                <RegisterForm />
              </Link>
            </NavbarMenuItem> 
            <NavbarMenuItem key={`Login`}>
              <Link
                color={"primary"}
                  
                
                href="#"
                size="lg"
              >
                <LoginForm/>
              </Link>
            </NavbarMenuItem> </> }
        </div>
        
      </NavbarMenu>
    </NextUINavbar>
  );
};
