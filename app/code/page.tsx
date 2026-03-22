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
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

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
        onAddToNotes={(rawContent) =>
          setContent((prev) => prev + (prev.trim() ? "\n\n" : "") + rawContent)
        }
        getContextData={() => `Language: ${language}\n\nCode:\n${content}`}
      />
      <Card className="w-full max-w-5xl shadow-sm flex flex-col gap-0 border-border">
        <CardHeader className="flex flex-row items-start justify-between pb-4">
          <div className="flex flex-col gap-1.5 w-full">
            <CardTitle className="text-2xl font-semibold">
              Code Editor
            </CardTitle>
            <CardDescription className="text-sm">
              Write your code below. When you&apos;re ready, click Save.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="File name (e.g. main.js)"
            className="text-lg font-medium bg-background"
          />

          <div className="mt-2 rounded-lg overflow-hidden border border-border">
            <CodeEditor
              content={content}
              onChange={(value) => setContent(value)}
              language={language}
              onLanguageChange={(lang) => setLanguage(lang)}
              editable={true}
              height="500px"
            />
          </div>
        </CardContent>

        <CardFooter className="flex justify-end pt-4 border-t border-border">
          <Button type="button" onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save code"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
