import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navbar";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "ModernBlog - Share Your Stories",
  description:
    "A modern blog platform for sharing stories, ideas, and experiences with the world.",
  keywords: "blog, writing, stories, modern, platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={montserrat.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen bg-background text-foreground">
              <Navbar />
              <main>{children}</main>
              <Toaster />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
