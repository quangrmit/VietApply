"use client";
import { Resume, ResumeContextType } from "@/lib/types";

import { useState } from "react";
import { JobCard } from "@/components/search/search-job-card";
import { JobDetail } from "@/components/search/job-detail";
import { createContext } from "react";

const jobs = [
  {
    id: 1,
    title: "Data Analyst",
    company: "Data Corp.",
    salary: "$2,200 / tháng",
    location: "Da Nang | On-site",
    postedTime: "Đăng 1 phút trước",
    skills: ["C++", "Java", "Spring", "+2"],
    description: "This is a sample job description. The actual content would go here.",
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Data Corp.",
    salary: "$2,200 / tháng",
    location: "Da Nang | On-site",
    postedTime: "Đăng 1 phút trước",
    skills: ["Python", "SQL", "Tableau"],
    description: "This is a sample job description. The actual content would go here.",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Data Corp.",
    salary: "$2,200 / tháng",
    location: "Da Nang | On-site",
    postedTime: "Đăng 1 phút trước",
    skills: ["R", "Excel", "PowerBI"],
    description: "This is a sample job description. The actual content would go here.",
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "Data Corp.",
    salary: "$2,200 / tháng",
    location: "Da Nang | On-site",
    postedTime: "Đăng 1 phút trước",
    skills: ["R", "Excel", "PowerBI"],
    description: "This is a sample job description. The actual content would go here.",
  },
  {
    id: 5,
    title: "Data Analyst",
    company: "Data Corp.",
    salary: "$2,200 / tháng",
    location: "Da Nang | On-site",
    postedTime: "Đăng 1 phút trước",
    skills: ["R", "Excel", "PowerBI"],
    description: "This is a sample job description. The actual content would go here.",
  },
  {
    id: 6,
    title: "Data Analyst",
    company: "Data Corp.",
    salary: "$2,200 / tháng",
    location: "Da Nang | On-site",
    postedTime: "Đăng 1 phút trước",
    skills: ["R", "Excel", "PowerBI"],
    description: "This is a sample job description. The actual content would go here.",
  },
  {
    id: 7,
    title: "Data Analyst",
    company: "Data Corp.",
    salary: "$2,200 / tháng",
    location: "Da Nang | On-site",
    postedTime: "Đăng 1 phút trước",
    skills: ["R", "Excel", "PowerBI"],
    description: "This is a sample job description. The actual content would go here.",
  },
  {
    id: 8,
    title: "Software Engineering",
    company: "Data Corp.",
    salary: "$2,200 / tháng",
    location: "Da Nang | On-site",
    postedTime: "Đăng 1 phút trước",
    skills: ["R", "Excel", "PowerBI"],
    description: "This is a sample job description. The actual content would go here.",
  },
];



export default function JobsPage() {


  const [selectedJob, setSelectedJob] = useState(jobs[0]);
  const [result, setResult] = useState("");

  const handleClick = async () => {
    setResult("Processing...");
    const res = await fetch("/api/job", { method: "POST" });
    const data = await res.json();
    setResult(data.message);
  };

  return (
    <div className="grid h-[calc(100vh-4rem)] grid-cols-[400px,1fr] gap-0 mt-10">
      <div className="space-y-4 overflow-y-auto border-r border-zinc-800 p-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            {...job}
            isSelected={selectedJob.id === job.id}
            onClick={() => setSelectedJob(job)}
          />
        ))}
      </div>
      <div className="overflow-y-auto">
        <JobDetail job={selectedJob} />
      </div>
    </div>
  );
}