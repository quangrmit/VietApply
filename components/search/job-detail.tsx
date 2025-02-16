import { Button } from "@/components/ui/button"

interface JobDetailProps {
  job: {
    title: string
    company: string
    salary: string
    location: string
    postedTime: string
    description: string
  }
}

export function JobDetail({ job }: JobDetailProps) {
  return (
    <div className="h-full bg-zinc-900 p-6">
      <div className="mb-6 flex items-start gap-4">
        <div className="h-12 w-12 rounded-lg bg-zinc-800">
          <img
            src="/placeholder.svg"
            alt={job.company}
            className="h-full w-full rounded-lg object-cover"
          />
        </div>
        <div>
          <h2 className="text-xl font-medium text-white">{job.title}</h2>
          <p className="mb-2 text-zinc-400">{job.company}</p>
          <p className="mb-2 text-white">Lương: {job.salary}</p>
          <p className="text-sm text-zinc-400">
            {job.postedTime} {job.location}
          </p>
        </div>
      </div>

      <div className="mb-6 flex gap-3">
        <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
          Manual Apply
        </Button>
        <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
          AI Apply
        </Button>
        <Button variant="outline" className="ml-auto">
          Tagging here
        </Button>
      </div>

      <div className="rounded-lg bg-zinc-800/50 p-6">
        <h3 className="mb-4 text-lg font-medium text-white">JOB DESCRIPTION HERE</h3>
        <p className="text-zinc-400">{job.description}</p>
      </div>

      <div className="mt-6 flex justify-end">
        <Button variant="outline" className="text-blue-400">
          Was this suggestion correct?
        </Button>
      </div>
    </div>
  )
}

