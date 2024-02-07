import mongoose from "mongoose";
let alreadyDone = false;
const DB_URL =
  "mongodb+srv://amaan8429:9125815706@amaan.f1vifaa.mongodb.net/loom";

export async function ensureDbConnected() {
  if (alreadyDone) {
    return;
  }
  alreadyDone = true;
  await mongoose.connect(DB_URL);
}

// let isConnected = false; // Track connection status
// // let connectionPromise: Promise = null; // Store the connection promise
// let connectionPromise: Promise<typeof mongoose> | null = null; // Store the connection promise

// export async function ensureDbConnected() {
//   if (isConnected) {
//     return;
//   }

//   // If a connection is already in progress, wait for it to complete
//   if (connectionPromise) {
//     return connectionPromise;
//   }

//   const DB_URL =
//     "mongodb+srv://amaan8429:9125815706@amaan.f1vifaa.mongodb.net/loom";

//   connectionPromise = mongoose.connect(DB_URL);

//   try {
//     await connectionPromise;
//     isConnected = true;
//   } catch (error) {
//     console.error("Database connection error:", error);
//   }

//   return connectionPromise;
// }
