"use client";

import React from "react";
import { useSession } from "next-auth/react";
import MyPurchasedCoursesComponent from "@/components/ui/MyPurchasedCourses/page";

export default function DashboardPage() {
  const { data: session } = useSession();
  if (session && session.user && session.user.email) {
    console.log("verified");
    return (
      <MyPurchasedCoursesComponent
        name={session.user.name || "AnonymousUser"}
        email={session.user.email}
        roll="user"
      />
    );
  }
}
