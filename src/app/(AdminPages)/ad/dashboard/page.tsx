"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import AdminDashBoard from "@/components/ui/DashBoard/AdminDashBoard";

export default function Dashboard() {
  const { data: session } = useSession();

  if (session && session.user && session?.user.role === "admin") {
    return <AdminDashBoard name={session.user.name ?? "Admin"} />;
  } else if (session == null || session == undefined) {
    redirect("/login");
  }
}
