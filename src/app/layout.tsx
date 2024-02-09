import type { Metadata } from "next";
import "./globals.css";
import NavigationMenubar from "@/components/NavigationMenubar/NavigationMenubar";
import ToasterContext from "@/context/ToasterContext";
import AuthProvider from "@/context/AuthContext";

export const metadata: Metadata = {
  title: "Korsera",
  description: "A Coursera clone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50" suppressHydrationWarning>
        <AuthProvider>
          <NavigationMenubar />
          {children}
          <ToasterContext />
        </AuthProvider>
      </body>
    </html>
  );
}
