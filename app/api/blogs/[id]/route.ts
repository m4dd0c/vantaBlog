import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import connectDB from "@/lib/database";
import { Post } from "@/lib/models/Post";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    await connectDB();
    const post = await Post.findById(params.id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Failed to fetch post" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const post = await Post.findById(params.id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.author !== userId) {
      return NextResponse.json(
        { message: "Not authorized to edit this post" },
        { status: 403 },
      );
    }

    const body = await request.json();

    post.title = body.title;
    post.content = body.content;
    post.category = body.category;

    await post.save();

    return NextResponse.json({
      message: "Post updated successfully",
      id: post._id,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { message: "Failed to update post" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const post = await Post.findById(params.id);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    if (post.author !== userId) {
      return NextResponse.json(
        { message: "Not authorized to delete this post" },
        { status: 403 },
      );
    }

    await Post.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { message: "Failed to delete post" },
      { status: 500 },
    );
  }
}
