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
          <button
            onClick={() => router.push("/dashboard")}
            className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
          >
            Back to Dashboard
          </button>
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
          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Dashboard
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {note.title}
          </h1>

          <div className="mt-2 rounded-md border border-gray-200 bg-white">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </main>
  );
}
