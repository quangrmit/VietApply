"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import EditDialog from "./edit-dialog";

interface ProfileData {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    email: string;
    phone: string;
    location: string;
    salaryPreference: string;
    jobType: string;
    skills: string;
    about: string;
}

interface ProfileFormProps {
    initialData: ProfileData;
    onUpdate: (data: ProfileData) => void;
}

export function ProfileForm({ initialData, onUpdate }: ProfileFormProps) {
    const [data, setData] = useState(initialData);

    const handleChange = (field: keyof ProfileData, value: string) => {
        const newData = { ...data, [field]: value };
        setData(newData);
        onUpdate(newData);
    };

    return (
        <div className="rounded-lg bg-zinc-900 p-4 h-full overflow-y-auto ">
            <div className="flex justify-between">
                <h2 className="mb-4 text-xl font-semibold text-white ">My Profile</h2>

                <EditDialog />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-zinc-400">
                        First name
                    </Label>
                    <Input
                        id="firstName"
                        value={data.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
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
                        value={data.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
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
                        value={data.dateOfBirth}
                        onChange={(e) => handleChange("dateOfBirth", e.target.value)}
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
                        value={data.email}
                        onChange={(e) => handleChange("email", e.target.value)}
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
                        value={data.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
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
                        value={data.location}
                        onChange={(e) => handleChange("location", e.target.value)}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        disabled
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="salaryPreference" className="text-zinc-400">
                        Salary Preference
                    </Label>
                    <Input
                        id="salaryPreference"
                        value={data.salaryPreference}
                        onChange={(e) => handleChange("salaryPreference", e.target.value)}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        placeholder="e.g. $50,000 - $70,000"
                        disabled
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="jobType" className="text-zinc-400">
                        Preferred Job Type
                    </Label>
                    <Select onValueChange={(value) => handleChange("jobType", value)} disabled>
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
                    value={data.skills}
                    onChange={(e) => handleChange("skills", e.target.value)}
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
                    value={data.about}
                    onChange={(e) => handleChange("about", e.target.value)}
                    className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                    placeholder="Brief description about yourself"
                    rows={3}
                    disabled
                />
            </div>
        </div>
    );
}
