"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Column, Row, Heading, Button, Spinner } from "@once-ui-system/core";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      // Skip auth check for login page
      if (pathname === "/admin/login") {
        setLoading(false);
        setAuthenticated(true);
        return;
      }

      try {
        const response = await fetch("/api/admin/verify");
        if (response.ok) {
          setAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      } catch (error) {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <Column
        fillWidth
        fillHeight
        horizontal="center"
        vertical="center"
        minHeight="100vh"
      >
        <Spinner />
      </Column>
    );
  }

  if (!authenticated) {
    return null;
  }

  // Don't show nav on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <Column fillWidth fillHeight minHeight="100vh">
      {/* Admin Navigation */}
      <Row
        fillWidth
        paddingX="24"
        paddingY="16"
        gap="16"
        horizontal="between"
        vertical="center"
        background="surface"
        border="neutral-medium"
        style={{ borderBottom: "1px solid var(--neutral-border-medium)" }}
      >
        <Row gap="24" vertical="center">
          <Heading variant="heading-strong-l">Admin Dashboard</Heading>
          <Row gap="16" as="nav">
            <Link href="/admin">
              <Button
                variant={pathname === "/admin" ? "primary" : "secondary"}
                size="m"
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/blogs">
              <Button
                variant={
                  pathname?.startsWith("/admin/blogs") ? "primary" : "secondary"
                }
                size="m"
              >
                Blogs
              </Button>
            </Link>
            <Link href="/admin/projects">
              <Button
                variant={
                  pathname?.startsWith("/admin/projects")
                    ? "primary"
                    : "secondary"
                }
                size="m"
              >
                Projects
              </Button>
            </Link>
          </Row>
        </Row>
        <Button variant="danger" size="m" onClick={handleLogout}>
          Logout
        </Button>
      </Row>

      {/* Main Content */}
      <Column fillWidth padding="24">
        {children}
      </Column>
    </Column>
  );
}
