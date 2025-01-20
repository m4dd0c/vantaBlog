"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye, CalendarDays, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  category: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function UserBlogList() {
  const { user } = useUser();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserPosts();
    }
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const response = await fetch(`/api/blogs/user/${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data.blogs || []);
      }
    } catch (error) {
      toast.error("Failed to fetch your posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== id));
        toast.success("Post deleted successfully");
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Your Posts</h2>
        <Button asChild>
          <Link href="/dashboard/create">Create New Post</Link>
        </Button>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              You haven't created any posts yet.
            </p>
            <Button asChild>
              <Link href="/dashboard/create">Write Your First Post</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Card key={post._id} className="group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge variant={post.published ? "default" : "secondary"}>
                    {post.published ? "Published" : "Draft"}
                  </Badge>
                  <Badge variant="outline">{post.category}</Badge>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {format(new Date(post.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/blog/${post._id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/dashboard/edit/${post._id}`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(post._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

