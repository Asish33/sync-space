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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DashboardShell } from "@/components/dashboard-shell";
import { Loader2 } from "lucide-react";

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
      <div className="w-full min-h-[calc(100vh-4rem)] bg-[#05070D] text-white selection:bg-[#3DE1A1]/30 relative overflow-x-hidden flex justify-center px-4 py-8">
        <AiChatPanel
          onAddToNotes={handleAddToNotes}
          getContextData={() => content}
        />
        <Card className="w-full max-w-4xl border border-white/[0.08] bg-[#070A14] flex flex-col gap-0 rounded-3xl overflow-hidden shadow-2xl h-fit">
          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-6 border-b border-white/[0.08] bg-white/[0.02] p-8">
            <div className="flex flex-col gap-2">
              <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                Create Note
              </CardTitle>
              <CardDescription className="text-base text-[#A0A8B8]">
                Write and edit your notes below. When you&apos;re ready, click
                Save.
              </CardDescription>
            </div>

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
          </CardHeader>

          <CardContent className="flex flex-col gap-4 p-6">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note Title..."
              className="text-lg font-medium bg-[#070A14] border-white/[0.08] text-white placeholder:text-[#A0A8B8] focus-visible:ring-1 focus-visible:ring-[#3DE1A1] h-10 rounded-md px-3"
            />

            <div className="rounded-md border border-white/[0.08] bg-[#070A14] min-h-[300px] overflow-hidden flex flex-col">
              {viewType === "tiptap" ? (
                <div className="prose prose-invert max-w-none p-6 flex-grow">
                  <EditorContent
                    editor={editor}
                    className="min-h-[300px] outline-none"
                  />
                </div>
              ) : (
                <div className="flex flex-col flex-grow">
                  <textarea
                    value={content}
                    onChange={handleTextareaChange}
                    className="w-full min-h-[300px] p-4 border-none font-mono text-sm leading-relaxed focus:outline-none focus:ring-0 bg-transparent resize-none flex-grow text-[#A0A8B8]"
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
          </CardContent>

          <CardFooter className="flex justify-end p-4 pt-4 border-t border-white/[0.08] bg-white/[0.02]">
            <Button
              onClick={handleSave}
              className="rounded-md bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1] hover:from-[#6be6a0] hover:to-[#31c98e] text-black font-semibold shadow-[0_0_15px_rgba(61,225,161,0.2)] hover:shadow-[0_0_20px_rgba(61,225,161,0.4)] transition-all px-4 h-10"
            >
              Save Note
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardShell>
  );
}
