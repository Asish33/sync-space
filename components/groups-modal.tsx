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
        "http://localhost:3000/group",
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
    `http://localhost:3000/joinGroup/${joinId}`,
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {view !== "selection" && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => setView("selection")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            )}
            <DialogTitle>
              {view === "selection" && "Groups"}
              {view === "create" && "Create New Group"}
              {view === "join" && "Join Group"}
            </DialogTitle>
          </div>
          <DialogDescription>
            {view === "selection" && "Join an existing group or create a new one to collaborate."}
            {view === "create" && "Start a new study group and invite others."}
            {view === "join" && "Enter a group ID to join an existing study group."}
          </DialogDescription>
        </DialogHeader>

        {view === "selection" && (
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-32 space-y-2 hover:border-primary hover:bg-primary/5"
              onClick={() => setView("join")}
            >
              <Users className="w-8 h-8 text-primary" />
              <span>Add Existing Group</span>
            </Button>

            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-32 space-y-2 hover:border-primary hover:bg-primary/5"
              onClick={() => setView("create")}
            >
              <Plus className="w-8 h-8 text-primary" />
              <span>Create New Group</span>
            </Button>
          </div>
        )}

        {view === "create" && (
          <form onSubmit={handleCreateGroup} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Group Name</Label>
              <Input
                id="name"
                placeholder="e.g. Advanced Calculus"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="What's this group about?"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Group"}
              </Button>
            </div>
          </form>
        )}

        {view === "join" && (
           <form onSubmit={handleJoinGroup} className="space-y-4 py-4">
             <div className="space-y-2">
               <Label htmlFor="group-id">Group ID</Label>
               <Input
                 id="group-id"
                 placeholder="Enter the Group ID"
                 value={joinId}
                 onChange={(e) => setJoinId(e.target.value)}
                 required
               />
             </div>
             <div className="flex justify-end pt-4">
               <Button type="submit" disabled={isLoading || !joinId.trim()}>
                 {isLoading ? "Joining..." : "Join Group"}
               </Button>
             </div>
           </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
