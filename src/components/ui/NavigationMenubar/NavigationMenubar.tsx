"use client";
import React from "react";
import { useSession } from "next-auth/react";
import AdminAppbar from "./AdminAppbar";
import UserAppbar from "./UserAppbar";
import CommonAppbar from "./CommonAppbar";

export default function NavigationMenubar() {
  const { data: session } = useSession();
  console.log("session", session);

  if (session && session.user && session?.user.role === "admin") {
    const name = session.user.name ?? "Admin";
    return <AdminAppbar name={name} />;
  }
  if (session && session.user && session?.user.role === "user") {
    return <UserAppbar />;
  }

  return <CommonAppbar />;
}
