import mongoose, { Schema, Model } from "mongoose";

export interface ITeamMember {
  name: string;
  role: string;
  avatar: string;
}

export interface IProject {
  _id?: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  publishedAt: Date;
  images: string[];
  team: ITeamMember[];
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TeamMemberSchema = new Schema<ITeamMember>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: true,
    trim: true,
  },
});

const ProjectSchema = new Schema<IProject>(
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
    images: {
      type: [String],
      default: [],
    },
    team: {
      type: [TeamMemberSchema],
      default: [],
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
ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ published: 1, publishedAt: -1 });

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
