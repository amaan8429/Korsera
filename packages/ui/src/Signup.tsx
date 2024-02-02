import { Button, Card, TextField, Typography } from "@mui/material";
import { useState } from "react";
import React from "react"; // eslint-disable-line
import Link from "next/link";

export default function UserSignup(props: {
  onClick: (Email: string, Password: string) => void; // eslint-disable-line
}) {
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Card
        variant="outlined"
        id="card-login"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          height: "50vh",
          width: "50vh",
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          border: "2px solid black",
          borderRadius: "10%",
        }}
      >
        <Typography
          style={{
            fontSize: "2rem",
            fontWeight: "Bold",
            textAlign: "center",
            marginTop: "3px",
          }}
        >
          User SignUp
        </Typography>
        <TextField
          onChange={(e) => SetEmail(e.target.value)}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={(e) => SetPassword(e.target.value)}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <Button
          style={{ marginTop: "4px" }}
          size="large"
          variant="contained"
          onClick={async () => {
            props.onClick(Email, Password);
          }}
        >
          SignUp
        </Button>
        <div style={{ display: "flex", flexDirection: "row", gap: "6px" }}>
          <Typography>Already a user?</Typography>
          <Link href="/user/login">Login</Link>
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "6px" }}>
          <Typography>Sign up as a Admin?</Typography>
          <Link href="/admin/signup">Admin Signup</Link>
        </div>
      </Card>
    </div>
  );
}
