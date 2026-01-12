"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Column,
  Heading,
  Input,
  Button,
  Text,
  PasswordInput,
} from "@once-ui-system/core";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        router.push("/admin");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Column
      fillWidth
      fillHeight
      horizontal="center"
      vertical="center"
      style={{ minHeight: "100vh" }}
      paddingY="l"
    >
      <Column
        maxWidth={24}
        fillWidth
        gap="24"
        padding="32"
        radius="l"
        border="neutral-medium"
        background="surface"
      >
        <Heading variant="heading-strong-xl" align="center">
          Admin Login
        </Heading>
        <Text
          variant="body-default-m"
          onBackground="neutral-weak"
          align="center"
        >
          Enter your credentials to access the dashboard
        </Text>

        <form onSubmit={handleSubmit}>
          <Column gap="16" fillWidth>
            <Input
              id="username"
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <PasswordInput
              id="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <Text variant="body-default-s" onBackground="danger-medium">
                {error}
              </Text>
            )}

            <Button
              type="submit"
              variant="primary"
              fillWidth
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Column>
        </form>
      </Column>
    </Column>
  );
}
