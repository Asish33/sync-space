"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Collaboration from "@tiptap/extension-collaboration";
import { useEffect, useState, useRef } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import "./editor.css";

interface CollaborativeEditorProps {
  roomId: string;
  username: string;
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

export function CollaborativeEditor({
  roomId,
  username,
}: CollaborativeEditorProps) {
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const doc = new Y.Doc();
    const wsProvider = new WebsocketProvider(
      "ws://localhost:1234",
      roomId,
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

  return <TiptapEditor provider={provider} ydoc={ydoc} username={username} />;
}

interface TiptapEditorProps {
  provider: WebsocketProvider;
  ydoc: Y.Doc;
  username: string;
}

function TiptapEditor({ provider, ydoc, username }: TiptapEditorProps) {
  const [cursors, setCursors] = useState<CursorInfo[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // @ts-ignore - needed to disable history when using Collaboration
        history: false,
      }),
      Collaboration.configure({
        document: ydoc,
      }),
    ],
    editable: true,
    editorProps: {
      attributes: {
        class:
          "prose max-w-none focus:outline-none min-h-[500px] px-4 py-3 bg-background border border-border rounded-lg shadow-sm",
      },
    },
  });

  // Broadcast local cursor via awareness on every selection change
  useEffect(() => {
    if (!editor || !provider) return;

    const broadcastCursor = () => {
      const { from, to } = editor.state.selection;
      provider.awareness.setLocalStateField("cursor", {
        anchor: from,
        head: to,
      });
    };

    editor.on("selectionUpdate", broadcastCursor);
    editor.on("focus", broadcastCursor);
    editor.on("blur", () => {
      provider.awareness.setLocalStateField("cursor", null);
    });

    // Broadcast immediately
    broadcastCursor();

    return () => {
      editor.off("selectionUpdate", broadcastCursor);
    };
  }, [editor, provider]);

  // Compute pixel positions from awareness state
  const computeCursorPositions = () => {
    if (!editor || !containerRef.current) {
      console.log("[cursors] skipping: editor or container not ready");
      return;
    }

    const states = provider.awareness.getStates();
    const localId = provider.awareness.clientID;
    const docSize = editor.state.doc.content.size;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newCursors: CursorInfo[] = [];

    console.log(
      `[cursors] awareness states: ${states.size}, localId: ${localId}`,
    );

    states.forEach((state: any, clientId: number) => {
      if (clientId === localId) return;
      console.log(`[cursors] remote client ${clientId}:`, state);
      if (!state.user || !state.cursor) return;

      try {
        const pos = Math.min(Math.max(state.cursor.head, 0), docSize);
        const coords = editor.view.coordsAtPos(pos);

        const cursorInfo = {
          name: state.user.name || "Anonymous",
          color: state.user.color || "#999",
          top: coords.top - containerRect.top,
          left: coords.left - containerRect.left,
        };
        console.log(
          `[cursors] rendering cursor for ${cursorInfo.name} at (${cursorInfo.left}, ${cursorInfo.top})`,
        );
        newCursors.push(cursorInfo);
      } catch (e) {
        console.warn("[cursors] coordsAtPos failed:", e);
      }
    });

    console.log(`[cursors] total remote cursors: ${newCursors.length}`);
    setCursors(newCursors);
  };

  // Re-compute cursor positions on awareness changes AND editor updates
  useEffect(() => {
    if (!editor || !provider) return;

    const onAwarenessChange = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(computeCursorPositions);
    };

    const onEditorUpdate = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(computeCursorPositions);
    };

    provider.awareness.on("change", onAwarenessChange);
    editor.on("update", onEditorUpdate);
    editor.on("selectionUpdate", onEditorUpdate);

    // Initial computation
    onAwarenessChange();

    return () => {
      cancelAnimationFrame(rafRef.current);
      provider.awareness.off("change", onAwarenessChange);
      editor.off("update", onEditorUpdate);
      editor.off("selectionUpdate", onEditorUpdate);
    };
  }, [editor, provider]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between px-2">
        <span className="text-xs text-muted-foreground">
          Collaborative Editor
        </span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs text-muted-foreground">Connected</span>
        </div>
      </div>

      <div ref={containerRef} style={{ position: "relative" }}>
        <EditorContent editor={editor} />

        {/* Remote cursor overlays */}
        {cursors.map((cursor, i) => (
          <div
            key={`cursor-${i}`}
            className="remote-cursor"
            style={{
              position: "absolute",
              top: cursor.top,
              left: cursor.left,
              pointerEvents: "none",
              zIndex: 50,
            }}
          >
            {/* Animated caret line */}
            <div
              className="remote-cursor-caret"
              style={{
                width: "2px",
                height: "1.2em",
                backgroundColor: cursor.color,
                animation: "cursor-blink 1s step-end infinite",
              }}
            />
            {/* Name label */}
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
    </div>
  );
}
