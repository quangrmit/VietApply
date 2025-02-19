import { Card } from "@/components/ui/card";

// Might convert this to type instead of interface
interface JobCardProps {
    role: string;
    company: string;
    location: string;
    status: "Considering" | "Applied" | "Viewed";
    imageUrl?: string;
}

const statusStyles = {
    Considering: "border-yellow-500 text-yellow-500",
    Applied: "border-emerald-500 text-emerald-500",
    Viewed: "border-zinc-500 text-zinc-500",
} as const;

export function JobCard({ role, company, location, status, imageUrl = "/placeholder.svg" }: JobCardProps) {
    return (
        <Card className="relative flex items-start gap-4 overflow-hidden bg-zinc-900 p-4 border-none">
            {/* Company Logo/Avatar */}
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                <img
                    src={imageUrl || "/placeholder.svg"}
                    alt={company}
                    className="h-full w-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-base font-medium text-white">{role}</h3>
                    <span
                        className={`inline-flex items-center rounded-sm border px-2 py-0.5 text-xs font-medium ${statusStyles[status]}`}
                    >
                        {status}
                    </span>
                </div>
                <p className="mt-1 truncate text-sm text-zinc-400">{company}</p>
                <p className="mt-1 text-sm text-zinc-400">{location}</p>
            </div>
        </Card>
    );
}
