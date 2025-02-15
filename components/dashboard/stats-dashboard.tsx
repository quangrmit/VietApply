import type React from "react"
import { Send, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
}

function StatsCard({ title, value, icon }: StatsCardProps) {
  return (
    <Card className="bg-zinc-900 border-none">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm font-medium text-zinc-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
        </div>
        <div className="rounded-full bg-zinc-800 p-3 text-zinc-400">{icon}</div>
      </CardContent>
    </Card>
  )
}

export function StatsDashboard() {
  return (
    <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
      <StatsCard title="Applications Submitted" value={6} icon={<Send className="h-5 w-5" />} />
      <StatsCard title="Total Matches" value={12} icon={<Users className="h-5 w-5" />} />
    </div>
  )
}

