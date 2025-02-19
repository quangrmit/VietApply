'use client'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface JobCardProps {
  title: string
  company: string
  salary: string
  location: string
  postedTime: string
  skills: string[]
  isSelected?: boolean
  onClick?: () => void
}

export function JobCard({ title, company, salary, location, postedTime, skills, isSelected, onClick }: JobCardProps) {
  return (
    <Card
      className={cn(
        "cursor-pointer bg-zinc-900 p-4 transition-colors hover:bg-zinc-800",
        isSelected && "border-blue-500",
      )}
      onClick={onClick}
    >
      <div className="mb-2 text-sm text-zinc-400">{postedTime}</div>
      <div className="mb-4 flex items-start gap-3">
        <div className="h-10 w-10 shrink-0 rounded-lg bg-zinc-800">
          <img
            // src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-emfItZuS8e2XqnqwaMmOgzkYPFFbs3.png"
            src="/placeholder.svg"
            alt={company}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-white">{title}</h3>
          <p className="text-sm text-zinc-400">{company}</p>
        </div>
      </div>
      <div className="mb-3 text-sm text-white">Lương: {salary}</div>
      <div className="mb-3 text-sm text-zinc-400">{location}</div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="bg-zinc-800 text-zinc-400">
            {skill}
          </Badge>
        ))}
      </div>
    </Card>
  )
}

