"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

interface ChatMessage {
  role: "user" | "ai";
  content: string;
}

interface AiChatPanelProps {
  onAddToNotes: (content: string, markdownContent?: string) => void;
  getContextData?: () => string;
}

export default function AiChatPanel({
  onAddToNotes,
  getContextData,
}: AiChatPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsLoading(true);

    try {
      const contextData = getContextData ? getContextData() : undefined;

      const enrichedPrompt = `You are a helpful AI assistant integrated into a notes and code editor. Your specific purpose is to act as an expert assistant for the user's notes and code. 
You must primarily respond to the user's question based on the provided context. If the user asks a question that is entirely unrelated to coding, note-taking, or the current context, politely decline and remind them of your role. If no context is provided, you can answer general coding or note-taking questions.

Current Context (Notes/Code):
${contextData || "No context currently available."}

User Question: ${trimmed}`;

      const res = await axios.post(
        "http://localhost:3000/generate",
        { prompt: enrichedPrompt, context: contextData },
        { withCredentials: true },
      );
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: res.data.response },
      ]);
    } catch (err) {
      console.error("Error generating response:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed right-8 bottom-8 z-50 rounded-full bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1] text-black hover:from-[#6be6a0] hover:to-[#31c98e] shadow-[0_0_20px_rgba(61,225,161,0.3)] hover:shadow-[0_0_30px_rgba(61,225,161,0.5)] transition-all duration-300 font-bold px-6 h-14"
          size="lg"
        >
          <svg
            className="w-5 h-5 mr-2 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          Ask AI
        </Button>
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full z-[60] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "420px" }}
      >
        <div className="h-full bg-[#070A14] border-l border-white/[0.08] shadow-2xl flex flex-col backdrop-blur-3xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#7CFFB2] to-[#3DE1A1] flex items-center justify-center shadow-[0_0_10px_rgba(61,225,161,0.2)]">
                <svg
                  className="w-4 h-4 text-[#05070D]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Sync Space AI
              </h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-[#A0A8B8] hover:text-white hover:bg-white/10 rounded-full"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 bg-gradient-to-b from-transparent to-[#05070D]/50 custom-scrollbar">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center text-[#A0A8B8] gap-4 py-12">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                  <svg
                    className="w-8 h-8 text-[#3DE1A1]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <p className="text-base font-semibold text-white">
                  Ask AI about this note
                </p>
                <p className="text-sm max-w-[250px]">
                  Generate content, summarize text, or ask for coding help.
                  Responses can be seamlessly added to your editor.
                </p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`px-5 py-3.5 rounded-2xl text-[15px] leading-relaxed whitespace-pre-wrap shadow-sm ${
                      msg.role === "user"
                        ? "bg-[#3DE1A1]/10 text-[#3DE1A1] border border-[#3DE1A1]/20 rounded-br-sm"
                        : "bg-white/[0.04] text-white border border-white/[0.08] rounded-bl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {msg.role === "ai" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const codeRegex =
                          /```([a-zA-Z0-9-]*)\r?\n([\s\S]*?)```/g;
                        const extractedRaw: string[] = [];
                        const extractedMarkdown: string[] = [];
                        let match;
                        while ((match = codeRegex.exec(msg.content)) !== null) {
                          extractedRaw.push(match[2].trim());
                          extractedMarkdown.push(match[0].trim());
                        }
                        const finalRawContent =
                          extractedRaw.length > 0
                            ? extractedRaw.join("\n\n")
                            : msg.content;
                        const finalMarkdownContent =
                          extractedMarkdown.length > 0
                            ? extractedMarkdown.join("\n\n")
                            : msg.content;
                        onAddToNotes(finalRawContent, finalMarkdownContent);
                      }}
                      className="mt-2 text-[#4F8CFF] hover:text-[#8CB8FF] hover:bg-[#4F8CFF]/10 h-8 text-xs font-semibold px-3 rounded-lg flex items-center gap-1.5"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Merge to Note
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl rounded-bl-sm px-5 py-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 bg-[#3DE1A1] rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-[#3DE1A1] rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 bg-[#3DE1A1] rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/[0.08] px-5 py-4 bg-[#070A14]">
            <div className="flex items-center gap-3 relative">
              <Input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message Sync Space AI..."
                disabled={isLoading}
                className="flex-1 bg-white/[0.03] border-white/[0.08] text-white placeholder:text-[#A0A8B8] h-12 rounded-xl focus-visible:ring-1 focus-visible:ring-[#3DE1A1] px-4 pr-12"
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="absolute right-1.5 top-1.5 bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1] text-black rounded-lg shadow-sm hover:shadow-[0_0_15px_rgba(61,225,161,0.3)] h-9 w-9 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <svg
                  className="w-4 h-4 ml-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </Button>
            </div>
            <p className="text-[10px] text-center text-[#A0A8B8]/60 mt-3 font-medium">
              AI can make mistakes. Verify code suggestions.
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#05070D]/60 z-[55] backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </>
  );
}
