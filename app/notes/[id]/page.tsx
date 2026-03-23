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
import { ChevronLeft, Loader2 } from "lucide-react";
import { DashboardShell } from "@/components/dashboard-shell";

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

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  if (loading) {
    return (
      <DashboardShell>
        <div className="w-full min-h-[calc(100vh-4rem)] bg-[#05070D] flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-10 w-10 animate-spin text-[#3DE1A1] mx-auto" />
            <p className="mt-4 text-[#A0A8B8] font-medium tracking-wide">
              Loading note...
            </p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  if (!note) {
    return (
      <DashboardShell>
        <div className="w-full min-h-[calc(100vh-4rem)] bg-[#05070D] flex items-center justify-center">
          <div className="text-center bg-[#070A14] p-12 rounded-3xl border border-white/[0.08] max-w-md mx-auto shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-2">
              Note not found
            </h2>
            <p className="text-[#A0A8B8] mb-8">
              This note may have been deleted or doesn't exist.
            </p>
            <Button
              onClick={() => router.push("/dashboard")}
              className="rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/10 w-full"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="w-full min-h-[calc(100vh-4rem)] bg-[#05070D] text-white selection:bg-[#3DE1A1]/30 relative overflow-x-hidden px-4 py-8">
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
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/dashboard")}
              className="flex items-center gap-2 text-[#A0A8B8] hover:text-white hover:bg-white/5 transition-colors px-3 h-10 rounded-xl -ml-3 w-fit"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Dashboard
            </Button>

            <div className="flex items-center gap-4">
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="rounded-md bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1] hover:from-[#6be6a0] hover:to-[#31c98e] text-black font-semibold shadow-[0_0_15px_rgba(61,225,161,0.2)] hover:shadow-[0_0_20px_rgba(61,225,161,0.4)] transition-all px-4 h-10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin text-black" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>

          <Card className="border border-white/[0.08] bg-[#070A14] shadow-2xl rounded-xl overflow-hidden h-fit">
            <CardHeader className="pb-4 pt-6 px-6 border-b border-white/[0.08] bg-white/[0.02]">
              <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
                {note.title || "Untitled Note"}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <div className="rounded-md border border-white/[0.08] bg-[#070A14] min-h-[300px]">
                <div className="prose prose-invert max-w-none p-4">
                  <EditorContent
                    editor={editor}
                    className="min-h-[300px] outline-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}
