"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { User } from "@/lib/user";
import axios from "axios";
import { EditorContent } from "@tiptap/react";
import { toast } from "sonner";
import "@/components/editor.css";
import { useNoteEditor } from "@/hooks/use-note-editor";
import AiChatPanel from "@/components/ai-chat-panel";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

export default function NotePage() {
  const params = useParams();
  const router = useRouter();
  const noteId = params.id as string;
  const { session, isPending } = User();

  const [note, setNote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const editor = useNoteEditor({
    content: note?.content || "",
    editable: true,
  });

  // Auth check
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Fetch note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/notes/${noteId}`,
          {
            withCredentials: true,
          },
        );
        console.log("Fetched note:", response.data);
        setNote(response.data.notes);
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    };

    if (noteId) {
      fetchNote();
    }
  }, [noteId]);

  // Set initial content
  useEffect(() => {
    if (editor && note?.content) {
      editor.commands.setContent(note.content, {
        contentType: "markdown",
      } as any);
    }
  }, [editor, note]);

  // Save note
  const handleSave = async () => {
    if (!editor) return;

    try {
      setIsSaving(true);
      const editorAny = editor as any;
      const content =
        editorAny.storage?.markdown?.getMarkdown?.() ||
        editorAny.getMarkdown?.() ||
        "";

      await axios.put(
        `http://localhost:3000/updateNotes/${noteId}`,
        { content, title: note?.title },
        { withCredentials: true },
      );
      toast.success("Note saved!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save note");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddToNotes = (rawContent: string, markdownContent?: string) => {
    const toInsert = markdownContent || rawContent;
    if (editor) {
      editor.commands.insertContent("\n\n" + toInsert);
      toast.success("Added to notes!");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading note...</p>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Note not found</h2>
          <Button onClick={() => router.push("/dashboard")} className="mt-4">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 relative">
      <AiChatPanel
        onAddToNotes={handleAddToNotes}
        getContextData={() => {
          const editorAny = editor as any;
          return (
            editorAny?.storage?.markdown?.getMarkdown?.() ||
            editorAny?.getMarkdown?.() ||
            note?.content ||
            ""
          );
        }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-transparent px-0"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-4">
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold">{note.title}</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="mt-2 rounded-md border border-border bg-background">
              <EditorContent editor={editor} />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
