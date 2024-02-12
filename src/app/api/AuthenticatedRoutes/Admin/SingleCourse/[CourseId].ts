import { NextApiRequest, NextApiResponse } from "next";
import Course from "@/modals/Course";
import dbConnect from "@/dbConnect/dbConnect";

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await dbConnect();
    const CourseId = req.query.CourseId as string;

    const course = await Course.findById(CourseId);
    if (course) {
      res.status(200).json({
        message: "Course fetched successfully",
        success: true,
        data: course,
      });
    } else {
      res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error in fetching course:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
}
