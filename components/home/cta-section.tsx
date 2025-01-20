import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PenSquare } from "lucide-react";

export default function CallToActionSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-8 flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <PenSquare className="h-8 w-8 text-primary" />
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Ready to Share Your Story?
          </h2>

          <p className="mb-8 text-lg text-muted-foreground">
            Join thousands of writers who are already sharing their stories on
            ModernBlog. Create your account today and start writing!
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild className="group">
              <Link href="/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">Browse Stories</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            No credit card required. Start writing in seconds.
          </p>
        </div>
      </div>
    </section>
  );
}
