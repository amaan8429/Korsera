import React from "react";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AdminAppbar({ name }: { name: string }) {
  const router = useRouter();
  return (
    <div
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
          className="text-white"
          onClick={() => {
            router.push("/ad/dashboard");
          }}
          fontWeight={"bold"}
          variant={"h5"}
          style={{ cursor: "pointer" }}
        >
          Korsera
        </Typography>
      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
        <Link href={"/ad/dashboard"}>
          <Button>Dashboard</Button>
        </Link>
        <Link href="/">
          <Button
            variant="default"
            onClick={() => {
              signOut();
              router.push("/");
            }}
          >
            Logout
          </Button>
          B
        </Link>
      </div>
    </div>
  );
}
