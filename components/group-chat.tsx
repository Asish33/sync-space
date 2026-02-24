"use client"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { Socket } from "socket.io-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  text: string
  userId: string
  timestamp: string
}

interface GroupChatProps {
  socket: Socket | null
  groupId: string
  currentUserId?: string
}

export function GroupChat({ socket, groupId, currentUserId }: GroupChatProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [messageText, setMessageText] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (!socket) return

    const handleNewMessage = (data: Message) => {
      setMessages((prev) => [...prev, data])
    }

    socket.on("new-message", handleNewMessage)

    return () => {
      socket.off("new-message", handleNewMessage)
    }
  }, [socket])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!socket || !messageText.trim()) return

    const newMessage: Message = {
      text: messageText,
      userId: currentUserId || "anonymous",
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, newMessage])

    socket.emit("send-message", {
      roomId: groupId,
      text: messageText,
      userId: currentUserId,
    })

    setMessageText("")
  }

  return (
    <div className="flex flex-col h-[500px] border rounded-lg bg-card">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-semibold">Group Chat</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, index) => {
            const isOwn = msg.userId === currentUserId
            return (
              <div
                key={index}
                className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-3 py-2 ${
                    isOwn
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {!isOwn && (
                    <p className="text-xs font-medium opacity-70 mb-1">
                      {msg.userId.slice(0, 8)}...
                    </p>
                  )}
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-50 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            )
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
        <Input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" size="icon" disabled={!messageText.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
