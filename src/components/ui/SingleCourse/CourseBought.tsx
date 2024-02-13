"use client";

import React from "react";
import { Grid, CardMedia, Typography, Card } from "@mui/material";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function CourseBought(
  course: any,
  CourseId: string,
  email: string,
  role: string
) {
  const router = useRouter();
  return (
    <>
      <Typography
        marginTop="1.5rem"
        marginLeft={"10px"}
        marginBottom={"5px"}
        variant="h4"
        fontWeight={"bold"}
        textAlign={"start"}
        color={"primary"}
        style={{}}
      >
        Course Details
      </Typography>
      <Grid
        container
        style={{
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
        }}
      >
        <Grid item xs={12} lg={6} md={12}>
          <CardMedia
            image={course.ImageLink}
            component="img"
            alt="Invalid Image Link"
            height="auto"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          md={12}
          style={{
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Typography
            variant="h6"
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              color: "black",
            }}
            fontWeight={"bold"}
          >
            <span>Title : </span>
            {course.Title}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            style={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <span>Description : </span>
            {course.Description}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={"bold"}
            style={{
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <span>Price : </span>
            {course.Price}
          </Typography>

          <Grid
            container
            xs={6}
            lg={6}
            md={6}
            gap={2}
            style={{
              marginTop: "20px",
            }}
          >
            <Button
              size="lg"
              color={course.Price == 0 ? "success" : "error"}
              variant="default"
              onClick={() => {
                console.log("View Details for course with ID:", course._id);
                const data = {
                  email: email,
                  role: role,
                  CourseId: CourseId,
                };
                const handler = async (data: {
                  email: string;
                  role: string;
                  CourseId: string;
                }) => {
                  const response = axios.post(
                    "/api/AuthenticatedRoutes/User/BuyCourse",
                    data
                  );
                  console.log("response", response);
                  router.push("/us/my_courses");
                };
                handler(data);
              }}
            >
              {course.Price === 0 ? "Free" : "Paid"}
            </Button>
            <Button size="lg" variant="default" color="primary">
              View Course
            </Button>
          </Grid>
        </Grid>

        <Card variant="elevation">
          <div className="flex justify-between p-4"></div>
        </Card>
      </Grid>
    </>
  );
}