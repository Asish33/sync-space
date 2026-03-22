"use client";

import { useEffect, useState, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import axios from "axios";
import {
  Room,
  RoomEvent,
  Track,
  RemoteParticipant,
  LocalParticipant,
} from "livekit-client";
import { authClient } from "@/lib/auth-client";
import { GroupChat } from "@/components/group-chat";
import { CollaborativeEditor } from "@/components/collaborative-editor";
import { CollaborativeCodeEditor } from "@/components/collaborative-code-editor";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  PhoneCall,
} from "lucide-react";

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

  const [isInCall, setIsInCall] = useState(false);
  const [isJoiningCall, setIsJoiningCall] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const roomRef = useRef<Room | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [remoteParticipants, setRemoteParticipants] = useState<
    RemoteParticipant[]
  >([]);
  const remoteVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());

  useEffect(() => {
    const socketInstance = io("http://localhost:3000", {
      withCredentials: true,
    });

    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setIsConnected(true);
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

    setSocket(socketInstance);

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, [groupId, router]);

  useEffect(() => {
    if (isInCall && isCameraOn && localVideoRef.current && roomRef.current) {
      const pub = roomRef.current.localParticipant.getTrackPublication(
        Track.Source.Camera,
      );
      if (pub?.track) {
        pub.track.attach(localVideoRef.current);
      }
    }
  }, [isInCall, isCameraOn]);

  useEffect(() => {
    if (!roomRef.current) return;

    const handleTrackSubscribed = (
      track: Track,
      _pub: any,
      participant: RemoteParticipant,
    ) => {
      if (track.kind === Track.Kind.Video) {
        const videoEl = remoteVideoRefs.current.get(participant.identity);
        if (videoEl) track.attach(videoEl);
      }
    };

    roomRef.current.on(RoomEvent.TrackSubscribed, handleTrackSubscribed);

    return () => {
      roomRef.current?.off(RoomEvent.TrackSubscribed, handleTrackSubscribed);
    };
  }, [isInCall]);
  async function joinVideoCall() {
    if (isJoiningCall || isInCall) return;
    setIsJoiningCall(true);

    try {
      const res = await axios.get(
        `http://localhost:3000/livekit/token?roomId=${groupId}`,
        { withCredentials: true },
      );
      const { token } = res.data;

      const livekitUrl =
        process.env.NEXT_PUBLIC_LIVEKIT_URL || "wss://your-livekit-server-url";

      const room = new Room();
      roomRef.current = room;

      room.on(
        RoomEvent.ParticipantConnected,
        (participant: RemoteParticipant) => {
          setRemoteParticipants((prev) => [...prev, participant]);
          toast.success(`${participant.identity} joined the call`);
        },
      );

      room.on(
        RoomEvent.ParticipantDisconnected,
        (participant: RemoteParticipant) => {
          setRemoteParticipants((prev) =>
            prev.filter((p) => p.identity !== participant.identity),
          );
          remoteVideoRefs.current.delete(participant.identity);
          toast.info(`${participant.identity} left the call`);
        },
      );

      room.on(RoomEvent.TrackSubscribed, (track, _pub, participant) => {
        if (track.kind === Track.Kind.Video) {
          const videoEl = remoteVideoRefs.current.get(participant.identity);
          if (videoEl) track.attach(videoEl);
        }
      });

      room.on(RoomEvent.Disconnected, () => {
        setIsInCall(false);
        setRemoteParticipants([]);
        roomRef.current = null;
      });

      await room.connect(livekitUrl, token);

      await room.localParticipant.enableCameraAndMicrophone();

      const existingParticipants = Array.from(room.remoteParticipants.values());
      setRemoteParticipants(existingParticipants);

      setIsInCall(true);
      toast.success("Joined the video call!");
    } catch (error: any) {
      console.error("Failed to join video call:", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to join video call",
      );
    } finally {
      setIsJoiningCall(false);
    }
  }

  async function leaveVideoCall() {
    if (roomRef.current) {
      await roomRef.current.disconnect();
      roomRef.current = null;
    }
    setIsInCall(false);
    setRemoteParticipants([]);
    toast.info("Left the video call");
  }

  async function toggleCamera() {
    if (!roomRef.current) return;
    const enabled = !isCameraOn;
    await roomRef.current.localParticipant.setCameraEnabled(enabled);
    setIsCameraOn(enabled);
  }

  async function toggleMic() {
    if (!roomRef.current) return;
    const enabled = !isMicOn;
    await roomRef.current.localParticipant.setMicrophoneEnabled(enabled);
    setIsMicOn(enabled);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Study Group</h1>
          <p className="text-muted-foreground">ID: {groupId}</p>
        </div>
        <div className="flex items-center gap-4">
          <Tabs
            value={editorMode}
            onValueChange={(v) => setEditorMode(v as "notes" | "code")}
            className="w-[240px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="code">Code</TabsTrigger>
            </TabsList>
          </Tabs>

          {isInCall ? (
            <Button
              variant="destructive"
              onClick={leaveVideoCall}
              className="flex items-center gap-2"
            >
              <PhoneOff className="h-4 w-4" />
              Leave Call
            </Button>
          ) : (
            <Button
              onClick={joinVideoCall}
              disabled={isJoiningCall}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              <PhoneCall className="h-4 w-4" />
              {isJoiningCall ? "Joining..." : "Join Video Call"}
            </Button>
          )}

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

      {isInCall && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Video className="h-5 w-5 text-emerald-500" />
              Video Call
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleCamera}
                title={isCameraOn ? "Turn off camera" : "Turn on camera"}
              >
                {isCameraOn ? (
                  <Video className="h-4 w-4" />
                ) : (
                  <VideoOff className="h-4 w-4 text-red-500" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleMic}
                title={isMicOn ? "Mute" : "Unmute"}
              >
                {isMicOn ? (
                  <Mic className="h-4 w-4" />
                ) : (
                  <MicOff className="h-4 w-4 text-red-500" />
                )}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <video
                ref={(el) => {
                  localVideoRef.current = el;
                  if (el && roomRef.current) {
                    const pub =
                      roomRef.current.localParticipant.getTrackPublication(
                        Track.Source.Camera,
                      );
                    if (pub?.track) pub.track.attach(el);
                  }
                }}
                autoPlay
                muted
                playsInline
                className="w-48 h-36 rounded-lg bg-muted object-cover border shadow-sm"
              />
              <span className="absolute bottom-2 left-2 text-xs bg-black/70 text-white rounded px-2 py-1 z-10">
                You
              </span>
            </div>

            {remoteParticipants.map((participant) => (
              <div key={participant.identity} className="relative">
                <video
                  autoPlay
                  playsInline
                  className="w-48 h-36 rounded-lg bg-muted object-cover border shadow-sm"
                  ref={(el) => {
                    if (el) {
                      remoteVideoRefs.current.set(participant.identity, el);
                      participant.videoTrackPublications.forEach((pub) => {
                        if (pub.track) pub.track.attach(el);
                      });
                    } else {
                      remoteVideoRefs.current.delete(participant.identity);
                    }
                  }}
                />
                <span className="absolute bottom-2 left-2 text-xs bg-black/70 text-white rounded px-2 py-1 z-10">
                  {participant.identity}
                </span>
              </div>
            ))}

            {remoteParticipants.length === 0 && (
              <div className="flex items-center justify-center w-48 h-36 rounded-lg bg-muted border text-sm text-muted-foreground">
                Waiting for others…
              </div>
            )}
          </div>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="p-4 min-h-[500px] shadow-sm flex flex-col">
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
          </Card>
        </div>

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
