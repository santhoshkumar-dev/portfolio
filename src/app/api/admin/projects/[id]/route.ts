// biome-ignore lint/style/useImportType: <explanation>
import { NextRequest, NextResponse } from "next/server";
import { verifyAdminToken } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { generateUniqueSlug } from "@/utils/slugify";

// GET: Get single project by ID (admin only)
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

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: Update project by ID (admin only)
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
    const { title, summary, content, images, team, published, publishedAt } =
      body;

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    // Update slug if title changed
    let slug = project.slug;
    if (title && title !== project.title) {
      slug = await generateUniqueSlug(title, Project, id);
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        title: title || project.title,
        slug,
        summary: summary || project.summary,
        content: content || project.content,
        images: images || project.images,
        team: team || project.team,
        published: published !== undefined ? published : project.published,
        publishedAt: publishedAt || project.publishedAt,
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      data: updatedProject,
      message: "Project updated successfully",
    });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE: Delete project by ID (admin only)
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

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
