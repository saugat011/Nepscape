import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; 
import Navbar from "@/components/common/Navbar"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TourTech Nepal – Digital Tourism Platform",
  description: "Explore, Plan, and Book authentic experiences across Nepal with our smart travel platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
         {children}
        
      </body>
    </html>
  );
}
