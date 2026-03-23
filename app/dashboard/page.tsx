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

export default function DashboardPage() {
  const router = useRouter();
  const { session, isPending } = User();
  const signOut = useSignOut();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [codes, setCodes] = useState<any[]>([]);
  const [loadingCodes, setLoadingCodes] = useState(true);

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
        console.log(response);
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
        console.log(response);
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

  if (isPending) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
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
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-500 text-lg">
            Here is an overview of your work.
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900">Your Notes</h3>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {notes.map((note) => (
              <Card
                key={note.id}
                onClick={() => handleNoteClick(note.id)}
                className="group hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between h-40 border-border bg-card"
              >
                <CardHeader className="p-6 pb-0">
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                    {note.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-6 pt-0 mt-auto flex justify-end items-center">
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    View details &rarr;
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border mb-12">
            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">No notes yet</h3>
            <p className="mt-1 text-gray-500">
              Create your first note to get started.
            </p>
          </div>
        )}

        <div className="flex items-center justify-between mb-6 mt-12">
          <h3 className="text-2xl font-bold text-gray-900">
            Your Code Snippets
          </h3>
        </div>

        {loadingCodes ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : codes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {codes.map((code) => (
              <Card
                key={code.id}
                onClick={() => handleCodeClick(code.id)}
                className="group hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between h-40 border-border bg-card"
              >
                <CardHeader className="p-6 pb-0 flex flex-col items-start">
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                    {code.title || "Untitled Snippet"}
                  </CardTitle>
                  {code.language && (
                    <Badge variant="secondary" className="mt-2 font-mono">
                      {code.language}
                    </Badge>
                  )}
                </CardHeader>

                <CardContent className="p-6 pt-0 mt-auto flex justify-end items-center">
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                    View details &rarr;
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-border mb-12">
            <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No code snippets yet
            </h3>
            <p className="mt-1 text-gray-500">
              Create your first code snippet to get started.
            </p>
          </div>
        )}

<Card className="p-6 shadow-sm bg-card border-border">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-lg font-bold">Activity Trends</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="day"
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#9CA3AF"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid #E5E7EB",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      color: "#111827",
                    }}
                    itemStyle={{ fontSize: "12px", fontWeight: "500" }}
                    cursor={{ stroke: "#9CA3AF", strokeWidth: 1 }}
                  />
                  <Legend
                    iconType="circle"
                    wrapperStyle={{ paddingTop: "10px", fontSize: "14px" }}
                  />
                  <Line
                    name="Notes"
                    type="monotone"
                    dataKey="notes"
                    stroke="#4F46E5"
                    strokeWidth={3}
                    dot={{ fill: "#4F46E5", strokeWidth: 1, r: 4 }}
                    activeDot={{ r: 6, fill: "#4F46E5" }}
                  />
                  <Line
                    name="Code Snippets"
                    type="monotone"
                    dataKey="codes"
                    stroke="#10B981"
                    strokeWidth={3}
                    dot={{ fill: "#10B981", strokeWidth: 1, r: 4 }}
                    activeDot={{ r: 6, fill: "#10B981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
