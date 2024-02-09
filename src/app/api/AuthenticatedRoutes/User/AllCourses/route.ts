import { Course, User } from "@/db";
import { ensureDbConnected } from "@/db/dbConnect";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest) {
  try {
    await ensureDbConnected();

    if (!req.body) return null;

    const { username, role } = req.body;

    if (!username || role !== "user") {
      return NextResponse.json({
        message: "Invalid Username or Role",
        success: false,
        status: 400,
      });
    }

    const user = await User.findOne({ username });
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
