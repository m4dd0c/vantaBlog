import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } },
) {
  try {
    const { userId: authUserId } = auth();

    if (!authUserId || authUserId !== params.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const blogs = await Blog.find({ authorId: params.userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch user blogs" },
      { status: 500 },
    );
  }
}
