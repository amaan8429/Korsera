import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AllCoursesComponent({ courses }: { courses: any[] }) {
  const router = useRouter();
  return (
    <>
      <Typography variant="h4" fontWeight={"bold"} textAlign={"center"}>
        All Your Courses
      </Typography>
      {courses.length === 0 && (
        <Typography variant="h6" textAlign={"center"}>
          No Courses Found
        </Typography>
      )}

      {courses.length > 0 && (
        <Grid container spacing={3} justifyContent="center" marginTop={"8px"}>
          {courses.length > 0 &&
            courses.map((course) => (
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
                    <Typography variant="h6">Title : {course.Title}</Typography>
                    <Typography variant="body2">
                      Description : {course.Description}
                    </Typography>
                    <Typography variant="body2">
                      Price: ${course.Price}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="default"
                      color={course.Published ? "success" : "error"}
                    >
                      {course.published ? "Published" : "Not Published"}
                    </Button>
                    <Button
                      size="default"
                      color="primary"
                      onClick={() => {
                        router.push("/ad/all_courses/" + course._id);
                      }}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
      )}
    </>
  );
}
