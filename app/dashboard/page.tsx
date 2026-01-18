"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpRight, BookOpen, Users, TrendingUp } from "lucide-react"

const studyData = [
  { day: "Mon", hours: 2.5 },
  { day: "Tue", hours: 3.2 },
  { day: "Wed", hours: 2.1 },
  { day: "Thu", hours: 4.1 },
  { day: "Fri", hours: 3.8 },
  { day: "Sat", hours: 5.2 },
  { day: "Sun", hours: 2.9 },
]

const groupStats = [
  { name: "Active Groups", value: "12", trend: "+2", icon: Users },
  { name: "Study Hours", value: "23.4", trend: "+12%", icon: TrendingUp },
  { name: "Notes Created", value: "156", trend: "+8", icon: BookOpen },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, John</p>
        </div>
        <Button className="rounded-lg">New Session</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        {groupStats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.name} className="p-6 border-border shadow-sm hover-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{stat.name}</p>
                  <p className="text-3xl font-semibold text-foreground mt-2">{stat.value}</p>
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.trend}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6 border-border shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Study Progress</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={studyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
              <Line type="monotone" dataKey="hours" stroke="var(--color-primary)" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 border-border shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-4">Study Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={studyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" />
              <YAxis stroke="var(--color-muted-foreground)" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="hours" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 border-border shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'Added note to "React Hooks"', time: "2 hours ago" },
            { action: 'Joined "Advanced CSS" group', time: "5 hours ago" },
            { action: 'Completed quiz in "JavaScript"', time: "1 day ago" },
            { action: "Created study session", time: "2 days ago" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
              <p className="text-sm text-foreground">{item.action}</p>
              <p className="text-xs text-muted-foreground">{item.time}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
