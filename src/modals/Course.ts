import { Schema } from "mongoose";
import mongoose from "mongoose";

const CourseSchema = new Schema({
  Title: String,
  Description: String,
  Price: Number,
  ImageLink: String,
  Published: Boolean,
});

const Course = mongoose.models.Course || mongoose.model("Course", CourseSchema);
export default Course;
