"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import EditDialog from "./edit-dialog";
import { ProfileData } from "@/lib/types";


// Fetch instead of fixing
const initialData = {
    firstName: "Quang",
    lastName: "Nguyen",
    dateOfBirth: new Date(2003, 11, 17),
    email: "quang.nguyen@example.com",
    phone: "+84 123 456 789",
    location: "Ho Chi Minh City, Vietnam",
    minSalary: "3000000",
    maxSalary: "5000000",
    jobType: "full-time",
    skills: ["JavaScript", "React", "Node.js", "Python"],
    about: "Passionate software developer with 2 years of experience in web development. Eager to contribute to innovative projects and continuously improve my skills.",
};



export function ProfileForm() {




    return (
        <div className="rounded-lg bg-zinc-900 p-4 h-full overflow-y-auto ">
            <div className="flex justify-between">
                <h2 className="mb-4 text-xl font-semibold text-white ">My Profile</h2>

                <EditDialog initialData={initialData} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-zinc-400">
                        First name
                    </Label>
                    <Input
                        id="firstName"
                        value={initialData.firstName}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        disabled
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-zinc-400">
                        Last name
                    </Label>
                    <Input
                        id="lastName"
                        value={initialData.lastName}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        disabled
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-zinc-400">
                        Date of Birth
                    </Label>
                    <Input
                        id="dateOfBirth"
                        value={initialData.dateOfBirth.toLocaleDateString()}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        disabled
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-400">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={initialData.email}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        disabled
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-zinc-400">
                        Phone
                    </Label>
                    <Input
                        id="phone"
                        value={initialData.phone}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        disabled
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location" className="text-zinc-400">
                        Location
                    </Label>
                    <Input
                        id="location"
                        value={initialData.location}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        disabled
                    />
                </div>
                <div id="salary" className=" space-x-2 grid grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="salaryMin" className="text-zinc-400">
                                Minimum salary (VND)
                            </Label>
                            <Input
                                id="salaryMin"
                                value="3000"
                                className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salaryMin" className="text-zinc-400">
                                Maximum salary (VND)
                            </Label>
                            <Input
                                id="salaryMin"
                                value="3000"
                                className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                            />
                        </div>
                    </div>

                <div className="space-y-2">
                    <Label htmlFor="jobType" className="text-zinc-400">
                        Preferred Job Type
                    </Label>
                    <Select  disabled>
                        <SelectTrigger className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100">
                            <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                            <SelectItem value="freelance">Freelance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <Label htmlFor="skills" className="text-zinc-400">
                    Skills
                </Label>
                <Input
                    id="skills"
                    value={initialData.skills.join(", ")}
                    className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                    placeholder="e.g. JavaScript, React, Node.js"
                    disabled
                />
            </div>
            <div className="mt-4 space-y-2">
                <Label htmlFor="about" className="text-zinc-400">
                    About
                </Label>
                <Textarea
                    id="about"
                    value={initialData.about}
                    className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                    placeholder="Brief description about yourself"
                    rows={3}
                    disabled
                />
            </div>
        </div>
    );
}
