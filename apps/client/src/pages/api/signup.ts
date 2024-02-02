// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Admin } from "db";
const JWT_SECRET_ADMIN = "secret";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import { InputProps } from "type-validation";
import { dbConnect } from "@/lib/dbConnect";

type Data = {
  message?: string;
  err?: string;
  token?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  const parsedInput = InputProps.safeParse(req.body);
  if (!parsedInput.success) {
    res.status(411).json({
      err: parsedInput.error.message,
    });
    return;
  }
  const username = parsedInput.data.username;
  const password = parsedInput.data.password;
  if (!username || !password) {
    return res.status(400).json({
      message: "username and password are required",
    });
  }

  try {
    const admin = await Admin.findOne({ username });
    if (admin) {
      return res.status(409).send({ message: "admin already exists" });
    } else {
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
      if (typeof JWT_SECRET_ADMIN === "undefined") {
        throw new Error("JWT_SECRET_ADMIN is undefined");
      }
      const token = sign({ username, role: "admin" }, JWT_SECRET_ADMIN, {
        expiresIn: "1h",
      });
      return res.json({ message: "admin created successfully", token: token });
    }
  } catch (error) {
    return res.status(500).send({ message: "internal server error" });
  }
}
