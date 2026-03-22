"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { MonacoBinding } from "y-monaco";
import type * as monaco from "monaco-editor";
import { Play } from "lucide-react";
import { LANGUAGES, STARTER_CODE } from "@/lib/code-languages";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "./code-editor.css";

interface CollaborativeCodeEditorProps {
  roomId: string;
  username: string;
  language?: string;
  onRunCode?: (code: string, language: string) => void;
}

const getColorForName = (name: string) => {
  const colors = [
    "#ef4444",
    "#f59e0b",
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

interface CursorInfo {
  name: string;
  color: string;
  top: number;
  left: number;
}

export function CollaborativeCodeEditor({
  roomId,
  username,
  language: initialLanguage = "javascript",
  onRunCode,
}: CollaborativeCodeEditorProps) {
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const doc = new Y.Doc();
    // Use a prefixed room name to separate code docs from text docs
    const wsProvider = new WebsocketProvider(
      "ws://localhost:1234",
      `code-${roomId}`,
      doc,
    );

    wsProvider.awareness.setLocalStateField("user", {
      name: username,
      color: getColorForName(username),
    });

    wsProvider.on("status", (event: { status: string }) => {
      if (event.status === "connected") {
        setIsReady(true);
      }
    });

    setYdoc(doc);
    setProvider(wsProvider);

    return () => {
      wsProvider.destroy();
      doc.destroy();
    };
  }, [roomId, username]);

  if (!isReady || !provider || !ydoc) {
    return (
      <div className="flex items-center justify-center min-h-[500px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-yellow-500 animate-pulse" />
          Connecting to collaboration server...
        </div>
      </div>
    );
  }

  return (
    <MonacoEditorInner
      provider={provider}
      ydoc={ydoc}
      username={username}
      initialLanguage={initialLanguage}
      onRunCode={onRunCode}
    />
  );
}

interface MonacoEditorInnerProps {
  provider: WebsocketProvider;
  ydoc: Y.Doc;
  username: string;
  initialLanguage: string;
  onRunCode?: (code: string, language: string) => void;
}

function MonacoEditorInner({
  provider,
  ydoc,
  username,
  initialLanguage,
  onRunCode,
}: MonacoEditorInnerProps) {
  const [language, setLanguage] = useState(initialLanguage);
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
  const [cursors, setCursors] = useState<CursorInfo[]>([]);
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const bindingRef = useRef<MonacoBinding | null>(null);
  const rafRef = useRef<number>(0);
  const hasSetInitialContent = useRef(false);

  const handleEditorMount: OnMount = useCallback(
    (editor, monacoInstance) => {
      editorRef.current = editor;

      // Get the Y.Text type for code content
      const ytext = ydoc.getText("monaco");

      // Create Monaco binding — this syncs the editor <-> Yjs
      const binding = new MonacoBinding(
        ytext,
        editor.getModel()!,
        new Set([editor]),
        provider.awareness,
      );
      bindingRef.current = binding;

      // If the document is empty, set starter code
      if (!hasSetInitialContent.current && ytext.length === 0) {
        ytext.insert(0, STARTER_CODE[initialLanguage] || "");
        hasSetInitialContent.current = true;
      }

      // Broadcast cursor position via awareness
      editor.onDidChangeCursorPosition(() => {
        const position = editor.getPosition();
        if (position) {
          provider.awareness.setLocalStateField("cursor", {
            lineNumber: position.lineNumber,
            column: position.column,
          });
        }
      });

      editor.onDidBlurEditorText(() => {
        provider.awareness.setLocalStateField("cursor", null);
      });
    },
    [ydoc, provider, initialLanguage],
  );

  // Compute remote cursor pixel positions
  const computeCursorPositions = useCallback(() => {
    if (!editorRef.current || !containerRef.current) return;

    const states = provider.awareness.getStates();
    const localId = provider.awareness.clientID;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newCursors: CursorInfo[] = [];

    states.forEach((state: any, clientId: number) => {
      if (clientId === localId) return;
      if (!state.user || !state.cursor) return;

      try {
        const editor = editorRef.current!;
        const pos = {
          lineNumber: state.cursor.lineNumber,
          column: state.cursor.column,
        };

        const top = editor.getTopForLineNumber(pos.lineNumber);
        const scrollTop = editor.getScrollTop();
        const contentLeft = editor.getLayoutInfo().contentLeft;
        const charWidth = 7.8;
        const left = contentLeft + (pos.column - 1) * charWidth;

        newCursors.push({
          name: state.user.name || "Anonymous",
          color: state.user.color || "#999",
          top: top - scrollTop,
          left: left,
        });
      } catch {
        // Position might be invalid
      }
    });

    setCursors(newCursors);
  }, [provider]);

  // Listen for awareness changes and editor scroll
  useEffect(() => {
    if (!editorRef.current || !provider) return;

    const onAwarenessChange = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(computeCursorPositions);
    };

    provider.awareness.on("change", onAwarenessChange);

    const editor = editorRef.current;
    const scrollDisposable = editor.onDidScrollChange(() => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(computeCursorPositions);
    });

    onAwarenessChange();

    return () => {
      cancelAnimationFrame(rafRef.current);
      provider.awareness.off("change", onAwarenessChange);
      scrollDisposable.dispose();
    };
  }, [provider, computeCursorPositions]);

  // Cleanup binding on unmount
  useEffect(() => {
    return () => {
      if (bindingRef.current) {
        bindingRef.current.destroy();
      }
    };
  }, []);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        import("monaco-editor").then((monacoModule) => {
          monacoModule.editor.setModelLanguage(model, newLang);
        });
      }
    }
    provider.awareness.setLocalStateField("language", newLang);
  };

  const handleRunCode = async () => {
    if (!editorRef.current) return;
    const code = editorRef.current.getValue();

    if (onRunCode) {
      onRunCode(code, language);
      return;
    }

    setIsRunning(true);
    setOutput(null);

    try {
      const langConfig = LANGUAGES.find((l) => l.value === language);
      if (!langConfig) {
        setOutput("Unsupported language.");
        return;
      }

      const response = await fetch("http://localhost:3000/code/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          sourceCode: code,
          languageId: langConfig.judgeId,
          stdin: "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setOutput(`Error: ${data.message || "Failed to run code"}`);
        return;
      }

      const result = data.result;
      const stdout = result?.stdout || "";
      const stderr = result?.stderr || "";
      const compileOutput = result?.compile_output || "";
      const statusDesc = result?.status?.description || "";

      let outputText = "";
      if (stdout) outputText += stdout;
      if (stderr) outputText += (outputText ? "\n" : "") + `Stderr:\n${stderr}`;
      if (compileOutput)
        outputText +=
          (outputText ? "\n" : "") + `Compile Output:\n${compileOutput}`;
      if (!outputText) outputText = `Status: ${statusDesc || "No output"}`;

      setOutput(outputText);
    } catch (err: any) {
      setOutput(`Network Error: ${err.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col gap-0">
      {/* Toolbar */}
      <div
        className={`code-editor-toolbar ${theme === "light" ? "code-editor-toolbar-light" : ""}`}
      >
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <Select
            value={language}
            onValueChange={(val) => {
              if (val) handleLanguageChange(val);
            }}
          >
            <SelectTrigger
              className="w-[140px] h-8 text-xs bg-transparent border-gray-600 focus:ring-1 focus:ring-blue-500 rounded-md"
              style={{ color: theme === "vs-dark" ? "#ccc" : "#333" }}
            >
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem
                  key={lang.value}
                  value={lang.value}
                  className="text-xs"
                >
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Connection Status */}
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <span
              className="text-xs"
              style={{ color: theme === "vs-dark" ? "#888" : "#666" }}
            >
              Connected
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Active users indicator */}
          <span
            className="text-xs"
            style={{ color: theme === "vs-dark" ? "#888" : "#666" }}
          >
            {provider.awareness.getStates().size} user(s)
          </span>

          {/* Run Code Button */}
          <Button
            size="sm"
            onClick={handleRunCode}
            disabled={isRunning}
            className="h-8 gap-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium"
          >
            <Play className="w-3 h-3" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>

          {/* Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
            className="h-8 text-xs border-gray-600 bg-transparent text-foreground hover:bg-muted"
            style={{ color: theme === "vs-dark" ? "#ccc" : "#333" }}
          >
            {theme === "vs-dark" ? "Light" : "Dark"}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div
        ref={containerRef}
        className="code-editor-container"
        style={{ position: "relative" }}
      >
        <Editor
          height="500px"
          language={language}
          theme={theme}
          onMount={handleEditorMount}
          options={{
            fontSize: 14,
            fontFamily:
              "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
            fontLigatures: true,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12, bottom: 12 },
            lineNumbers: "on",
            renderLineHighlight: "all",
            bracketPairColorization: { enabled: true },
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            wordWrap: "on",
            tabSize: 2,
          }}
        />

        {/* Remote cursor overlays */}
        {cursors.map((cursor, i) => (
          <div
            key={`code-cursor-${i}`}
            className="code-remote-cursor"
            style={{
              position: "absolute",
              top: cursor.top,
              left: cursor.left,
              pointerEvents: "none",
              zIndex: 50,
            }}
          >
            <div
              className="code-remote-cursor-caret"
              style={{
                width: "2px",
                height: "18px",
                backgroundColor: cursor.color,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "-1.5em",
                left: 0,
                backgroundColor: cursor.color,
                color: "#fff",
                fontSize: "10px",
                fontWeight: 600,
                padding: "1px 5px",
                borderRadius: "3px",
                whiteSpace: "nowrap",
                lineHeight: "1.3",
                opacity: 0.9,
              }}
            >
              {cursor.name}
            </div>
          </div>
        ))}
      </div>

      {/* Output Panel */}
      {output !== null && (
        <div
          className="border-t"
          style={{
            background: theme === "vs-dark" ? "#1e1e1e" : "#f9f9f9",
            borderColor: theme === "vs-dark" ? "#333" : "#ddd",
          }}
        >
          <div
            className="flex items-center justify-between px-3 py-1.5"
            style={{
              borderBottom: `1px solid ${theme === "vs-dark" ? "#333" : "#ddd"}`,
            }}
          >
            <span
              className="text-xs font-medium"
              style={{ color: theme === "vs-dark" ? "#ccc" : "#333" }}
            >
              Output
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setOutput(null)}
              className="h-6 px-2 py-0.5 text-xs hover:bg-gray-700/30 transition-colors"
              style={{ color: theme === "vs-dark" ? "#888" : "#666" }}
            >
              ✕ Close
            </Button>
          </div>
          <pre
            className="p-3 text-xs font-mono overflow-auto max-h-[200px]"
            style={{ color: theme === "vs-dark" ? "#d4d4d4" : "#333" }}
          >
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
