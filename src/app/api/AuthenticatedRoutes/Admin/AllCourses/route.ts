import { Admin, Course } from "@/db";
import { ensureDbConnected } from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await ensureDbConnected();
    if (!req.body) return null;

    const reqBody = await req.json();

    const { username, password, role } = reqBody;

    if (!username || !password || role !== "admin") {
      return NextResponse.json({
        message: "Invalid input",
        success: false,
        status: 400,
      });
    }

    const COURSES = [];
    const admin = await Admin.findOne({ username });
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
