"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Layout,
  FileText,
  Users,
  BookMarked,
  Code2,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSignOut } from "@/lib/sign-out";
import { GroupsModal } from "@/components/groups-modal";
const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: Layout },
  { label: "Notes", href: "/notes", icon: FileText },
  { label: "Code", href: "/code", icon: Code2 },
  { label: "Groups", href: "", icon: Users },
  { label: "Resources", href: "/resources", icon: BookMarked },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const signOut = useSignOut();
  const [showGroupsModal, setShowGroupsModal] = useState(false);

  const handleNavigation = (
    e: React.MouseEvent,
    item: (typeof navItems)[0],
  ) => {
    if (item.label === "Groups") {
      e.preventDefault();
      setShowGroupsModal(true);
    }
  };

  return (
    <>
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
          collapsed ? "w-20" : "w-64",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookMarked className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-sidebar-foreground text-sm">
                StudyHub
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 hover:bg-sidebar-accent rounded-md transition-smooth text-sidebar-foreground hover:text-sidebar-accent-foreground"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavigation(e, item)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                )}
                title={collapsed ? item.label : ""}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-sidebar-border space-y-1">
          <button
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-smooth text-sidebar-foreground hover:bg-destructive/10 hover:text-destructive",
              collapsed && "justify-center",
            )}
            title={collapsed ? "Logout" : ""}
            aria-label="Logout"
            onClick={signOut}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      <GroupsModal open={showGroupsModal} onOpenChange={setShowGroupsModal} />
    </>
  );
}
