import type { Metadata } from "next";

import "./globals.css";
import NavigationMenubar from "@/components/ui/NavigationMenubar/NavigationMenubar";
import ToasterContext from "@/context/ToasterContext";
import SessionProvider from "@/context/AuthContext";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { ThemeProvider } from "@/context/themeprovider";

export const metadata: Metadata = {
  title: "Korsera",
  description: "-",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <NavigationMenubar />

            {children}
            <ToasterContext />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
