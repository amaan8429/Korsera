let alreadyConnected = false;
import mongoose from "mongoose";
const DB_URL =
  "mongodb+srv://amaan8429:9125815706@amaan.f1vifaa.mongodb.net/loom";

export const dbConnect = async () => {
  if (alreadyConnected) return;
  await mongoose.connect(DB_URL);
  alreadyConnected = true;
};
