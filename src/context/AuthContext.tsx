// "use client";
// import React from "react";
// import { SessionProvider } from "next-auth/react";
// import { Session } from "next-auth";
// interface IProps {
//   children: React.ReactNode;
//   session: Session | null;
// }

// export default function AuthContext({ children, session }: IProps) {
//   return <SessionProvider>{children}</SessionProvider>;
// }
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Provider } from "./provider";

type Props = {
  children?: React.ReactNode;
};

const AuthProvider = async ({ children }: Props) => {
  const session = await getServerSession(OPTIONS);

  return <Provider session={session}>{children}</Provider>;
};

export default AuthProvider;
