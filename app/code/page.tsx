"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/lib/user";
import axios from "axios";
import { nanoid } from "nanoid";
import { CodeEditor } from "@/components/code-editor";
import AiChatPanel from "@/components/ai-chat-panel";

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
        onAddToNotes={(newContent) =>
          setContent((prev) => prev + "\n/*\n" + newContent + "\n*/")
        }
        getContextData={() => `Language: ${language}\n\nCode:\n${content}`}
      />
      <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col gap-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="File name (e.g. main.js)"
            className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>

        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Code Editor
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Write your code below. When you&apos;re ready, click Save.
            </p>
          </div>
        </div>

        <div className="mt-2">
          <CodeEditor
            content={content}
            onChange={(value) => setContent(value)}
            language={language}
            onLanguageChange={(lang) => setLanguage(lang)}
            editable={true}
            height="500px"
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save code"}
          </button>
        </div>
      </div>
    </main>
  );
}
