"use client";

import React from "react";
import { useSession } from "next-auth/react";
import EditCourseComponet from "@/components/ui/EditCourse/page";

export default function EditCourse({
  params,
}: {
  params: { CourseId: string };
}) {
  const { data: session } = useSession();
  if (session && session.user) {
    console.log("verified");
    return <EditCourseComponet CourseId={params.CourseId} />;
  }
}
