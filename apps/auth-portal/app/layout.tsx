import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "../providers";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Auth Portal - Secure Login and Registration",
  description:
    "A secure authentication portal for user login and registration with modern UI and robust security features.",
  keywords: ["authentication", "login", "registration", "security", "portal"],
  authors: [{ name: "Deepanshu Saini" }],
  creator: "Deepanshu Saini",
  publisher: "Deepanshu Saini",
  robots: "noindex, nofollow",
  icons: {
    icon: "/x.png",
    shortcut: "/x.png",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
