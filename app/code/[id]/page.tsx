"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { User } from "@/lib/user";
import axios from "axios";
import { toast } from "sonner";
import { CodeEditor } from "@/components/code-editor";
import AiChatPanel from "@/components/ai-chat-panel";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

export default function CodeFilePage() {
  const params = useParams();
  const router = useRouter();
  const codeId = params.id as string;
  const { session, isPending } = User();

  const [codeFile, setCodeFile] = useState<any>(null);
  const [content, setContent] = useState<string>("");
  const [language, setLanguage] = useState<string>("javascript");
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Auth check
  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Fetch code file
  useEffect(() => {
    const fetchCode = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/code/${codeId}`,
          { withCredentials: true },
        );
        console.log("Fetched code:", response.data);
        // Backend GET /code/:id returns { notes: {...} }
        const fetched =
          response.data.notes ?? response.data.code ?? response.data;
        setCodeFile(fetched);
        setContent(fetched?.content?.code ?? "");
        setLanguage(
          fetched?.content?.language ?? fetched?.language ?? "javascript",
        );
      } catch (error) {
        console.error("Error fetching code:", error);
      } finally {
        setLoading(false);
      }
    };

    if (codeId) fetchCode();
  }, [codeId]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await axios.put(
        `http://localhost:3000/updateCode/${codeId}`,
        {
          content: { code: content, language },
          title: codeFile?.title,
          language,
        },
        { withCredentials: true },
      );
      toast.success("Code saved!");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save code");
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

  if (!session) return null;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading code...</p>
        </div>
      </div>
    );
  }

  if (!codeFile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Code file not found
          </h2>
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
        onAddToNotes={(rawContent) =>
          setContent((prev) => prev + (prev.trim() ? "\n\n" : "") + rawContent)
        }
        getContextData={() => `Language: ${language}\n\nCode:\n${content}`}
      />
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:bg-transparent px-0"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </Button>

          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>

        <Card className="border-border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-3xl font-bold">
              {codeFile.title}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="rounded-lg overflow-hidden border border-border">
              <CodeEditor
                key={codeFile.id}
                content={content}
                language={language}
                onChange={(value) => setContent(value)}
                onLanguageChange={(lang) => setLanguage(lang)}
                editable={true}
                height="500px"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
