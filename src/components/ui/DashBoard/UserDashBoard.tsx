"use client";

import React from "react";
import { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface course {
  _id: string;
  Title: string;
  Description: string;
  ImageLink: string;
  Published: boolean;
  Price: number;
}

export default function UserDashBoard({
  name,
  email,
  roll,
}: {
  name: string;
  email: string;
  roll: string;
}) {
  const router = useRouter();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const handler = async () => {
      const data = {
        email: email,
        role: roll,
      };
      try {
        const response = await axios.post(
          "/api/AuthenticatedRoutes/User/AllCourses",
          data
        );
        console.log("response", response);
        if (response.data.success) {
          setCourses(response.data.data);
        } else {
          console.log("Error in fetching courses");
        }
      } catch (error) {
        console.error("Error in fetching courses:", error);
      }
    };
    handler();
  }, [email, roll]);

  return (
    <>
      <Typography
        marginTop="1.5rem"
        marginLeft={"10px"}
        marginBottom={"5px"}
        variant="h6"
        fontWeight={"bold"}
        textAlign={"start"}
        color={"primary"}
      >
        Welcome {name}
      </Typography>
      <hr
        style={{
          width: "100%",
          height: "2px",
          backgroundColor: "black",
          border: "none",
          marginBottom: "1rem",
        }}
      />
      <Typography
        variant="h5"
        fontWeight={"bold"}
        marginLeft="10px"
        textAlign={"center"}
      >
        Check out the Courses
      </Typography>
      <Grid container spacing={3} justifyContent="center" marginTop={"8px"}>
        {courses &&
          courses.map((course: course) => (
            <Grid item key={course._id} xs={12} sm={6} md={4}>
              <Card variant="elevation">
                {/* Use CardMedia to display an image */}
                <CardMedia
                  component="img"
                  alt="Invalid Image Link"
                  height="140"
                  image={course.ImageLink}
                />
                <CardContent>
                  <Typography variant="h6">
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        color: "black",
                      }}
                    >
                      Title :
                    </span>{" "}
                    {course.Title}
                  </Typography>
                  <Typography>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        color: "black",
                      }}
                    >
                      Description :
                    </span>{" "}
                    {course.Description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="default"
                    color={course.Published ? "success" : "error"}
                    onClick={() => {
                      console.log(
                        "View Details for course with ID:",
                        course._id
                      );
                    }}
                  >
                    {course.Price == 0 ? "Free" : "Paid"}
                  </Button>
                  <Button
                    size="default"
                    variant="default"
                    color="primary"
                    onClick={() => {
                      console.log(
                        "View Details for course with ID:",
                        course._id
                      );
                      router.push(`/us/course/${course._id}`);
                    }}
                  >
                    Explore
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}
