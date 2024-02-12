import mongoose from "mongoose";
import { Schema } from "mongoose";

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Anonymous",
    min: 2,
    max: 100,
    // required: [true, "Name must be provided"],
  },
  email: {
    type: String,
    // required: true,
    match: /.+\@.+\..+/,
    unique: true,
    min: 2,
    max: 100,
  },
  password: {
    type: String,
    min: 5,
    // required: [true, "Password must be provided"],
  },
  courses: {
    type: [{ type: Schema.Types.ObjectId, ref: "Course" }],
    default: [], // Initialize the courses array as an empty array
  },
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
// const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default Admin;
