import { Schema, model } from "mongoose";

//Defining Mongoose Schemas
const userSchema = new Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new Schema({
  username: String,
  password: String,
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

//Creating models
const User = model("User", userSchema);
const Admin = model("Admin", adminSchema);
const Course = model("Course", courseSchema);

export { User, Admin, Course };
