"use client";

import AllCoursesComponent from "@/components/ui/AllCourses/page";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect, useState } from "react";

interface Course {
  Title: String;
  Description: String;
  Price: Number;
  ImageLink: String;
  Published: Boolean;
}

export default function AllCourses() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const data = {
      email: session?.user?.email,
      role: "admin",
    };
    handler(setCourses, data);
  }, [session]);

  if (session && session.user && session.user.email) {
    return <AllCoursesComponent courses={courses} />;
  }
}

const handler = async function (setCourses: Function, data: any) {
  const response = await axios.post(
    "/api/AuthenticatedRoutes/Admin/AllCourses",
    data
  );
  console.log(response);
  if (response.data.success) {
    await setCourses(response.data.data);
  }
};
