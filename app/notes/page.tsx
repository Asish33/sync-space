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

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center px-4 py-10 relative">
      <AiChatPanel
        onAddToNotes={handleAddToNotes}
        getContextData={() => content}
      />
      <Card className="w-full max-w-3xl shadow-sm flex flex-col gap-0 border-border">
        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
          <div className="flex flex-col gap-1.5">
            <CardTitle className="text-2xl font-semibold">Notes</CardTitle>
            <CardDescription className="text-sm">
              Write and edit your notes below. When you&apos;re ready, click
              Save.
            </CardDescription>
          </div>

          <Tabs
            value={viewType}
            onValueChange={(v) => handleSwitch(v as "markdown" | "tiptap")}
          >
            <TabsList>
              <TabsTrigger value="markdown">Markdown</TabsTrigger>
              <TabsTrigger value="tiptap">Preview</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="text-lg font-medium bg-background"
          />

          <div className="rounded-md border border-border bg-background min-h-[300px]">
            {viewType === "tiptap" ? (
              <EditorContent editor={editor} className="min-h-[300px]" />
            ) : (
              <div className="flex flex-col h-full">
                <textarea
                  value={content}
                  onChange={handleTextareaChange}
                  className="w-full min-h-[300px] p-4 border-none rounded-md font-mono text-sm focus:outline-none focus:ring-0 bg-transparent resize-none flex-grow"
                  placeholder="Type your markdown here..."
                />
                <div className="border-t border-border p-2 bg-muted/30 rounded-b-md flex justify-end">
                  <Button
                    variant="secondary"
                    onClick={() => handleSwitch("tiptap")}
                  >
                    Render Markdown &uarr;
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-end pt-4 border-t border-border">
          <Button onClick={handleSave}>Save notes</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
