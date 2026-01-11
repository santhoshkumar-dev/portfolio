// biome-ignore lint/style/useImportType: <explanation>
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { generateUniqueSlug } from "@/utils/slugify";

// GET: List all blogs (admin only)
export async function GET(request: NextRequest) {
  try {
    const user = verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const blogs = await BlogPost.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await BlogPost.countDocuments();

    return NextResponse.json({
      success: true,
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Create new blog (admin only)
export async function POST(request: NextRequest) {
  try {
    const user = verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { title, summary, content, tag, image, published, publishedAt } =
      body;

    if (!title || !summary || !content) {
      return NextResponse.json(
        { success: false, message: "Title, summary, and content are required" },
        { status: 400 }
      );
    }

    // Generate unique slug from title
    const slug = await generateUniqueSlug(title, BlogPost);

    const blog = await BlogPost.create({
      title,
      slug,
      summary,
      content,
      tag,
      image,
      published: published || false,
      publishedAt: publishedAt || new Date(),
    });

    return NextResponse.json(
      { success: true, data: blog, message: "Blog created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
