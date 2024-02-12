import React from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function UserAppbar() {
  const router = useRouter();
  return (
    <div
      className="bg-zinc-900"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <div>
        <Typography
          onClick={() => {
            router.push("/");
          }}
          fontWeight={"bold"}
          variant={"h5"}
          style={{ cursor: "pointer" }}
        >
          Korsera
        </Typography>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
        <Button
          size="sm"
          variant="default"
          onClick={() => {
            router.push("/ad/my_courses");
          }}
        >
          My Courses
        </Button>
        <Link href="/l">
          <Button
            variant="default"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </Button>
        </Link>
      </div>
    </div>
  );
}
