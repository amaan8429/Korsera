import type { Metadata } from "next";
import "./globals.css";
import NavigationMenubar from "@/components/NavigationMenubar/NavigationMenubar";
import ToasterContext from "@/context/ToasterContext";
import SessionProvider from "@/context/AuthContext";
import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Korsera",
  description: "A Coursera clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(OPTIONS);
  return (
    <html lang="en">
      <body className="bg-slate-50">
        <SessionProvider session={session}>
          <NavigationMenubar />
          {children}
          <ToasterContext />
        </SessionProvider>
      </body>
    </html>
  );
}
