"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Column,
  Row,
  Heading,
  Button,
  Input,
  Text,
  Textarea,
  Spinner,
} from "@once-ui-system/core";

export default function EditBlog() {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;

  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    tag: "",
    image: "",
    published: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/admin/blogs/${blogId}`);
        const data = await response.json();

        if (data.success) {
          setFormData({
            title: data.data.title,
            summary: data.data.summary,
            content: data.data.content,
            tag: data.data.tag || "",
            image: data.data.image || "",
            published: data.data.published,
          });
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    try {
      const response = await fetch(`/api/admin/blogs/${blogId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/admin/blogs");
      } else {
        setError(data.message || "Failed to update blog");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Column fillWidth gap="24" horizontal="center" paddingY="40">
        <Spinner />
      </Column>
    );
  }

  if (error && !formData.title) {
    return (
      <Column fillWidth gap="24">
        <Heading variant="heading-strong-xl">Edit Blog</Heading>
        <Text onBackground="danger-medium">{error}</Text>
        <Button variant="secondary" onClick={() => router.back()}>
          Go Back
        </Button>
      </Column>
    );
  }

  return (
    <Column fillWidth gap="24" maxWidth="xl">
      <Row fillWidth horizontal="between" vertical="center">
        <Heading variant="heading-strong-xl">Edit Blog</Heading>
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
              <Text>Published</Text>
            </label>
          </Row>

          {error && (
            <Text variant="body-default-s" onBackground="danger-medium">
              {error}
            </Text>
          )}

          <Row gap="8">
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
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
