"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, User, Loader2 } from "lucide-react";
import { format } from "date-fns";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

export default function BlogList() {
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        const search = searchParams.get("search");
        const category = searchParams.get("category");

        if (search) params.set("search", search);
        if (category && category !== "All Categories")
          params.set("category", category);

        const response = await fetch(`/api/blogs?${params.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        console.log(data, "is data");
        setPosts(data.blogs || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">Error loading posts: {error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No posts found</p>
        <Button asChild>
          <Link href="/dashboard/create">Write the first post</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <Card
          key={post._id}
          className="group cursor-pointer transition-all hover:shadow-lg"
        >
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>
            <CardTitle className="group-hover:text-primary transition-colors">
              <Link href={`/blog/${post._id}`}>{post.title}</Link>
            </CardTitle>
            <CardDescription>{post.excerpt}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{post.authorName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarDays className="h-4 w-4" />
                <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
