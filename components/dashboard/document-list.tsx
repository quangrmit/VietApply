import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Document {
  id: string
  name: string
}

interface DocumentListProps {
  title: string
  documents: Document[]
//   onDelete: (id: string) => void
}

export function DocumentList({ title, documents }: DocumentListProps) {
  return (
    <div className="rounded-lg bg-zinc-900 p-4">
      <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
        {title} <span className="text-zinc-400">[{documents.length}]</span>
      </h2>
      <div className="h-[300px] space-y-2 overflow-y-auto scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-700 pr-2">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between rounded-md bg-zinc-800 px-4 py-2">
            <span className="text-sm text-zinc-300">{doc.name}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-400 hover:text-red-500"
            //   onClick={() => onDelete(doc.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
