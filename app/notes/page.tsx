"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/user";
import axios from "axios";
import { nanoid } from "nanoid";
import { EditorContent } from "@tiptap/react";
import "@/components/editor.css";
import { useNoteEditor } from "@/hooks/use-note-editor";
import AiChatPanel from "@/components/ai-chat-panel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardShell } from "@/components/dashboard-shell";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function NotesPage() {
  const router = useRouter();
  const { session, isPending } = User();
  const [content, setContent] = useState<string>("");
  const [viewType, setViewType] = useState<"markdown" | "tiptap">("markdown");
  const [title, setTitle] = useState<string>("");
  const editor = useNoteEditor({
    content,
    onUpdate: (markdown) => {
      if (viewType === "tiptap") {
        setContent(markdown);
      }
    },
  });

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleSwitch = (type: "markdown" | "tiptap") => {
    if (type === viewType) return;

    if (type === "tiptap" && editor) {
      editor.commands.setContent(content, { contentType: "markdown" } as any);
    }

    setViewType(type);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Please provide a note title before saving");
      return;
    }

    const notesId = nanoid(12);
    await axios
      .post(
        `http://localhost:3000/notes/${notesId}`,
        {
          title: title,
          content: content,
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log("Notes saved");
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddToNotes = (rawContent: string, markdownContent?: string) => {
    // Determine the text to append
    const textToAppend = "\n\n" + (markdownContent || rawContent);

    if (viewType === "tiptap" && editor) {
      // Append to tiptap editor
      editor.commands.insertContent(textToAppend);
      // Update content state
      const markdown =
        (editor.storage?.markdown as any)?.getMarkdown?.() ||
        (editor as any).getMarkdown?.() ||
        "";
      setContent(markdown);
    } else {
      // Append to markdown textarea
      const updatedContent = content + textToAppend;
      setContent(updatedContent);
      // If editor exists, also update its content so it stays in sync
      if (editor) {
        editor.commands.setContent(updatedContent, {
          contentType: "markdown",
        } as any);
      }
    }
  };

  if (!isMounted || isPending) {
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
          onAddToNotes={handleAddToNotes}
          getContextData={() => content}
        />

        <main className="relative z-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                Create Note
              </h1>
              <p className="text-base text-[#A0A8B8]">
                Write and edit your notes below. When you&apos;re ready, click
                Save.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Tabs
                value={viewType}
                onValueChange={(v) => handleSwitch(v as "markdown" | "tiptap")}
                className="bg-black/30 p-1.5 rounded-xl border border-white/[0.05]"
              >
                <TabsList className="bg-transparent gap-2">
                  <TabsTrigger
                    value="markdown"
                    className="text-[#A0A8B8] data-[state=active]:bg-white/10 data-[state=active]:text-white data-active:bg-white/10 data-active:text-white rounded-md px-4 py-1.5 font-medium transition-all hover:text-white"
                  >
                    Markdown
                  </TabsTrigger>
                  <TabsTrigger
                    value="tiptap"
                    className="text-[#A0A8B8] data-[state=active]:bg-white/10 data-[state=active]:text-white data-active:bg-white/10 data-active:text-white rounded-md px-4 py-1.5 font-medium transition-all hover:text-white"
                  >
                    Preview
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              <Button
                onClick={handleSave}
                className="rounded-md bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1] hover:from-[#6be6a0] hover:to-[#31c98e] text-black font-semibold shadow-[0_0_15px_rgba(61,225,161,0.2)] hover:shadow-[0_0_20px_rgba(61,225,161,0.4)] transition-all px-6 h-10"
              >
                Save Note
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title..."
              className="text-lg font-medium bg-[#070A14] border-white/[0.08] text-white placeholder:text-[#A0A8B8] focus-visible:ring-1 focus-visible:ring-[#3DE1A1] h-12 rounded-lg px-4 w-full"
            />

            <div className="rounded-xl border border-white/[0.08] bg-[#070A14] min-h-[500px] overflow-hidden flex flex-col shadow-xl">
              {viewType === "tiptap" ? (
                <div className="prose prose-invert max-w-none p-6 md:p-10 flex-grow">
                  <EditorContent
                    editor={editor}
                    className="min-h-[500px] outline-none"
                  />
                </div>
              ) : (
                <div className="flex flex-col flex-grow">
                  <textarea
                    value={content}
                    onChange={handleTextareaChange}
                    className="w-full min-h-[500px] p-6 md:p-10 border-none font-mono text-sm leading-relaxed focus:outline-none focus:ring-0 bg-transparent resize-none flex-grow text-[#A0A8B8]"
                    placeholder="# Welcome to your new note
                    
Start typing markdown here..."
                  />
                  <div className="border-t border-white/[0.08] p-2 bg-white/[0.02] flex justify-end">
                    <Button
                      variant="ghost"
                      onClick={() => handleSwitch("tiptap")}
                      className="text-[#3DE1A1] hover:bg-[#3DE1A1]/10 hover:text-[#7CFFB2] font-semibold tracking-wide h-9 px-3"
                    >
                      Render Preview &rarr;
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </DashboardShell>
  );
}
