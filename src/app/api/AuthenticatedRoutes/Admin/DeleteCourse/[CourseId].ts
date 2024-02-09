import { Course } from "@/db";
import { ensureDbConnected } from "@/db/dbConnect";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function DELETE(req: NextApiRequest) {
  try {
    await ensureDbConnected();

    const CourseId = req.query.CourseId as string;

    if (!CourseId) {
      NextResponse.json({
        message: "Invalid input",
        success: false,
        status: 400,
      });
      return;
    }

    const course = await Course.findById(CourseId);
    if (!course) {
      NextResponse.json({
        message: "Course not found",
        success: false,
        status: 400,
      });
      return;
    }

    await Course.findByIdAndDelete(CourseId);
    NextResponse.json({
      message: "Course deleted successfully",
      success: true,
      status: 200,
    });
    return;
  } catch (error) {
    console.error("Error in deleting course:", error);
    NextResponse.json({
      message: "Internal server error",
      success: false,
      status: 500,
    });
    return;
  }
}
