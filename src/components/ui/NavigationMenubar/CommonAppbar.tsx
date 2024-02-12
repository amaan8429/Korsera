import React from "react";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import { ModeToggle } from "../themetogge";
import { Button } from "@/components/ui/button";

export default function CommonAppbar() {
  console.log("CommonAppbar");
  return (
    <Grid
      container
      justifyContent={"space-between"}
      alignItems={"center"}
      style={{
        paddingTop: "10px",
        paddingLeft: "10px",
        paddingRight: "10px",
      }}
    >
      <Grid item>
        <Typography fontWeight={"bold"} variant={"h5"}>
          Korsera
        </Typography>
      </Grid>
      <Grid style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
        <ModeToggle />
        <Link href="/register">
          <Button variant="default">User SignUp</Button>
        </Link>
        <Link href="/login">
          <Button variant="default">User Login</Button>
        </Link>
      </Grid>
    </Grid>
  );
}
