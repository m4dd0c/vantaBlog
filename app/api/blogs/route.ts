import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get("search");
    const category = searchParams.get("category");

    let query: any = { published: true };

    if (search) {
      query.$text = { $search: search };
    }

    if (category && category !== "All Categories") {
      query.category = category;
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 }).limit(50);

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.log("err", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { title, excerpt, content, category, authorId, authorName } = body;

    if (userId !== authorId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const blog = new Blog({
      title,
      excerpt,
      content,
      category,
      authorId,
      authorName,
      published: true,
    });

    await blog.save();

    return NextResponse.json({ blog }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 },
    );
  }
}
