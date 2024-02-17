import React from "react";
import { Grid, Typography } from "@mui/material";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CommonAppbar() {
  console.log("CommonAppbar");
  return (
    <Grid
      container
      bgcolor={"#000"}
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
        <Link href="/register">
          <Button size="lg" variant="default">
            SignUp
          </Button>
        </Link>
        <Link href="/login">
          <Button size="lg" variant="default">
            Login
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
}
