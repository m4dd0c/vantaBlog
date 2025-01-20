import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, ArrowRight } from "lucide-react";

const samplePosts = [
  {
    id: 1,
    title: "The Future of Web Development",
    excerpt:
      "Exploring the latest trends and technologies shaping the future of web development.",
    category: "Technology",
    author: "John Doe",
    date: "Dec 15, 2024",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Building Better User Experiences",
    excerpt:
      "Tips and strategies for creating user experiences that delight and engage.",
    category: "Design",
    author: "Jane Smith",
    date: "Dec 12, 2024",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "The Art of Storytelling",
    excerpt:
      "How to craft compelling narratives that resonate with your audience.",
    category: "Writing",
    author: "Mike Johnson",
    date: "Dec 10, 2024",
    readTime: "6 min read",
  },
];

export default function BlogPreviewSection() {
  return (
    <section className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Stories
          </h2>
          <p className="mb-12 text-lg text-muted-foreground">
            Discover amazing content from our community of writers and
            storytellers.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {samplePosts.map((post) => (
            <Card
              key={post.id}
              className="group cursor-pointer transition-all hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{post.category}</Badge>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    <span>{post.date}</span>
                  </div>
                  <span className="text-sm font-medium">{post.author}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild className="group">
            <Link href="/blog">
              View All Stories
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
