import { NextApiRequest } from "next";
import Course from "@/modals/Course";
import User from "@/modals/User";

import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/dbConnect/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    if (!req.body)
      return NextResponse.json({
        message: "No request body found",
        success: false,
        status: 400,
      });

    const reqBody = await req.json();

    const { email, role } = reqBody;
    console.log("email", email);
    console.log("role", role);

    if (!email || role !== "user") {
      return NextResponse.json({
        message: "Invalid Username or Role",
        success: false,
        status: 400,
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 400,
      });
    }
    const COURSES = [];
    for (let i = 0; i < user.purchasedCourses.length; i++) {
      const id = user.purchasedCourses[i]._id;
      const course = await Course.findById(id);
      COURSES.push(course);
    }
    return NextResponse.json({
      message: "Courses fetched successfully",
      success: true,
      status: 200,
      data: COURSES,
    });
  } catch (error) {
    console.error("Error in fetching courses:", error);
    return NextResponse.json({
      message: "Internal server error",
      success: false,
      status: 500,
    });
  }
}
