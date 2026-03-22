"use client";
import { User } from "@/lib/user";
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useSignOut } from "@/lib/sign-out";
export function Navbar() {
  const signOut = useSignOut();
  const { session } = User();
  const name = session?.user?.name || "";
  const initials =
    name.length > 1
      ? name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()
      : name.toUpperCase();

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <nav className="fixed top-0 right-0 left-64 h-16 bg-background border-b border-border flex items-center justify-between px-6 z-10">
        <div className="flex-1 max-w-md">
          {/* Skeleton or empty state could go here, but for now matching the structure without unique content */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search notes, groups..."
              className="w-full pl-9 bg-secondary"
            />
          </div>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          {/* Render nothing or a placeholder for the user profile part to match server */}
        </div>
      </nav>
    );
  }
  return (
    <nav className="fixed top-0 right-0 left-64 h-16 bg-background border-b border-border flex items-center justify-between px-6 z-10">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search notes, groups..."
            className="w-full pl-9 bg-secondary"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-muted hover:text-foreground h-9 w-9 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring outline-none">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center text-white text-sm font-semibold">
              {initials}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center gap-3 p-3 border-b border-border">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                {initials}
              </div>
              <div>
                <p className="text-sm font-medium">{name}</p>
                <p className="text-xs text-muted-foreground">
                  {session?.user?.email}
                </p>
              </div>
            </div>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={signOut}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
