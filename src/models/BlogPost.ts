// biome-ignore lint/style/useImportType: <explanation>
import mongoose, { Schema, Model } from "mongoose";

export interface IBlogPost {
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  publishedAt: Date;
  tag?: string;
  image?: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    summary: {
      type: String,
      required: [true, "Summary is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    tag: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
BlogPostSchema.index({ published: 1, publishedAt: -1 });

const BlogPost: Model<IBlogPost> =
  mongoose.models.BlogPost ||
  mongoose.model<IBlogPost>("BlogPost", BlogPostSchema);

export default BlogPost;
