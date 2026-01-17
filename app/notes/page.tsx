"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/user";
import axios from "axios";
import { nanoid } from "nanoid";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Typography from "@tiptap/extension-typography";
import Heading from "@tiptap/extension-heading";
import { Markdown } from "@tiptap/markdown";
import "./editor.css";

export default function NotesPage() {
  const router = useRouter();
  const { session, isPending } = User();
  const [content, setContent] = useState<string>(""); 
  const [viewType, setViewType] = useState<"markdown" | "tiptap">("markdown");

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
      }),
      Heading.configure({
        levels: [1, 2, 3, 4, 5, 6],
      }),
      Markdown,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
      Image,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Typography,
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[300px] px-3 py-2 text-black",
      },
    },
    onUpdate: ({ editor }) => {

       if (viewType === 'tiptap') {
         setContent((editor as any).getMarkdown());
       }
    },
  });


  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in");
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
          title: "Notes",
          content: content, 
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("Notes saved");
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
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
    <main className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col gap-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Notes</h1>
            <p className="mt-1 text-sm text-gray-500">
              Write and edit your notes below. When you&apos;re ready, click Save.
            </p>
          </div>
          
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-md">
            <button
              onClick={() => handleSwitch("markdown")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewType === "markdown" 
                  ? "bg-white text-black shadow-sm" 
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Markdown
            </button>
            <button
              onClick={() => handleSwitch("tiptap")}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                viewType === "tiptap" 
                  ? "bg-white text-black shadow-sm" 
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        <div className="mt-2 rounded-md border border-gray-200 bg-white min-h-[300px]">
          {viewType === "tiptap" ? (
             <EditorContent editor={editor} className="min-h-[300px]" />
          ) : (
            <div className="flex flex-col h-full">
              <textarea
                value={content}
                onChange={handleTextareaChange}
                className="w-full min-h-[300px] p-4 border-none rounded-md font-mono text-sm focus:outline-none focus:ring-0 text-black resize-none flex-grow"
                placeholder="Type your markdown here..."
              />
              <div className="border-t border-gray-100 p-2 bg-gray-50 rounded-b-md flex justify-end">
                <button
                  onClick={() => handleSwitch("tiptap")}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
                >
                   Render Markdown &uarr;
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-60"
          >
            Save notes
          </button>
        </div>
      </div>
    </main>
  );
}
