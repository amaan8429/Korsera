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

    const CourseId = req.query.CourseId as string;

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

      const user = await User.findOne({ username });
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
          data: { bought: true },
        });
      }
      return NextResponse.json({
        message: "Course is not bought by user",
        success: true,
        status: 200,
        data: { bought: false },
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
