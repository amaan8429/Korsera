"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface course {
  _id: string;
  Title: string;
  Description: string;
  Price: number;
  ImageLink: string;
  Published: boolean;
}

export default function MyPurchasedCoursesComponent({
  email,
  roll,
  name,
}: {
  email: string;
  roll: string;
  name: string;
}) {
  const [courses, setCourses] = useState<course[]>([]);
  const router = useRouter();

  useEffect(() => {
    const handler = async () => {
      const data = {
        email: email,
        role: roll,
      };
      try {
        const response = await axios.post(
          "/api/AuthenticatedRoutes/User/MyCourses",
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
        Welcome to Loom , {name} , Here are your Purchased Courses
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
      <Grid container spacing={3} justifyContent="center" marginTop={"8px"}>
        {courses.map((course) => (
          <Grid item key={course._id} xs={12} sm={6} md={4}>
            <Card variant="elevation">
              <CardMedia
                component="img"
                alt="Invalid Image Link"
                height="140" // Set the desired height for the image
                image={course.ImageLink} // Assuming your course object has an 'imageUrl' property
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
                    console.log("View Details for course with ID:", course._id);
                  }}
                >
                  {course.Price == 0 ? "Free" : "Paid"}
                </Button>
                <Button
                  size="default"
                  variant="default"
                  color="primary"
                  onClick={() => {
                    console.log("View Details for course with ID:", course._id);
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
