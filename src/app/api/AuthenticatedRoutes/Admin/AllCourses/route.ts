import dbConnect from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Admin from "@/modals/Admin";
import Course from "@/modals/Course";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    console.log(req.body);
    if (!req.body)
      return NextResponse.json({
        message: "No request body found",
        success: false,
        status: 400,
      });

    const reqBody = await req.json();
    console.log(reqBody);

    const { email, role } = reqBody;

    if (!email || role !== "admin") {
      return NextResponse.json({
        message: "Invalid input",
        success: false,
        status: 400,
      });
    }

    const COURSES = [];
    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return NextResponse.json({
        message: "Admin not found",
        success: false,
        status: 400,
      });
    }

    for (let i = 0; i < admin.courses.length; i++) {
      const id = admin.courses[i]._id;
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
