import dbConnect from "@/dbConnect/dbConnect";
import { NextRequest } from "next/server";
import Course from "@/modals/Course";
import User from "@/modals/User";
import { NextResponse } from "next/server";

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

    const { email, role, CourseId } = reqBody;

    if (!email || role !== "user") {
      return NextResponse.json({
        message: "Invalid Username or Role",
        success: false,
        status: 400,
      });
    }

    if (!CourseId) {
      return NextResponse.json({
        message: "Invalid input",
        success: false,
        status: 400,
      });
    }

    const course = await Course.findById(CourseId);
    if (course) {
      NextResponse.json({
        message: "Course fetched successfully , now checking if bought by user",
        success: true,
        status: 200,
        data: course,
      });

      const user = await User.findOne({ email: email });
      if (!user) {
        return NextResponse.json({
          message: "User not found",
          success: false,
          status: 400,
        });
      }
      const result = user.purchasedCourses.some(
        (course: { _id: string }) => course._id.toString() === CourseId
      );
      if (result) {
        return NextResponse.json({
          message: "Course is bought by user",
          success: true,
          status: 200,
          data: [course, { bought: true }],
        });
      }
      return NextResponse.json({
        message: "Course is not bought by user",
        success: true,
        status: 200,
        data: [course, { bought: false }],
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
