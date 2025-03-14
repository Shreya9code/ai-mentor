"use client";
import { useEffect, useState } from "react";
import { Geist, Geist_Mono,Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
const inter=Inter({subsets: ["latin"]})

/*export const metadata = {
  title: "AI Mentor- NexusMentor.ai",
  description: "Generated at SBH",
};*/

export default function RootLayout({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <ClerkProvider appearance={{baseTheme:"dark"}}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className}`}
      >{/* Render ThemeProvider only after mount to prevent mismatch */}
        {mounted ? (
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" //dark
          enableSystem
          disableTransitionOnChange
        >
          {/*header*/}
          <Header/>
          <main className="min-h-screen">{children}</main>
          {/*footer*/}
          <footer className="bg-muted/50 py-12">
            <div className="container mx-auto px-4 text-center text-gray-200">
              <p>Made at SBH</p>
            </div>
          </footer>
        </ThemeProvider>): (
          <main className="min-h-screen">{children}</main> // Fallback SSR render
        )}
      </body>
    </html>
    </ClerkProvider>
  );
}
