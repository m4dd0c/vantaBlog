import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CreateBlogForm from "@/components/dashboard/create-blog-form";

export default async function CreateBlogPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create New Post</h1>
        <p className="text-muted-foreground">Share your story with the world</p>
      </div>

      <CreateBlogForm />
    </div>
  );
}
