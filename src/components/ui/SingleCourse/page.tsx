"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CourseNotBought from "./CourseNotBought";
import CourseBought from "./CourseBought";

interface course {
  _id: string;
  Title: string;
  Description: string;
  Price: number;
  ImageLink: string;
  Published: boolean;
}

export default function SingleCourseComponent({
  email,
  role,
  CourseId,
}: {
  email: string;
  role: string;
  CourseId: string;
}) {
  const [bought, setBought] = useState(false);
  const [course, setCourse] = useState<course>();

  function checking(x: [course, { bought: boolean }]) {
    console.log(x[1]);
    if (x[1].bought == true) {
      setBought(true);
      setCourse(x[0]);
    } else if (x[1].bought == false) {
      setBought(false);
      setCourse(x[0]);
    }
  }

  useEffect(() => {
    const handler = async () => {
      const data = {
        email: email,
        role: role,
        CourseId: CourseId,
      };
      try {
        const response = await axios.post(
          "/api/AuthenticatedRoutes/User/SingleCourse",
          data
        );
        console.log("response", response);
        if (response.data.success) {
          checking(response.data.data);
        } else {
          console.log("Error in fetching courses");
        }
      } catch (error) {
        console.error("Error in fetching courses:", error);
      }
    };
    handler();
  }, [email, role, CourseId]);

  if (bought == false) {
    return <CourseNotBought course={course} />;
  } else if (bought == true) {
    return <CourseBought course={course} CourseId={CourseId} />;
  }
}
