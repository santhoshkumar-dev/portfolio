"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Column,
  Row,
  Heading,
  Button,
  Input,
  Text,
  Textarea,
} from "@once-ui-system/core";

export default function NewBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    tag: "",
    image: "",
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          publishedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/admin/blogs");
      } else {
        setError(data.message || "Failed to create blog");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Column fillWidth gap="24" maxWidth="xl">
      <Row fillWidth horizontal="between" vertical="center">
        <Heading variant="heading-strong-xl">Create New Blog</Heading>
        <Button variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </Row>

      <form onSubmit={handleSubmit}>
        <Column
          fillWidth
          gap="16"
          padding="24"
          background="surface"
          radius="l"
          border="neutral-medium"
        >
          <Input
            id="title"
            label="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />

          <Textarea
            id="summary"
            label="Summary"
            value={formData.summary}
            onChange={(e) =>
              setFormData({ ...formData, summary: e.target.value })
            }
            rows={3}
            required
          />

          <Textarea
            id="content"
            label="Content (Markdown)"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows={15}
            required
          />

          <Input
            id="tag"
            label="Tag (optional)"
            value={formData.tag}
            onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          />

          <Input
            id="image"
            label="Image URL (optional)"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
          />

          <Row gap="8" vertical="center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) =>
                setFormData({ ...formData, published: e.target.checked })
              }
              style={{ width: "20px", height: "20px" }}
            />
            <label htmlFor="published">
              <Text>Publish immediately</Text>
            </label>
          </Row>

          {error && (
            <Text variant="body-default-s" onBackground="danger-medium">
              {error}
            </Text>
          )}

          <Row gap="8">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Creating..." : "Create Blog"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </Row>
        </Column>
      </form>
    </Column>
  );
}
