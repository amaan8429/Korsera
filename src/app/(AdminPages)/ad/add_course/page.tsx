"use client";
import AddCourseComponent from "@/components/ui/AddCourse/page";
import { useSession } from "next-auth/react";
import React from "react";
import { redirect } from "next/navigation";

export default function AddCourse() {
  const { data: session } = useSession();
  console.log("email ", session?.user?.email);

  if (
    session &&
    session.user &&
    session?.user.role === "admin" &&
    session?.user.email
  ) {
    return <AddCourseComponent email={session.user.email} role="admin" />;
  } else if (session == null) {
    redirect("/login");
  }
}
