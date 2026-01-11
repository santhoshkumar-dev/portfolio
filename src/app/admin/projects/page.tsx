"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Column,
  Row,
  Flex,
  Heading,
  Button,
  Text,
  Spinner,
} from "@once-ui-system/core";
import Link from "next/link";

interface Project {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
}

export default function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/admin/projects");
      const data = await response.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects(projects.filter((project) => project._id !== id));
      } else {
        alert("Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("An error occurred while deleting the project");
    }
  };

  if (loading) {
    return (
      <Column fillWidth gap="24">
        <Heading variant="heading-strong-xl">Projects</Heading>
        <Spinner />
      </Column>
    );
  }

  return (
    <Column fillWidth gap="24" maxWidth="xl">
      <Row fillWidth horizontal="between" vertical="center">
        <Heading variant="heading-strong-xl">Projects</Heading>
        <Link href="/admin/projects/new">
          <Button variant="primary">Create New Project</Button>
        </Link>
      </Row>

      {projects.length === 0 ? (
        <Text onBackground="neutral-weak">
          No projects yet. Create your first project!
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
          {projects.map((project) => (
            <Row
              key={project._id}
              fillWidth
              paddingY="16"
              paddingX="16"
              horizontal="between"
              vertical="center"
              style={{ borderBottom: "1px solid var(--neutral-border-weak)" }}
            >
              <Column gap="4" fillWidth>
                <Row gap="8" vertical="center">
                  <Heading variant="heading-strong-m">{project.title}</Heading>
                  {project.published ? (
                    <Flex
                      paddingX="8"
                      paddingY="2"
                      radius="s"
                      style={{ background: "var(--success-background-weak)" }}
                    >
                      <Text
                        variant="label-default-xs"
                        onBackground="success-medium"
                      >
                        Published
                      </Text>
                    </Flex>
                  ) : (
                    <Flex
                      paddingX="8"
                      paddingY="2"
                      radius="s"
                      style={{ background: "var(--neutral-background-weak)" }}
                    >
                      <Text
                        variant="label-default-xs"
                        onBackground="neutral-medium"
                      >
                        Draft
                      </Text>
                    </Flex>
                  )}
                </Row>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {project.summary}
                </Text>
                <Text variant="label-default-xs" onBackground="neutral-weak">
                  Slug: {project.slug}
                </Text>
              </Column>

              <Row gap="8">
                <Link href={`/admin/projects/edit/${project._id}`}>
                  <Button variant="secondary" size="s">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="s"
                  onClick={() => handleDelete(project._id)}
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
