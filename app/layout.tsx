import './globals.css';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YEAR IN REVIEW",
  description: "Powered by mith1912",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
    <html lang="en" suppressHydrationWarning>
      <body>
  {/* <div style={{color:'red'}}>LAYOUT ACTIVE</div> */}
  {children}
</body>
    </html>
  );
}
