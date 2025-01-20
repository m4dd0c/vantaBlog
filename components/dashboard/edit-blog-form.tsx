"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const blogSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters"),
  excerpt: z
    .string()
    .min(1, "Excerpt is required")
    .max(300, "Excerpt must be less than 300 characters"),
  content: z
    .string()
    .min(1, "Content is required")
    .min(100, "Content must be at least 100 characters"),
  category: z.string().min(1, "Category is required"),
});

type BlogFormData = z.infer<typeof blogSchema>;

const categories = [
  "Technology",
  "Lifestyle",
  "Business",
  "Health",
  "Travel",
  "Food",
  "Fashion",
  "Sports",
];

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
}

interface EditBlogFormProps {
  post: BlogPost;
}

export default function EditBlogForm({ post }: EditBlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
    },
  });

  const watchedCategory = watch("category");

  const onSubmit = async (data: BlogFormData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/blogs/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Blog post updated successfully!");
        router.push(`/blog/${post._id}`);
      } else {
        toast.error("Failed to update blog post");
      }
    } catch (error) {
      toast.error("An error occurred while updating the post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Blog Post</CardTitle>
        <CardDescription>Update the details of your blog post</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              placeholder="Enter a compelling title for your post"
              {...register("title")}
              className={errors.title ? "border-destructive" : ""}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt *</Label>
            <Textarea
              id="excerpt"
              placeholder="Write a brief summary of your post (this will be shown in the blog list)"
              rows={3}
              {...register("excerpt")}
              className={errors.excerpt ? "border-destructive" : ""}
            />
            {errors.excerpt && (
              <p className="text-sm text-destructive">
                {errors.excerpt.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={watchedCategory}
              onValueChange={(value) => setValue("category", value)}
            >
              <SelectTrigger
                className={errors.category ? "border-destructive" : ""}
              >
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <Textarea
              id="content"
              placeholder="Write your blog post content here..."
              rows={15}
              {...register("content")}
              className={errors.content ? "border-destructive" : ""}
            />
            {errors.content && (
              <p className="text-sm text-destructive">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Post
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

