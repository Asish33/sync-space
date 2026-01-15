"use client";

import { useEffect, useRef } from "react";
import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Schema } from "prosemirror-model";
import { schema as basicSchema } from "prosemirror-schema-basic";
import { history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const editorSchema = new Schema({
  nodes: basicSchema.spec.nodes,
  marks: basicSchema.spec.marks,
});

export default function NotesPage() {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      schema: editorSchema,
      plugins: [history(), keymap(baseKeymap)],
    });

    const view = new EditorView(editorRef.current, {
      state,
      attributes: {
        class:
          "ProseMirror min-h-[300px] px-3 py-2 focus:outline-none prose max-w-none",
      },
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  const handleSave = async () => {
    const notesId = uuidv4();
    const view = viewRef.current;
    if (!view) return;

    const docJSON = view.state.doc.toJSON();
    await axios
      .post(
        `http://localhost:3000/notes/${notesId}`,
        {
          title: "Notes",
          content: docJSON,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("Notes saved");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="min-h-screen bg-gray-50 flex justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow-sm p-6 flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Notes</h1>
          <p className="mt-1 text-sm text-gray-500">
            Write and edit your notes below. When you&apos;re ready, click Save.
          </p>
        </div>

        <div className="mt-2 rounded-md border border-gray-200 bg-white">
          <div ref={editorRef} />
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
