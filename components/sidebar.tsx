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
import { Button } from "@/components/ui/button";
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

export function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}) {
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
          "fixed left-0 top-0 h-screen bg-[#070A14] border-r border-white/[0.08] transition-all duration-300 z-50",
          collapsed ? "w-20" : "w-64",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/[0.08]">
          {!collapsed && (
            <div className="flex items-center gap-3 truncate">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7CFFB2] to-[#3DE1A1] flex items-center justify-center shrink-0">
                <div className="w-3 h-3 bg-[#05070D] rounded-full" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight truncate">
                Sync Space
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 hover:bg-white/5 text-[#A0A8B8] hover:text-white shrink-0 mx-auto"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2 p-3 mt-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.label === "Groups"
                ? showGroupsModal
                : item.href !== "" &&
                  (pathname === item.href ||
                    pathname.startsWith(item.href + "/"));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavigation(e, item)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-white/5 text-[#3DE1A1] font-semibold shadow-sm border border-white/[0.05]"
                    : "text-[#A0A8B8] hover:bg-white/[0.02] hover:text-white border border-transparent",
                  collapsed && "justify-center px-0",
                )}
                title={collapsed ? item.label : ""}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 flex-shrink-0",
                    isActive ? "text-[#3DE1A1]" : "text-[#A0A8B8]",
                  )}
                />
                {!collapsed && (
                  <span className="text-sm truncate">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/[0.08] space-y-2 bg-[#070A14]">
          <Button
            variant="ghost"
            className={cn(
              "w-full flex items-center h-auto gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-[#A0A8B8] hover:bg-red-500/10 hover:text-red-400 justify-start border border-transparent hover:border-red-500/20",
              collapsed && "justify-center px-0",
            )}
            title={collapsed ? "Logout" : ""}
            aria-label="Logout"
            onClick={signOut}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <span className="text-sm font-semibold truncate">Logout</span>
            )}
          </Button>
        </div>
      </aside>

      <GroupsModal open={showGroupsModal} onOpenChange={setShowGroupsModal} />
    </>
  );
}
