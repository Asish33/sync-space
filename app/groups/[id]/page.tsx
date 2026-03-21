"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { GroupChat } from "@/components/group-chat";
import { CollaborativeEditor } from "@/components/collaborative-editor";
import { CollaborativeCodeEditor } from "@/components/collaborative-code-editor";

export default function GroupPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: groupId } = use(params);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [editorMode, setEditorMode] = useState<"notes" | "code">("notes");

  useEffect(() => {
    // Only connect if we have a session (though middleware should handle protection)
    // The prompt says "After navigation to group page... Create Socket.IO client"

    const socketInstance = io("http://localhost:3000", {
      withCredentials: true,
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setIsConnected(true);
      // Emit joinRoom immediately after connection
      socketInstance.emit("joinRoom", groupId);
    });

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
    });

    socketInstance.on("join-error", (message: string) => {
      console.error("Join error:", message);
      toast.error("Authorization failed: " + message);
      socketInstance.disconnect();
      router.push("/dashboard");
    });

    socketInstance.on("userJoined", (data: any) => {
      console.log("User joined:", data);
      toast.success("A user joined the group!");
    });

    // noteUpdated and textCursorUpdate are handled by CollaborativeEditor component

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [groupId, router]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Group</h1>
          <p className="text-muted-foreground">ID: {groupId}</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Editor Mode Toggle */}
          <div className="flex items-center bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setEditorMode("notes")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                editorMode === "notes"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              📝 Notes Editor
            </button>
            <button
              onClick={() => setEditorMode("code")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
                editorMode === "code"
                  ? "bg-white text-black shadow-sm"
                  : "text-gray-500 hover:text-black"
              }`}
            >
            Code Editor
            </button>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`h-3 w-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
            />
            <span className="text-sm text-muted-foreground">
              {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>

      {/* Main content with chat on right */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Content - Left side */}
        <div className="lg:col-span-2">
          <div className="border rounded-lg bg-white p-4 min-h-[500px]">
            {session?.user ? (
              editorMode === "notes" ? (
                <CollaborativeEditor
                  roomId={groupId}
                  username={session.user.name || "Anonymous"}
                />
              ) : (
                <CollaborativeCodeEditor
                  roomId={groupId}
                  username={session.user.name || "Anonymous"}
                />
              )
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Loading...
              </div>
            )}
          </div>
        </div>

        {/* Chat - Right side */}
        <div className="lg:col-span-1">
          <GroupChat
            socket={socket}
            groupId={groupId}
            currentUserId={session?.user?.id}
          />
        </div>
      </div>
    </div>
  );
}
