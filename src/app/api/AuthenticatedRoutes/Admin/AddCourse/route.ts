import { NextRequest, NextResponse } from "next/server";
import Admin from "@/modals/Admin";
import Course from "@/modals/Course";
import dbConnect from "@/dbConnect/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    if (!req.body) {
      return NextResponse.json(
        {
          message: "Invalid input",
          success: false,
          status: 400,
        },
        { status: 400 }
      );
    }
    const reqBody = await req.json();
    console.log("reqBody", reqBody);

    const { email, role, new_course } = reqBody;
    console.log("data", { email, role, new_course });

    if (!email || role !== "admin" || !new_course) {
      return NextResponse.json(
        {
          message: "Invalid input",
          success: false,
          status: 400,
        },
        { status: 400 }
      );
    }

    const admin = await Admin.findOne({ email: email });
    if (!admin) {
      return NextResponse.json(
        {
          message: "Admin nhi mila",
          success: false,
          status: 400,
        },
        { status: 400 }
      );
    }

    // Check if all required fields are present in new_course
    console.log("new_course", new_course);

    const course = new Course(new_course);
    await course.save();
    await admin.courses.push(course._id);
    await admin.save();
    return NextResponse.json(
      {
        message: "Course added successfully",
        success: true,
        status: 200,
        data: course,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in adding course:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        success: false,
        status: 500,
      },
      { status: 500 }
    );
  }
}
