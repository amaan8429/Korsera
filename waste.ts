// "use client";

// import { ensureDbConnected } from "@/db/dbConnect";
// import { Button, Typography, Grid } from "@mui/material";
// import { signIn, signOut } from "next-auth/react";
// import { useSession } from "next-auth/react";

// // import { Link, useNavigate } from "react-router-dom";
// // import { EmailState } from "../../store/selectors/PersonEmail.js";
// // import { useRecoilValue } from "recoil";
// // import { RollState } from "../../store/selectors/Roll.js";
// // import { PersonState } from "../../store/atoms/Person.js";
// // import { useSetRecoilState } from "recoil";

// export default function Home() {
//   return <CommonAppbar />;
// }
// // const PersonEmail = useRecoilValue(EmailState);
// // const Roll = useRecoilValue(RollState);

// //   if (PersonEmail && Roll === "admin") {
// //     return <AdminAppbar />;
// //   } else if (PersonEmail && Roll === "user") {
// //     return <UserAppbar />;
// //   } else {
// //     return <CommonAppbar />;
// //   }

// // }

// function CommonAppbar() {
//   const session = useSession();
//   console.log(session.data);
//   if (session.data === null) {
//     return (
//       <Grid
//         container
//         justifyContent={"space-between"}
//         alignItems={"center"}
//         style={{
//           paddingTop: "10px",
//           paddingLeft: "10px",
//           paddingRight: "10px",
//         }}
//       >
//         <Grid item>
//           <Typography fontWeight={"bold"} variant={"h5"}>
//             Udemy
//           </Typography>
//         </Grid>
//         <Grid style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
//           <Button variant={"contained"} onClick={() => signIn()}>
//             SignUp
//           </Button>
//         </Grid>
//       </Grid>
//     );
//   }
// }

// // function UserAppbar() {
// //   // const setPersonState = useSetRecoilState(PersonState);
// //   // const navigate = useNavigate();
// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         flexDirection: "row",
// //         justifyContent: "space-between",
// //         paddingTop: "10px",
// //         paddingLeft: "10px",
// //         paddingRight: "10px",
// //       }}
// //     >
// //       <div>
// //         <Typography
// //           // onClick={() => {
// //           //   navigate("/user/dashboard");
// //           // }}
// //           fontWeight={"bold"}
// //           variant={"h5"}
// //           style={{ cursor: "pointer" }}
// //         >
// //           Udemy
// //         </Typography>
// //       </div>
// //       <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
// //         <Button
// //           size="small"
// //           variant="contained"
// //           // onClick={() => {
// //           //   navigate("/user/my_purchased_courses");
// //           // }}
// //         >
// //           My Courses
// //         </Button>
// //         <Link to="/l">
// //           <Button
// //             variant={"contained"}
// //             onClick={() => {
// //               localStorage.removeItem("token");
// //               setPersonState({
// //                 PersonEmail: null,
// //                 Roll: null,
// //               });
// //             }}
// //           >
// //             Logout
// //           </Button>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }

// // function AdminAppbar() {
// //   // const PersonEmail = useRecoilValue(EmailState);
// //   // const setPersonState = useSetRecoilState(PersonState);
// //   // const navigate = useNavigate();
// //   return (
// //     <div
// //       style={{
// //         display: "flex",
// //         flexDirection: "row",
// //         justifyContent: "space-between",
// //         paddingTop: "10px",
// //         paddingLeft: "10px",
// //         paddingRight: "10px",
// //       }}
// //     >
// //       <div>
// //         <Typography
// //           onClick={() => {
// //             navigate("/admin/dashboard");
// //           }}
// //           fontWeight={"bold"}
// //           variant={"h5"}
// //           style={{ cursor: "pointer" }}
// //         >
// //           Udemy
// //         </Typography>
// //       </div>
// //       <div style={{ display: "flex", flexDirection: "row", gap: "4px" }}>
// //         <Typography fontWeight={"bold"} variant={"h6"}>
// //           {PersonEmail}
// //         </Typography>
// //         <Link to="/">
// //           <Button
// //             variant={"contained"}
// //             onClick={() => {
// //               localStorage.removeItem("token");
// //               setPersonState({
// //                 PersonEmail: null,
// //                 Roll: null,
// //               });
// //             }}
// //           >
// //             Logout
// //           </Button>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }
