"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User } from "@/lib/user";
import { useSignOut } from "@/lib/sign-out";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { format, subDays, isSameDay, parseISO } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Code, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { session, isPending } = User();
  const signOut = useSignOut();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [codes, setCodes] = useState<any[]>([]);
  const [loadingCodes, setLoadingCodes] = useState(true);

  // Load more pagination state
  const [visibleNotes, setVisibleNotes] = useState(6);
  const [visibleCodes, setVisibleCodes] = useState(6);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNoteClick = (noteId: string) => {
    router.push(`/notes/${noteId}`);
  };

  const handleCodeClick = (codeId: string) => {
    router.push(`/code/${codeId}`);
  };

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/userNotes", {
          withCredentials: true,
        });
        setNotes(response.data.notes || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCodes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/userCode", {
          withCredentials: true,
        });
        setCodes(response.data.codes || []);
      } catch (error) {
        console.error("Error fetching codes:", error);
      } finally {
        setLoadingCodes(false);
      }
    };

    if (session) {
      fetchNotes();
      fetchCodes();
    }
  }, [session]);

  if (!isMounted || isPending) {
    return (
      <div className="min-h-screen w-full bg-[#05070D] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#3DE1A1]" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(new Date(), 6 - i);
    const dayName = format(date, "EEE");

    const notesCount = notes.filter((note) => {
      const noteDateStr = note.createdAt;
      if (!noteDateStr) return false;
      try {
        return isSameDay(new Date(noteDateStr), date);
      } catch (e) {
        return false;
      }
    }).length;

    const codesCount = codes.filter((code) => {
      const codeDateStr = code.createdAt;
      if (!codeDateStr) return false;
      try {
        return isSameDay(new Date(codeDateStr), date);
      } catch (e) {
        return false;
      }
    }).length;

    return { day: dayName, notes: notesCount, codes: codesCount };
  });

  return (
    <div className="w-full min-h-screen bg-[#05070D] text-white selection:bg-[#3DE1A1]/30 relative overflow-x-hidden">
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-14">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Welcome back!
          </h2>
          <p className="text-[#A0A8B8] text-lg max-w-xl">
            Here is an overview of your active tasks and collaborative progress.
          </p>
        </div>

        {/* Section: Notes */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold tracking-tight text-white">
            Your Notes
          </h3>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 bg-white/5 rounded-2xl animate-pulse border border-white/[0.08]"
              ></div>
            ))}
          </div>
        ) : notes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {notes.slice(0, visibleNotes).map((note) => (
                <Card
                  key={note.id}
                  onClick={() => handleNoteClick(note.id)}
                  className="group border border-white/[0.08] bg-[#070A14] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer flex flex-col justify-between h-40 rounded-2xl overflow-hidden"
                >
                  <CardHeader className="p-6 pb-0">
                    <CardTitle className="text-xl font-bold text-white line-clamp-2 group-hover:text-[#3DE1A1] transition-colors">
                      {note.title || "Untitled Note"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 mt-auto flex justify-end items-center">
                    <span className="text-sm font-semibold text-[#A0A8B8] group-hover:text-[#7CFFB2] transition-colors inline-flex items-center gap-1 group-hover:translate-x-1 duration-300">
                      View notes <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
            {notes.length > visibleNotes && (
              <div className="flex justify-center mb-16">
                <Button
                  variant="outline"
                  onClick={() => setVisibleNotes((prev) => prev + 6)}
                  className="bg-transparent border-white/[0.08] text-[#A0A8B8] hover:bg-white/[0.04] hover:text-[#3DE1A1] transition-all rounded-xl h-11 px-8 font-semibold"
                >
                  Load More...
                </Button>
              </div>
            )}
            {notes.length <= visibleNotes && <div className="mb-16" />}
          </>
        ) : (
          <div className="text-center py-20 bg-[#070A14] rounded-3xl border border-dashed border-white/10 mb-16">
            <div className="h-16 w-16 bg-white/[0.05] border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-[#3DE1A1]" />
            </div>
            <h3 className="text-xl font-semibold text-white">No notes yet</h3>
            <p className="mt-2 text-[#A0A8B8]">
              Create your first collaborative note to get started.
            </p>
          </div>
        )}

        {/* Section: Code Snippets */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold tracking-tight text-white">
            Your Code Snippets
          </h3>
        </div>

        {loadingCodes ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-40 bg-white/5 rounded-2xl animate-pulse border border-white/[0.08]"
              ></div>
            ))}
          </div>
        ) : codes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {codes.slice(0, visibleCodes).map((code) => (
                <Card
                  key={code.id}
                  onClick={() => handleCodeClick(code.id)}
                  className="group border border-white/[0.08] bg-[#070A14] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer flex flex-col justify-between h-40 rounded-2xl overflow-hidden"
                >
                  <CardHeader className="p-6 pb-0 flex flex-col items-start border-none">
                    <CardTitle className="text-xl font-bold text-white line-clamp-2 group-hover:text-[#4F8CFF] transition-colors">
                      {code.title || "Untitled Snippet"}
                    </CardTitle>
                    {code.language && (
                      <Badge
                        variant="secondary"
                        className="mt-3 font-mono bg-[#4F8CFF]/10 text-[#4F8CFF] hover:bg-[#4F8CFF]/20 border-none px-3 py-1"
                      >
                        {code.language}
                      </Badge>
                    )}
                  </CardHeader>

                  <CardContent className="p-6 pt-0 mt-auto flex justify-end items-center">
                    <span className="text-sm font-semibold text-[#A0A8B8] group-hover:text-[#4F8CFF] transition-colors inline-flex items-center gap-1 group-hover:translate-x-1 duration-300">
                      Open editor <ArrowRight className="w-4 h-4" />
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
            {codes.length > visibleCodes && (
              <div className="flex justify-center mb-16">
                <Button
                  variant="outline"
                  onClick={() => setVisibleCodes((prev) => prev + 6)}
                  className="bg-transparent border-white/[0.08] text-[#A0A8B8] hover:bg-white/[0.04] hover:text-[#4F8CFF] transition-all rounded-xl h-11 px-8 font-semibold"
                >
                  Load More...
                </Button>
              </div>
            )}
            {codes.length <= visibleCodes && <div className="mb-16" />}
          </>
        ) : (
          <div className="text-center py-20 bg-[#070A14] rounded-3xl border border-dashed border-white/10 mb-16">
            <div className="h-16 w-16 bg-white/[0.05] border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code className="w-8 h-8 text-[#4F8CFF]" />
            </div>
            <h3 className="text-xl font-semibold text-white">
              No code snippets yet
            </h3>
            <p className="mt-2 text-[#A0A8B8]">
              Create your first live codebase snapshot.
            </p>
          </div>
        )}

        {/* Section: Activity Trends */}
        <div className="mt-8 mb-6">
          <h3 className="text-2xl font-bold tracking-tight text-white mb-6">
            Activity Trends
          </h3>
          <Card className="p-8 shadow-xl rounded-3xl border-none bg-[#070A14] border-t border-white/[0.08] overflow-hidden">
            <CardContent className="px-0 pb-0">
              <div className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="rgba(255,255,255,0.05)"
                    />
                    <XAxis
                      dataKey="day"
                      stroke="#A0A8B8"
                      fontSize={13}
                      tickLine={false}
                      axisLine={false}
                      dy={10}
                    />
                    <YAxis
                      stroke="#A0A8B8"
                      fontSize={13}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}`}
                      allowDecimals={false}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#0B1020",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "12px",
                        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
                        color: "#FFFFFF",
                      }}
                      itemStyle={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#A0A8B8",
                      }}
                      cursor={{
                        stroke: "rgba(255,255,255,0.1)",
                        strokeWidth: 1,
                      }}
                    />
                    <Legend
                      iconType="circle"
                      wrapperStyle={{
                        paddingTop: "20px",
                        fontSize: "14px",
                        color: "#A0A8B8",
                      }}
                    />
                    <Line
                      name="Notes Created"
                      type="monotone"
                      dataKey="notes"
                      stroke="#3DE1A1"
                      strokeWidth={3}
                      dot={{
                        fill: "#3DE1A1",
                        strokeWidth: 2,
                        r: 4,
                        stroke: "#05070D",
                      }}
                      activeDot={{
                        r: 6,
                        fill: "#7CFFB2",
                        stroke: "#05070D",
                        strokeWidth: 2,
                      }}
                    />
                    <Line
                      name="Code Snippets"
                      type="monotone"
                      dataKey="codes"
                      stroke="#4F8CFF"
                      strokeWidth={3}
                      dot={{
                        fill: "#4F8CFF",
                        strokeWidth: 2,
                        r: 4,
                        stroke: "#05070D",
                      }}
                      activeDot={{
                        r: 6,
                        fill: "#8CB8FF",
                        stroke: "#05070D",
                        strokeWidth: 2,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
