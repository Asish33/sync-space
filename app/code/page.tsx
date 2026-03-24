"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/user";
import axios from "axios";
import { nanoid } from "nanoid";
import { CodeEditor } from "@/components/code-editor";
import AiChatPanel from "@/components/ai-chat-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DashboardShell } from "@/components/dashboard-shell";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CodePage() {
  const router = useRouter();
  const { session, isPending } = User();
  const [content, setContent] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please provide a file name before saving");
      return;
    }

    const codeId = nanoid(12);
    try {
      setIsSaving(true);

      // Extract editor content as a JSON object (mirrors notes' editor.getJSON() pattern)
      const contentJson = { code: content, language };

      await axios.post(
        `http://localhost:3000/code/${codeId}`,
        {
          title,
          content: contentJson,
          language,
        },
        {
          withCredentials: true,
        },
      );
      console.log("Code saved");
      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen w-full bg-[#05070D] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#3DE1A1]" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <DashboardShell>
      <div className="w-full min-h-screen bg-[#05070D] text-white selection:bg-[#3DE1A1]/30 relative overflow-x-hidden">
        <AiChatPanel
          onAddToNotes={(rawContent) =>
            setContent(
              (prev) => prev + (prev.trim() ? "\n\n" : "") + rawContent,
            )
          }
          getContextData={() => `Language: ${language}\n\nCode:\n${content}`}
        />
        <main className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Code Editor
              </h1>
              <p className="text-base text-[#A0A8B8]">
                Write your code below. When you&apos;re ready, click Save.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-md bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1] hover:from-[#6be6a0] hover:to-[#31c98e] text-black font-semibold shadow-[0_0_15px_rgba(61,225,161,0.2)] hover:shadow-[0_0_20px_rgba(61,225,161,0.4)] transition-all px-6 h-10"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin text-black" />
                    Saving...
                  </>
                ) : (
                  "Save code"
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="File name (e.g. main.js)"
              className="text-lg font-medium bg-[#070A14] border-white/[0.08] text-white placeholder:text-[#A0A8B8] focus-visible:ring-1 focus-visible:ring-[#3DE1A1] h-12 rounded-lg px-4 w-full"
            />

            <div className="rounded-xl overflow-hidden border border-white/[0.08] shadow-xl">
              <CodeEditor
                content={content}
                onChange={(value) => setContent(value)}
                language={language}
                onLanguageChange={(lang) => setLanguage(lang)}
                editable={true}
                height="500px"
              />
            </div>
          </div>
        </main>
      </div>
    </DashboardShell>
  );
}
