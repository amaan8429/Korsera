import UserSignUp from "@repo/ui/Signup";
import axios from "axios";

export default function SignUpPage() {
  return (
    <>
      <UserSignUp
        onClick={async (Email: string, Password: string) => {
          const response = await axios.post(
            "http://localhost:3000/api/signup",
            {
              username: Email,
              password: Password,
            }
          );
          localStorage.setItem("token", response.data.token);
        }}
      />
    </>
  );
}
