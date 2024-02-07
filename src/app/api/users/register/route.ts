import { Admin, User } from "@/db";
import { ensureDbConnected } from "@/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await ensureDbConnected();

    if (!req.body) return null;

    const reqBody = await req.json();

    const { username, password, role } = reqBody;

    if (!username || !password) {
      return NextResponse.json({
        message: "Invalid input",
        success: false,
        status: 400,
      });
    }

    if (role == "admin") {
      const admin = await Admin.findOne({ username });
      if (admin) {
        return NextResponse.json({
          message: "Admin already exists",
          success: false,
          status: 400,
        });
      }
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
      return NextResponse.json({
        message: "admin registered successfully",
        success: true,
        data: reqBody,
        status: 200,
      });
    }
    if (!role || role == "user") {
      const user = await User.findOne({ username });
      if (user) {
        return NextResponse.json({
          message: "User already exists",
          success: false,
          status: 400,
        });
      }
      const newUser = new User({ username, password });
      await newUser.save();
      return NextResponse.json({
        message: "user registered successfully",
        success: true,
        status: 200,
        data: reqBody,
      });
    }
  } catch (error: any) {
    console.error("Error in user registration:", error);
    return NextResponse.json({
      message: "Error in user registration",
      success: false,
      status: 500,
    });
  }
}
