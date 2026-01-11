// biome-ignore lint/style/useImportType: <explanation>
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { generateUniqueSlug } from "@/utils/slugify";

// GET: List all projects (admin only)
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

    const projects = await Project.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments();

    return NextResponse.json({
      success: true,
      data: projects,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Create new project (admin only)
export async function POST(request: NextRequest) {
  try {
    const user = verifyAdminToken(request);
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { title, summary, content, images, team, published, publishedAt } =
      body;

    if (!title || !summary || !content) {
      return NextResponse.json(
        { success: false, message: "Title, summary, and content are required" },
        { status: 400 }
      );
    }

    // Generate unique slug from title
    const slug = await generateUniqueSlug(title, Project);

    const project = await Project.create({
      title,
      slug,
      summary,
      content,
      images: images || [],
      team: team || [],
      published: published || false,
      publishedAt: publishedAt || new Date(),
    });

    return NextResponse.json(
      { success: true, data: project, message: "Project created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
