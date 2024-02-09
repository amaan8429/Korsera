import { Admin, Course } from "@/db";
import { ensureDbConnected } from "@/db/dbConnect";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function PUT(req: NextApiRequest) {
  try {
    await ensureDbConnected();
    if (!req.body) return null;

    const CourseId = req.query.CourseId as string;

    const reqBody = await req.body;

    const { username, password, role, course } = reqBody;

    if (!username || !password || role !== "admin" || !course || !CourseId) {
      NextResponse.json({
        message: "Invalid input",
        success: false,
        status: 400,
      });
      return;
    }

    const checkIfCourseExists = await Course.findById(CourseId);
    if (!checkIfCourseExists) {
      NextResponse.json({
        message: "Course not found",
        success: false,
        status: 400,
      });
      return;
    }

    const admin = await Admin.findOne({ username });
    if (!admin) {
      NextResponse.json({
        message: "Admin not found",
        success: false,
        status: 400,
      });
      return;
    }

    const newCourse = await Course.findByIdAndUpdate(CourseId, course);
    newCourse.save();
    NextResponse.json({
      message: "Course updated successfully",
      success: true,
      status: 200,
      data: newCourse,
    });
    return;
  } catch (error) {
    console.error("Error in updating course:", error);
    NextResponse.json({
      message: "Internal server error",
      success: false,
      status: 500,
    });
    return;
  }
}
