// biome-ignore lint/style/useImportType: <explanation>
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { generateUniqueSlug } from "@/utils/slugify";

/* ----------------------------- GET BLOG ----------------------------- */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    await connectDB();

    const blog = await BlogPost.findById(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ---------------------------- UPDATE BLOG ---------------------------- */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    await connectDB();

    const body = await request.json();
    const { title, summary, content, tag, image, published, publishedAt } =
      body;

    const blog = await BlogPost.findById(id);
    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    // Update slug only if title changed
    let slug = blog.slug;
    if (title && title !== blog.title) {
      slug = await generateUniqueSlug(title, BlogPost, id);
    }

    const updatedBlog = await BlogPost.findByIdAndUpdate(
      id,
      {
        title: title ?? blog.title,
        slug,
        summary: summary ?? blog.summary,
        content: content ?? blog.content,
        tag,
        image,
        published: published ?? blog.published,
        publishedAt: publishedAt ?? blog.publishedAt,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedBlog,
      message: "Blog updated successfully",
    });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

/* ---------------------------- DELETE BLOG ---------------------------- */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const user = verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;

    await connectDB();

    const blog = await BlogPost.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, message: "Blog not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
