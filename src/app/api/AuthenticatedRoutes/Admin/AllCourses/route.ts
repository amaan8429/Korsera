import { ensureDbConnected } from "@/db/dbConnect";
import { useSession } from "next-auth/react";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await ensureDbConnected();
  } catch (error) {}
}
