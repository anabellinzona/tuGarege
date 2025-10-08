import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navBar/NavBar";
import ThemeProvider from "@/context/ThemeContext";

export const metadata: Metadata = {
  title: "TuGarage",
  description: "Created and designed by Magno",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
            <NavBar/>
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
