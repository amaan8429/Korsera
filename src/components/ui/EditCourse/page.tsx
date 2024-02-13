"use client";
import React, { useEffect, useState } from "react";
import {
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function EditCourseComponet({
  CourseId,
  email,
  roll,
}: {
  CourseId: string;
  email: string;
  roll: string;
}) {
  const router = useRouter();
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Imagelink, setImageLink] = useState("");
  const [Published, setPublished] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      const data = {
        CourseId: CourseId,
      };
      try {
        const response = await axios.post(
          "/api/AuthenticatedRoutes/Admin/SingleCourse",
          data
        );
        if (response.data.success) {
          setTitle(response.data.data.Title);
          setDescription(response.data.data.Description);
          setPrice(response.data.data.Price);
          setImageLink(response.data.data.ImageLink);
          setPublished(response.data.data.Published);
        }
        console.log("response", response);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, [CourseId]);

  const handleSaveChanges = async (e: any, role: string, email: string) => {
    e.preventDefault();
    console.log("handleSaveChanges");
    const responsefromedit = await axios.put(
      "/api/AuthenticatedRoutes/Admin/EditCourse",
      {
        CourseId,
        email: email,
        role: role,
        course: {
          Title,
          Description,
          Price,
          ImageLink: Imagelink,
          Published,
        },
      }
    );
    console.log("responsefromedit", responsefromedit);
    if (responsefromedit.status === 200) {
      console.log("Course Edited Successfully");
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Edit Course
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={Title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                value={Description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                type="number"
                value={Price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="ImageLink"
                variant="outlined"
                multiline
                rows={3}
                value={Imagelink}
                onChange={(e) => setImageLink(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Published}
                    onChange={(e) => setPublished(e.target.checked)}
                  />
                }
                label="Published"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="default"
                color="primary"
                onClick={(e) => handleSaveChanges(e, roll, email)}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
