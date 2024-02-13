import dbConnect from "@/dbConnect/dbConnect";
import { ObjectId } from "mongoose";
import { NextApiRequest } from "next";
import Course from "@/modals/Course";
import User from "@/modals/User";
import { NextRequest, NextResponse } from "next/server";

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
    if (!course) {
      return NextResponse.json({
        message: "Course not found",
        success: false,
        status: 400,
      });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return NextResponse.json({
        message: "User not found",
        success: false,
        status: 400,
      });
    }

    //check if the course is already bought by the user
    const result = user.purchasedCourses.some(
      (Id: ObjectId) => Id.toString() === CourseId
    );
    if (result) {
      return NextResponse.json({
        message: "Course is already bought by user",
        success: false,
        status: 400,
      });
    }

    //if not then add the course to the user's purchasedCourses array
    user.purchasedCourses.push(course._id);
    await user.save();
    return NextResponse.json({
      message: "Course bought successfully",
      success: true,
      status: 200,
      data: course,
    });
  } catch (error) {
    console.error("Error in buying course:", error);
    return NextResponse.json({
      message: "Internal server error",
      success: false,
      status: 500,
    });
  }
}
