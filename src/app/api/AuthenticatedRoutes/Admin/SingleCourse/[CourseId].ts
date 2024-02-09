import { Course } from "@/db";
import { ensureDbConnected } from "@/db/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    await ensureDbConnected();
    const { CourseId } = req.query as { CourseId: string };

    const course = await Course.findById(CourseId);
    if (course) {
      NextResponse.json({
        message: "Course fetched successfully",
        success: true,
        status: 200,
        data: course,
      });
    } else {
      return NextResponse.json({
        message: "Course not found",
        success: false,
        status: 400,
      });
    }
  } catch (error) {
    console.error("Error in fetching course:", error);
    return NextResponse.json({
      message: "Internal server error",
      success: false,
      status: 500,
    });
  }
}
