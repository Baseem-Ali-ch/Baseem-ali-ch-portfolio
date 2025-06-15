import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Baseem Ali C H",
  keywords: ["baseem", "ali", "c h", "baseem ali c h"],
  description: "Portfolio of Baseem Ali C H",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
