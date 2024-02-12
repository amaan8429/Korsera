"use client";
import React from "react";
import { Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminDashBoard({ name }: { name: string }) {
  const router = useRouter();
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Grid
      marginTop={"5rem"}
      container
      spacing={2}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid item xs={12} md={12} lg={12}>
        <Typography
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={lg ? "2rem" : "1.5rem"}
        >
          Welcome {name} to the Instructor Dashboard
        </Typography>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Button
          size="lg"
          variant="default"
          onClick={() => {
            router.push("/ad/add_course");
          }}
        >
          Add Course
        </Button>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Button
          size="lg"
          variant="default"
          onClick={() => {
            router.push("/ad/all_courses");
          }}
        >
          All Courses
        </Button>
      </Grid>
    </Grid>
  );
}
