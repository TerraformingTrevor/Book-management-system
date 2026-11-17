import {
  Geist,
  Geist_Mono,
  IBM_Plex_Sans,
  Space_Grotesk,
} from "next/font/google";

import "./globals.css";
import { MainNavbar } from "@/components/main-navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toast";
import { BookToast } from "@/components/book-toast";

const spaceGroteskHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Book management system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        ibmPlexSans.variable,
        spaceGroteskHeading.variable
      )}
    >
<body>
  <ThemeProvider>
    <MainNavbar />
    {children}
    <footer className="flex justify-center text-emerald-500">
      TrevyBoi © 2026
    </footer>
    <BookToast />
    <Toaster />
  </ThemeProvider>
</body>
    </html>
  );
}
