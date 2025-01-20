import { auth } from "@clerk/nextjs";
import { redirect, notFound } from "next/navigation";
import EditBlogForm from "@/components/dashboard/edit-blog-form";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

async function getBlogPost(id: string, userId: string) {
  try {
    await connectDB();
    const post = await Blog.findById(id).lean();

    if (
      !post ||
      (post as typeof post & { authorId: string }).authorId !== userId
    ) {
      return null;
    }

    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    return null;
  }
}

export default async function EditBlogPage({
  params,
}: {
  params: { id: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const post = await getBlogPost(params.id, userId);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Edit Post</h1>
        <p className="text-muted-foreground">Update your blog post</p>
      </div>

      <EditBlogForm post={post} />
    </div>
  );
}
