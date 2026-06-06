"use client"

import { useState } from "react"
import { Plus, Users, ArrowLeft } from "lucide-react"
import axios from "axios"
import { nanoid } from "nanoid"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { BACKEND_URL } from "@/lib/api-config"

interface GroupsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type View = "selection" | "create" | "join"

export function GroupsModal({ open, onOpenChange }: GroupsModalProps) {
  const [view, setView] = useState<View>("selection")
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: ""
  })
  const [joinId, setJoinId] = useState("")
  const router = useRouter()

  const { data: session } = authClient.useSession()

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user) return

    const groupId = nanoid()

    try {
      setIsLoading(true)
      await axios.post(
        `${BACKEND_URL}/group`,
        {
          id: groupId,
          name: formData.name,
          description: formData.description,
        },
        {
          withCredentials: true,
        }
      )
      
      // Navigate to the new group first, then reset state
      // The modal will naturally close/unmount when we navigate away
      router.push(`/groups/${groupId}`)
      setView("selection")
      setFormData({ name: "", description: "" })
    } catch (error) {
      console.error("Failed to create group:", error)
      // Ideally show a toast here
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinGroup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user || !joinId.trim()) return

    try {
      setIsLoading(true)
      try {
  const response = await axios.post(
    `${BACKEND_URL}/joinGroup/${joinId}`,
    null,
    { withCredentials: true }
  );

  console.log("SUCCESS:", response.data);
} catch (err: any) {
  console.error("JOIN GROUP FAILED");

  if (err.response) {
    console.error("Status:", err.response.status);
    console.error("Data:", err.response.data);
  } else {
    console.error("Error:", err.message);
  }
}

      // Navigate to the group first, then reset state
      // The modal will naturally close/unmount when we navigate away
      router.push(`/groups/${joinId}`)
      setView("selection")
      setJoinId("")
    } catch (error) {
      console.error("Failed to join group:", error)
      // Ideally show a toast here
    } finally {
      setIsLoading(false)
    }
  }

  const resetView = (open: boolean) => {
    if (!open) {
      setView("selection")
      setFormData({ name: "", description: "" })
      setJoinId("")
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={open} onOpenChange={resetView}>
      <DialogContent className="sm:max-w-md bg-[#070A14] border border-white/[0.08] text-white shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl rounded-2xl p-6">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {view !== "selection" && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-white/5 text-[#A0A8B8] hover:text-white transition-colors" 
                onClick={() => setView("selection")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <DialogTitle className="text-xl font-bold text-white tracking-tight">
              {view === "selection" && "Groups"}
              {view === "create" && "Create New Group"}
              {view === "join" && "Join Group"}
            </DialogTitle>
          </div>
          <DialogDescription className="text-[#A0A8B8] text-sm mt-1">
            {view === "selection" && "Join an existing group or create a new one to collaborate."}
            {view === "create" && "Start a new study group and invite others."}
            {view === "join" && "Enter a group ID to join an existing study group."}
          </DialogDescription>
        </DialogHeader>

        {view === "selection" && (
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-32 space-y-2 border-white/[0.08] bg-[#0B1020]/50 hover:bg-[#3DE1A1]/10 hover:border-[#3DE1A1]/30 hover:text-white text-[#A0A8B8] transition-all duration-300 rounded-xl cursor-pointer"
              onClick={() => setView("join")}
            >
              <Users className="w-8 h-8 text-[#3DE1A1] transition-transform group-hover:scale-110" />
              <span className="font-semibold text-sm">Add Existing Group</span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-32 space-y-2 border-white/[0.08] bg-[#0B1020]/50 hover:bg-[#3DE1A1]/10 hover:border-[#3DE1A1]/30 hover:text-white text-[#A0A8B8] transition-all duration-300 rounded-xl cursor-pointer"
              onClick={() => setView("create")}
            >
              <Plus className="w-8 h-8 text-[#3DE1A1] transition-transform group-hover:scale-110" />
              <span className="font-semibold text-sm">Create New Group</span>
            </Button>
          </div>
        )}

        {view === "create" && (
          <form onSubmit={handleCreateGroup} className="space-y-5 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-white">Group Name</Label>
              <Input
                id="name"
                placeholder="e.g. Advanced Calculus"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
                className="bg-[#0B1020] border-white/[0.08] text-white placeholder:text-[#A0A8B8]/40 focus-visible:ring-1 focus-visible:ring-[#3DE1A1] focus-visible:border-[#3DE1A1] focus:border-[#3DE1A1] h-11 rounded-lg px-4 w-full transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-semibold text-white">Description</Label>
              <Input
                id="description"
                placeholder="What's this group about?"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-[#0B1020] border-white/[0.08] text-white placeholder:text-[#A0A8B8]/40 focus-visible:ring-1 focus-visible:ring-[#3DE1A1] focus-visible:border-[#3DE1A1] focus:border-[#3DE1A1] h-11 rounded-lg px-4 w-full transition-all"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button 
                type="submit" 
                disabled={isLoading}
                className="rounded-xl bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1] hover:from-[#6be6a0] hover:to-[#31c98e] text-black font-bold shadow-[0_0_15px_rgba(61,225,161,0.25)] hover:shadow-[0_0_20px_rgba(61,225,161,0.45)] transition-all px-6 h-11 cursor-pointer"
              >
                {isLoading ? "Creating..." : "Create Group"}
              </Button>
            </div>
          </form>
        )}

        {view === "join" && (
           <form onSubmit={handleJoinGroup} className="space-y-5 py-4">
             <div className="space-y-2">
               <Label htmlFor="group-id" className="text-sm font-semibold text-white">Group ID</Label>
               <Input
                 id="group-id"
                 placeholder="Enter the Group ID"
                 value={joinId}
                 onChange={(e) => setJoinId(e.target.value)}
                 required
                 className="bg-[#0B1020] border-white/[0.08] text-white placeholder:text-[#A0A8B8]/40 focus-visible:ring-1 focus-visible:ring-[#3DE1A1] focus-visible:border-[#3DE1A1] focus:border-[#3DE1A1] h-11 rounded-lg px-4 w-full transition-all"
               />
             </div>
             <div className="flex justify-end pt-2">
               <Button 
                 type="submit" 
                 disabled={isLoading || !joinId.trim()}
                 className="rounded-xl bg-gradient-to-r from-[#7CFFB2] to-[#3DE1A1] hover:from-[#6be6a0] hover:to-[#31c98e] text-black font-bold shadow-[0_0_15px_rgba(61,225,161,0.25)] hover:shadow-[0_0_20px_rgba(61,225,161,0.45)] transition-all px-6 h-11 cursor-pointer"
               >
                 {isLoading ? "Joining..." : "Join Group"}
               </Button>
             </div>
           </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
