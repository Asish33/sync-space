"use client";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Typography from "@tiptap/extension-typography";
import Heading from "@tiptap/extension-heading";
import { Markdown } from "@tiptap/markdown";

interface UseNoteEditorProps {
  content?: string;
  editable?: boolean;
  onUpdate?: (content: string) => void;
}

export const useNoteEditor = ({ content, editable = true, onUpdate }: UseNoteEditorProps) => {
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
    content,
    editable,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none min-h-[300px] px-3 py-2 text-black",
      },
    },
    onUpdate: ({ editor }) => {
      if (onUpdate) {
        // @ts-ignore
        const getMarkdown = editor.storage?.markdown?.getMarkdown;
        // @ts-ignore
        const editorGetMarkdown = editor.getMarkdown;
        
        const output = getMarkdown ? getMarkdown() : (editorGetMarkdown ? editorGetMarkdown() : "");
        onUpdate(output);
      }
    },
  });

  return editor;
};
