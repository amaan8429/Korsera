import { Schema, model, models } from "mongoose";

//Defining Mongoose Schemas
const userSchema = new Schema({
  username: { type: String, unique: true, min: 6, max: 100 },
  password: { type: String, required: true, min: 6, max: 100 },
  purchasedCourses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new Schema({
  username: { type: String, unique: true, min: 6, max: 100 },
  password: { type: String, required: true, min: 6, max: 100 },
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
// const User = model("User", userSchema);
// const Admin = model("Admin", adminSchema);
// const Course = model("Course", courseSchema);

export const Admin = models.Admin || model("Admin", adminSchema);
export const Course = models.Course || model("Course", courseSchema);
export const User = models.User || model("User", userSchema);
