"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { cn } from "@/lib/utils";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#05070D]">
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Navbar collapsed={collapsed} />
      <main
        className={cn(
          "mt-16 p-8 transition-all duration-300",
          collapsed ? "ml-20" : "ml-64",
        )}
      >
        {children}
      </main>
    </div>
  );
}
