import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BuildGuide",
  description: "Your personalized setup guide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}


