import dbConnect from "@/dbConnect/dbConnect";
import { NextApiRequest } from "next";
import Admin from "@/modals/Admin";
import Course from "@/modals/Course";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();
    if (!req.body)
      return NextResponse.json({
        message: "No request body found",
        success: false,
        status: 400,
      });

    const reqBody = await req.json();

    const { CourseId, email, role, course } = reqBody;

    if (!email || role !== "admin" || !course || !CourseId) {
      return NextResponse.json({
        message: "Invalid input",
        success: false,
        status: 400,
      });
    }

    const checkIfCourseExists = await Course.findById(CourseId);
    if (!checkIfCourseExists) {
      return NextResponse.json({
        message: "Course not found",
        success: false,
        status: 400,
      });
    }

    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return NextResponse.json({
        message: "Admin not found",
        success: false,
        status: 400,
      });
    }

    const newCourse = await Course.findByIdAndUpdate(CourseId, course);
    newCourse.save();
    return NextResponse.json({
      message: "Course updated successfully",
      success: true,
      status: 200,
      data: newCourse,
    });
  } catch (error) {
    console.error("Error in updating course:", error);
    return NextResponse.json({
      message: "Internal server error",
      success: false,
      status: 500,
    });
  }
}
