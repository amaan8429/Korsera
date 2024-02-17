"use client";

import React from "react";
import { useSession } from "next-auth/react";
import SingleCourseComponent from "@/components/ui/SingleCourse/page";

export default function DashboardPage({
  params,
}: {
  params: { CourseId: string };
}) {
  const { data: session } = useSession();
  if (session && session.user && session.user.email) {
    const { CourseId } = params;
    console.log("verified");
    return (
      <SingleCourseComponent
        email={session.user.email}
        role="user"
        CourseId={CourseId}
      />
    );
  }
}
