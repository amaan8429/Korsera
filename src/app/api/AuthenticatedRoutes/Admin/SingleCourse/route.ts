import { NextApiRequest, NextApiResponse } from "next";
import Course from "@/modals/Course";
import dbConnect from "@/dbConnect/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    console.log("req.body", req.body);
    if (!req.body)
      return NextResponse.json({
        message: "No request body found",
        success: false,
        status: 400,
      });

    const reqBody = await req.json();
    console.log("reqBody", reqBody);
    const { CourseId } = reqBody;
    console.log("CourseId", CourseId);

    const course = await Course.findById(CourseId);
    if (course) {
      return NextResponse.json({
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
