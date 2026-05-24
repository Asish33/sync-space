import type React from "react";
import { DashboardShell } from "@/components/dashboard-shell";

export default function GroupsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}
