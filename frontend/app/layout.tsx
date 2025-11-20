import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navBar/NavBar";
import ThemeProvider from "@/context/ThemeContext";
import Footer from "@/components/footer/Footer";
import {Suspense} from "react";

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
            <Suspense>
                <NavBar/>
            </Suspense>
            {children}
            <Footer/>
        </ThemeProvider>
      </body>
    </html>
  );
}
