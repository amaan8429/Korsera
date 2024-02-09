import { Admin, Course } from "@/db";
import { ensureDbConnected } from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await ensureDbConnected();
    if (!req.body) return null;
    const reqBody = await req.json();

    const { username, password, role, new_course } = reqBody;

    if (!username || !password || role !== "admin" || !new_course) {
      NextResponse.json({
        message: "Invalid input",
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

    const course = new Course(new_course);
    await course.save();
    admin.courses.push(course._id);
    await admin.save();
    NextResponse.json({
      message: "Course added successfully",
      success: true,
      status: 200,
      data: course,
    });
    return;
  } catch (error) {
    console.error("Error in adding course:", error);
    NextResponse.json({
      message: "Internal server error",
      success: false,
      status: 500,
    });
    return;
  }
}
