/**
 * Migration Script: MDX to MongoDB
 *
 * This script migrates existing MDX blog posts and projects to MongoDB
 * Run with: npx ts-node scripts/migrate-mdx-to-db.ts
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import mongoose from "mongoose";

// Import models
const BlogPostSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    summary: String,
    content: String,
    publishedAt: Date,
    tag: String,
    image: String,
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    summary: String,
    content: String,
    publishedAt: Date,
    images: [String],
    team: [
      {
        name: String,
        role: String,
        avatar: String,
      },
    ],
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

async function migrateBlogPosts() {
  const blogDir = path.join(process.cwd(), "src", "app", "blog", "posts");

  if (!fs.existsSync(blogDir)) {
    console.log("⚠️  Blog posts directory not found");
    return 0;
  }

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"));
  let migrated = 0;

  for (const file of files) {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const slug = slugify(data.title || file.replace(".mdx", ""));

    // Check if already exists
    const existing = await BlogPost.findOne({ slug });
    if (existing) {
      console.log(`⏭️  Blog "${data.title}" already exists, skipping...`);
      continue;
    }

    await BlogPost.create({
      title: data.title,
      slug,
      summary: data.summary || "",
      content,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      tag: data.tag || "",
      image: data.image || "",
      published: true,
    });

    console.log(`✅ Migrated blog: ${data.title}`);
    migrated++;
  }

  return migrated;
}

async function migrateProjects() {
  const projectDir = path.join(process.cwd(), "src", "app", "work", "projects");

  if (!fs.existsSync(projectDir)) {
    console.log("⚠️  Projects directory not found");
    return 0;
  }

  const files = fs
    .readdirSync(projectDir)
    .filter((file) => file.endsWith(".mdx"));
  let migrated = 0;

  for (const file of files) {
    const filePath = path.join(projectDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    const slug = slugify(data.title || file.replace(".mdx", ""));

    // Check if already exists
    const existing = await Project.findOne({ slug });
    if (existing) {
      console.log(`⏭️  Project "${data.title}" already exists, skipping...`);
      continue;
    }

    await Project.create({
      title: data.title,
      slug,
      summary: data.summary || "",
      content,
      publishedAt: data.publishedAt ? new Date(data.publishedAt) : new Date(),
      images: data.images || [],
      team: data.team || [],
      published: true,
    });

    console.log(`✅ Migrated project: ${data.title}`);
    migrated++;
  }

  return migrated;
}

async function main() {
  console.log("🚀 Starting migration from MDX to MongoDB...\n");

  await connectDB();

  console.log("📝 Migrating blog posts...");
  const blogsMigrated = await migrateBlogPosts();

  console.log("\n📁 Migrating projects...");
  const projectsMigrated = await migrateProjects();

  console.log("\n✨ Migration complete!");
  console.log(`   - Blogs migrated: ${blogsMigrated}`);
  console.log(`   - Projects migrated: ${projectsMigrated}`);

  await mongoose.disconnect();
  console.log("\n✅ Disconnected from MongoDB");
}

main().catch(console.error);
