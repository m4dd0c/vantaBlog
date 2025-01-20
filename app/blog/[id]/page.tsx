import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  category: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
}

async function getBlogPost(id: string): Promise<BlogPost | null> {
  try {
    await connectDB();
    const post = await Blog.findById(id).lean();
    return post ? JSON.parse(JSON.stringify(post)) : null;
  } catch (error) {
    return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getBlogPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <article className="mx-auto max-w-4xl">
        <Card>
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>5 min read</span>
              </div>
            </div>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              {post.title}
            </h1>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>{post.authorName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarDays className="h-4 w-4" />
                <span>{format(new Date(post.createdAt), "MMMM d, yyyy")}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {post.content.split("\n").map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}
