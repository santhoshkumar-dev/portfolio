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

export default function NewProject() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    images: "",
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Parse images as array
      const imagesArray = formData.images
        .split("\n")
        .map((img) => img.trim())
        .filter((img) => img.length > 0);

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          summary: formData.summary,
          content: formData.content,
          images: imagesArray,
          team: [],
          published: formData.published,
          publishedAt: new Date().toISOString(),
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/admin/projects");
      } else {
        setError(data.message || "Failed to create project");
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
        <Heading variant="heading-strong-xl">Create New Project</Heading>
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

          <Column gap="4">
            <Textarea
              id="images"
              label="Images (one URL per line)"
              value={formData.images}
              onChange={(e) =>
                setFormData({ ...formData, images: e.target.value })
              }
              rows={4}
            />
            <Text variant="label-default-xs" onBackground="neutral-weak">
              Enter one image URL per line
            </Text>
          </Column>

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
              {loading ? "Creating..." : "Create Project"}
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
