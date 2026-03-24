"use client";
import { User } from "@/lib/user";
import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useSignOut } from "@/lib/sign-out";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Navbar({ collapsed }: { collapsed?: boolean }) {
  const signOut = useSignOut();
  const { session } = User();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNotesPage = pathname?.startsWith("/notes");

  const [inputValue, setInputValue] = React.useState(
    searchParams?.get("q") || "",
  );

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Only push if the value actually changed from the current URL to prevent infinite loops
      const currentQ = searchParams?.get("q") || "";
      if (inputValue !== currentQ) {
        if (inputValue) {
          router.push(`/dashboard?q=${encodeURIComponent(inputValue)}`);
        } else {
          router.push(`/dashboard`);
        }
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [inputValue, router, searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const name = session?.user?.name || "";
  const initials =
    name.length > 1
      ? name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase()
      : name.toUpperCase();

  const [isMounted, ReactSetIsMounted] = React.useState(false);

  React.useEffect(() => {
    ReactSetIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <nav
        className={cn(
          "fixed top-0 right-0 h-16 bg-[#070A14] border-b border-white/[0.08] flex items-center justify-between px-6 z-40 transition-all duration-300",
          collapsed ? "left-20" : "left-64",
        )}
      >
        <div className="flex-1 max-w-md">
          {!isNotesPage && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A8B8] pointer-events-none" />
              <Input
                type="text"
                placeholder="Search notes, codebase..."
                value={inputValue}
                onChange={handleSearchChange}
                className="w-full pl-9 bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-[#A0A8B8]/50 focus-visible:ring-1 focus-visible:ring-[#3DE1A1]"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 ml-auto"></div>
      </nav>
    );
  }
  return (
    <nav
      className={cn(
        "fixed top-0 right-0 h-16 bg-[#070A14] border-b border-white/[0.08] flex items-center justify-between px-6 z-40 transition-all duration-300",
        collapsed ? "left-20" : "left-64",
      )}
    >
      {/* Search */}
      <div className="flex-1 max-w-md">
        {!isNotesPage && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A0A8B8] pointer-events-none" />
            <Input
              type="text"
              placeholder="Search notes, codebase..."
              value={inputValue}
              onChange={handleSearchChange}
              className="w-full pl-9 bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-[#A0A8B8]/50 focus-visible:ring-1 focus-visible:ring-[#3DE1A1]"
            />
          </div>
        )}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4 ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex shrink-0 items-center justify-center rounded-lg text-sm font-medium transition-colors hover:bg-white/5 h-9 w-9 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3DE1A1] outline-none">
            <div className="w-8 h-8 bg-gradient-to-br from-[#7CFFB2] to-[#3DE1A1] rounded-lg flex items-center justify-center text-black text-sm font-bold shadow-[0_0_15px_rgba(61,225,161,0.2)]">
              {initials}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-[#0B1020] border-white/[0.1] text-white shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 p-3 border-b border-white/[0.1]">
              <div className="w-10 h-10 bg-gradient-to-br from-[#7CFFB2] to-[#3DE1A1] rounded-lg flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(61,225,161,0.2)]">
                {initials}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{name}</p>
                <p className="text-xs text-[#A0A8B8]">{session?.user?.email}</p>
              </div>
            </div>
            <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer">
              Preferences
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/[0.1]" />
            <DropdownMenuItem
              className="text-red-400 focus:bg-red-500/10 focus:text-red-300 cursor-pointer"
              onClick={signOut}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
