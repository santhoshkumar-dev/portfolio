"use client";

import { useEffect, useState } from "react";
import { Column, Row, Heading, Text, Card } from "@once-ui-system/core";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    totalProjects: 0,
    publishedProjects: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [blogsRes, projectsRes] = await Promise.all([
          fetch("/api/admin/blogs"),
          fetch("/api/admin/projects"),
        ]);

        const blogsData = await blogsRes.json();
        const projectsData = await projectsRes.json();

        if (blogsData.success && projectsData.success) {
          const publishedBlogs = blogsData.data.filter(
            (b: any) => b.published
          ).length;
          const publishedProjects = projectsData.data.filter(
            (p: any) => p.published
          ).length;

          setStats({
            totalBlogs: blogsData.data.length,
            publishedBlogs,
            totalProjects: projectsData.data.length,
            publishedProjects,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Column fillWidth gap="24">
        <Heading variant="heading-strong-xl">Dashboard</Heading>
        <Text>Loading statistics...</Text>
      </Column>
    );
  }

  return (
    <Column fillWidth gap="24" maxWidth="xl">
      <Heading variant="heading-strong-xl">Dashboard</Heading>
      <Text variant="body-default-l" onBackground="neutral-weak">
        Welcome to your portfolio admin dashboard
      </Text>

      <Row gap="16" wrap>
        <Card
          padding="24"
          gap="8"
          fillWidth
          background="surface"
          border="neutral-medium"
          radius="l"
        >
          <Text variant="label-default-s" onBackground="neutral-weak">
            Total Blogs
          </Text>
          <Heading variant="display-strong-s">{stats.totalBlogs}</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {stats.publishedBlogs} published
          </Text>
        </Card>

        <Card
          padding="24"
          gap="8"
          fillWidth
          background="surface"
          border="neutral-medium"
          radius="l"
        >
          <Text variant="label-default-s" onBackground="neutral-weak">
            Total Projects
          </Text>
          <Heading variant="display-strong-s">{stats.totalProjects}</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            {stats.publishedProjects} published
          </Text>
        </Card>
      </Row>
    </Column>
  );
}
