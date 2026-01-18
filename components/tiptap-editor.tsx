"use client"

import type React from "react"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import Highlight from "@tiptap/extension-highlight"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Code,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Highlighter,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TiptapEditorProps {
  content: string
  onChange?: (content: string) => void
  editable?: boolean
}

export function TiptapEditor({ content, onChange, editable = true }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
    editable,
  })

  if (!editor) {
    return null
  }

  const toggleBold = () => editor.chain().focus().toggleBold().run()
  const toggleItalic = () => editor.chain().focus().toggleItalic().run()
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run()
  const toggleCode = () => editor.chain().focus().toggleCode().run()
  const toggleHeading1 = () => editor.chain().focus().toggleHeading({ level: 1 }).run()
  const toggleHeading2 = () => editor.chain().focus().toggleHeading({ level: 2 }).run()
  const toggleBulletList = () => editor.chain().focus().toggleBulletList().run()
  const toggleOrderedList = () => editor.chain().focus().toggleOrderedList().run()
  const toggleBlockquote = () => editor.chain().focus().toggleBlockquote().run()
  const toggleHighlight = () => editor.chain().focus().toggleHighlight().run()

  return (
    <div className="flex flex-col gap-4">
      {editable && (
        <div className="flex flex-wrap gap-2 p-3 bg-sidebar border border-border rounded-lg">
          <ToolbarButton onClick={toggleBold} isActive={editor.isActive("bold")} icon={Bold} title="Bold" />
          <ToolbarButton onClick={toggleItalic} isActive={editor.isActive("italic")} icon={Italic} title="Italic" />
          <ToolbarButton
            onClick={toggleUnderline}
            isActive={editor.isActive("underline")}
            icon={UnderlineIcon}
            title="Underline"
          />
          <ToolbarButton onClick={toggleCode} isActive={editor.isActive("code")} icon={Code} title="Code" />

          <div className="w-px bg-border" />

          <ToolbarButton
            onClick={toggleHeading1}
            isActive={editor.isActive("heading", { level: 1 })}
            icon={Heading1}
            title="Heading 1"
          />
          <ToolbarButton
            onClick={toggleHeading2}
            isActive={editor.isActive("heading", { level: 2 })}
            icon={Heading2}
            title="Heading 2"
          />

          <div className="w-px bg-border" />

          <ToolbarButton
            onClick={toggleBulletList}
            isActive={editor.isActive("bulletList")}
            icon={List}
            title="Bullet List"
          />
          <ToolbarButton
            onClick={toggleOrderedList}
            isActive={editor.isActive("orderedList")}
            icon={ListOrdered}
            title="Ordered List"
          />
          <ToolbarButton
            onClick={toggleBlockquote}
            isActive={editor.isActive("blockquote")}
            icon={Quote}
            title="Blockquote"
          />
          <ToolbarButton
            onClick={toggleHighlight}
            isActive={editor.isActive("highlight")}
            icon={Highlighter}
            title="Highlight"
          />
        </div>
      )}

      <EditorContent
        editor={editor}
        className="prose prose-sm dark:prose-invert max-w-none min-h-96 p-6 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
    </div>
  )
}

interface ToolbarButtonProps {
  onClick: () => void
  isActive: boolean
  icon: React.ComponentType<{ className?: string }>
  title: string
}

function ToolbarButton({ onClick, isActive, icon: Icon, title }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "p-2 rounded-md transition-all duration-200 hover:bg-background",
        isActive && "bg-primary text-primary-foreground",
      )}
      title={title}
      type="button"
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}
