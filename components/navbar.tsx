"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { PenSquare, BookOpen, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/blog", label: "Blog", icon: BookOpen },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">VantaBlog</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {isSignedIn ? (
            <>
              <Button asChild size="sm" className="hidden sm:flex">
                <Link href="/dashboard/create">
                  <PenSquare className="h-4 w-4 mr-2" />
                  Write
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link href="/sign-in">Sign In</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
