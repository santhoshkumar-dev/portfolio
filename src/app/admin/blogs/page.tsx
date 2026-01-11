"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Column,
  Row,
  Heading,
  Button,
  Text,
  Spinner,
} from "@once-ui-system/core";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  tag: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
}

export default function AdminBlogs() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/admin/blogs");
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
      } else {
        alert("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("An error occurred while deleting the blog");
    }
  };

  if (loading) {
    return (
      <Column fillWidth gap="24">
        <Heading variant="heading-strong-xl">Blogs</Heading>
        <Spinner />
      </Column>
    );
  }

  return (
    <Column fillWidth gap="24" maxWidth="xl">
      <Row fillWidth horizontal="between" vertical="center">
        <Heading variant="heading-strong-xl">Blogs</Heading>
        <Link href="/admin/blogs/new">
          <Button variant="primary">Create New Blog</Button>
        </Link>
      </Row>

      {blogs.length === 0 ? (
        <Text onBackground="neutral-weak">
          No blogs yet. Create your first blog!
        </Text>
      ) : (
        <Column
          fillWidth
          gap="8"
          padding="16"
          background="surface"
          radius="l"
          border="neutral-medium"
        >
          {blogs.map((blog) => (
            <Row
              key={blog._id}
              fillWidth
              paddingY="16"
              paddingX="16"
              horizontal="between"
              vertical="center"
              style={{ borderBottom: "1px solid var(--neutral-border-weak)" }}
            >
              <Column gap="4" fillWidth>
                <Row gap="8" vertical="center">
                  <Heading variant="heading-strong-m">{blog.title}</Heading>
                  {blog.published ? (
                    <Text
                      variant="label-default-xs"
                      onBackground="success-medium"
                      paddingX="8"
                      paddingY="2"
                      style={{ background: "var(--success-background-weak)" }}
                    >
                      Published
                    </Text>
                  ) : (
                    <Text
                      variant="label-default-xs"
                      onBackground="neutral-medium"
                      paddingX="8"
                      paddingY="2"
                      style={{ background: "var(--neutral-background-weak)" }}
                    >
                      Draft
                    </Text>
                  )}
                </Row>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {blog.summary}
                </Text>
                <Row gap="8">
                  <Text variant="label-default-xs" onBackground="neutral-weak">
                    Slug: {blog.slug}
                  </Text>
                  {blog.tag && (
                    <Text
                      variant="label-default-xs"
                      onBackground="neutral-weak"
                    >
                      • Tag: {blog.tag}
                    </Text>
                  )}
                </Row>
              </Column>

              <Row gap="8">
                <Link href={`/admin/blogs/edit/${blog._id}`}>
                  <Button variant="secondary" size="s">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="s"
                  onClick={() => handleDelete(blog._id)}
                >
                  Delete
                </Button>
              </Row>
            </Row>
          ))}
        </Column>
      )}
    </Column>
  );
}
