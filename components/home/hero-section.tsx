import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 sm:py-32">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Share Your Stories with the{" "}
            <span className="text-primary">World</span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground sm:text-xl">
            ModernBlog is a beautiful, secure platform where writers can share
            their thoughts, experiences, and insights with a global audience.
            Join our community of storytellers today.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="group">
              <Link href="/sign-up">
                Start Writing Today
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Explore Stories</Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-semibold">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">
                Built with modern tech for optimal performance
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-semibold">Community Driven</h3>
              <p className="text-sm text-muted-foreground">
                Connect with writers and readers worldwide
              </p>
            </div>

            <div className="flex flex-col items-center space-y-2">
              <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-900">
                <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-semibold">Beautiful Design</h3>
              <p className="text-sm text-muted-foreground">
                Clean, modern interface that focuses on content
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
