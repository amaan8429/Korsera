import dbConnect from "@/dbConnect/dbConnect";
import User from "@/modals/User";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Admin from "@/modals/Admin";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const reqBody = await req.json();
    const { name, email, password, role } = reqBody;

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }

    if (role == "admin") {
      const isAdminExist = await Admin.findOne({ email });
      if (isAdminExist) {
        return NextResponse.json(
          { error: "Admin already exist" },
          { status: 400 }
        );
      }
      // generate salt
      const salt = await bcryptjs.genSalt(10);
      // hashed the password
      const hashedPassword = await bcryptjs.hash(password, salt);
      // save user to database
      const savedAdmin = await new Admin({
        name,
        email,
        password: hashedPassword,
      }).save();
      // return user
      return NextResponse.json({
        message: "Admin created successfully",
        success: true,
        data: savedAdmin,
      });
    }
    if (role == "user") {
      const isUserExist = await User.findOne({ email });
      if (isUserExist) {
        return NextResponse.json(
          { error: "User already exist" },
          { status: 400 }
        );
      }
      // generate salt
      const salt = await bcryptjs.genSalt(10);
      // hashed the password
      const hashedPassword = await bcryptjs.hash(password, salt);
      // save user to database
      const savedUser = await new User({
        name,
        email,
        password: hashedPassword,
      }).save();
      // return user
      return NextResponse.json({
        message: "User created  successfully",
        success: true,
        data: savedUser,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
