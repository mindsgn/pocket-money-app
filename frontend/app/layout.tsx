import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Abakcus - Loyalty Programs for Small Businesses | Increase Customer Retention by 40%",
  description:
    "Transform one-time customers into loyal brand advocates with Abakcus. Enterprise-level loyalty programs designed for small businesses. Increase repeat purchases by 40%, boost customer lifetime value, and reduce acquisition costs. Join 500+ businesses on our waitlist.",
  openGraph: {
    title:
      "Abakcus - Loyalty Programs for Small Businesses | Increase Customer Retention by 40%",
    description:
      "Transform one-time customers into loyal brand advocates with Abakcus. Enterprise-level loyalty programs designed for small businesses.",
    images: ["/og-home.jpg"],
  },
  alternates: {
    canonical: "https://abakcus.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
