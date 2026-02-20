import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navBar/NavBar";
import ThemeProvider from "@/context/ThemeContext";
import Footer from "@/components/footer/Footer";
import {Suspense} from "react";
import {AlertProvider} from "@/context/AlertContext";

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
      <AlertProvider>
          <ThemeProvider>
              <Suspense>
                  <NavBar />
              </Suspense>
              {children}
              <Footer />
          </ThemeProvider>
      </AlertProvider>
      </body>
    </html>
  );
}
