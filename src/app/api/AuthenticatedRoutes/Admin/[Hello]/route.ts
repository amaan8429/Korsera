import { NextApiRequest, NextApiResponse } from "next";

export default function GET(req: NextApiRequest, res: NextApiResponse) {
  const number = req.query.Hello as string;
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  return res.status(200).json({ message: "Hello World", number });
}
