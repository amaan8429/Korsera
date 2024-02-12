import React from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Button } from "@/components/ui/button"; // Make sure this is the correct import for your custom button component
import axios from "axios";

export default function AddCourseComponent({
  email,
  role,
}: {
  email: string;
  role: string;
}) {
  console.log("AddCourseComponent");
  console.log("email", email);
  const [Title, setTitle] = React.useState("");
  const [Description, setDescription] = React.useState("");
  const [Price, setPrice] = React.useState("");
  const [ImageLink, setImageLink] = React.useState("");
  const [Published, setPublished] = React.useState(false);

  const AddCourse_hook = async ({
    Title,
    Description,
    Price,
    ImageLink,
    Published,
    email,
    role,
  }: {
    Title: string;
    Description: string;
    Price: string;
    ImageLink: string;
    Published: boolean;
    email: string;
    role: string;
  }) => {
    console.log("AddCourse_hook");
    const new_course = {
      Title: Title,
      Description: Description,
      Price: Price,
      ImageLink: ImageLink,
      Published: Published,
    };
    console.log("new_course", new_course);
    console.log("email from hook", email);
    const data = {
      email: email,
      role: role,
      new_course: new_course,
    };

    try {
      const response = await axios.post(
        "/api/AuthenticatedRoutes/Admin/AddCourse",
        data
      );
      console.log("response", response);

      // Handle success, e.g., show a success message or redirect to a different page
    } catch (error) {
      console.error("Error adding course:", error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Add Course
        </Typography>
        <form onSubmit={(e) => e.preventDefault()}>
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
                value={ImageLink}
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
                disabled={!Title || !Description || !Price || !ImageLink}
                onClick={() =>
                  AddCourse_hook({
                    Title,
                    Description,
                    Price,
                    ImageLink,
                    Published,
                    email,
                    role,
                  })
                }
              >
                Add Course
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
