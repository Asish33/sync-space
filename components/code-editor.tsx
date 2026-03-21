"use client";

import { useState, useRef, useCallback } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import type * as monaco from "monaco-editor";
import { Play } from "lucide-react";
import { LANGUAGES, STARTER_CODE } from "@/lib/code-languages";
import "./code-editor.css";

interface CodeEditorProps {
  content?: string;
  onChange?: (value: string) => void;
  language?: string;
  editable?: boolean;
  height?: string;
  onRunCode?: (code: string, language: string) => void;
  onMount?: (editor: monaco.editor.IStandaloneCodeEditor) => void;
  onLanguageChange?: (language: string) => void;
}

export function CodeEditor({
  content,
  onChange,
  language: initialLanguage = "javascript",
  editable = true,
  height = "500px",
  onRunCode,
  onMount: onMountProp,
  onLanguageChange,
}: CodeEditorProps) {
  const [language, setLanguage] = useState(initialLanguage);
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");
  const [output, setOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  // Use provided content or starter code
  const editorContent =
    content !== undefined ? content : STARTER_CODE[initialLanguage] || "";

  const handleEditorMount: OnMount = useCallback(
    (editor) => {
      editorRef.current = editor;
      onMountProp?.(editor);
    },
    [onMountProp],
  );

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    onLanguageChange?.(newLang);

    // If editor is empty or contains starter code for previous language, swap to new starter
    if (editorRef.current) {
      const model = editorRef.current.getModel();
      if (model) {
        import("monaco-editor").then((monacoModule) => {
          monacoModule.editor.setModelLanguage(model, newLang);
        });

        const currentValue = editorRef.current.getValue();
        const prevStarter = STARTER_CODE[language] || "";
        if (!currentValue.trim() || currentValue === prevStarter) {
          const newStarter = STARTER_CODE[newLang] || "";
          editorRef.current.setValue(newStarter);
          onChange?.(newStarter);
        }
      }
    }
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
    <div className="flex flex-col gap-0 rounded-lg overflow-hidden border border-gray-700">
      {/* Toolbar */}
      <div
        className={`code-editor-toolbar ${theme === "light" ? "code-editor-toolbar-light" : ""}`}
      >
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="language-select bg-transparent border border-gray-600 text-xs rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
            style={{ color: theme === "vs-dark" ? "#ccc" : "#333" }}
          >
            {LANGUAGES.map((lang) => (
              <option
                key={lang.value}
                value={lang.value}
                style={{ background: "#1e1e1e", color: "#ccc" }}
              >
                {lang.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          {/* Run Code Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded-md transition-colors disabled:opacity-50"
          >
            <Play className="w-3 h-3" />
            {isRunning ? "Running..." : "Run Code"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
            className="px-2 py-1 border rounded-md text-xs transition-colors"
            style={{
              borderColor: theme === "vs-dark" ? "#555" : "#ccc",
              color: theme === "vs-dark" ? "#ccc" : "#333",
              background: "transparent",
            }}
          >
            {theme === "vs-dark" ? "Light" : "Dark"}
          </button>
        </div>
      </div>

      {/* Editor */}
      <Editor
        height={height}
        language={language}
        theme={theme}
        value={editorContent}
        onChange={(value) => onChange?.(value || "")}
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
          readOnly: !editable,
          tabSize: 2,
        }}
      />

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
            <button
              onClick={() => setOutput(null)}
              className="text-xs px-2 py-0.5 rounded hover:bg-gray-700/30 transition-colors"
              style={{ color: theme === "vs-dark" ? "#888" : "#666" }}
            >
              ✕ Close
            </button>
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
