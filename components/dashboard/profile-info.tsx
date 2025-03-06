"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import EditDialog from "./edit-dialog";
// import { ProfileData } from "@/lib/types";

// Fetch instead of fixing
const initialData = {
    firstname: "quang",
    middlename: "",
    lastname: "",
    dateofbirth: new Date(),
    email: "",
    phone: "",
    location: "",
    minsalary: "",
    maxsalary: "",
    jobtype: "full-time",
    about: "",
};

export function ProfileInfo() {

    const [profileData, setProfileData] = useState(initialData);
    // const currUserId = 1;
    const fetchProfileData = async () => {
        const currUserToken = localStorage.getItem("jwt");
        const response = await fetch(`http://localhost:3000/api/profile-get?token=${currUserToken}`);
        const data = await response.json();

        setProfileData(data)
    };

    useEffect(() => {
        console.log(profileData)
    }, [profileData])

    useEffect(() => {
        fetchProfileData();
    }, []);

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
                        value={profileData.firstname}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        disabled
                        readOnly
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-zinc-400">
                        Last name
                    </Label>
                    <Input
                        id="lastName"
                        value={profileData.lastname}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        disabled
                        readOnly
                    />
                </div>
                {/* <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-zinc-400">
                        Date of Birth
                    </Label>
                    <Input
                        id="dateOfBirth"
                        value={profileData.dateOfBirth.toLocaleDateString()}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        disabled
                        readOnly
                    />
                </div> */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-zinc-400">
                        Email
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        disabled
                        readOnly
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-zinc-400">
                        Phone
                    </Label>
                    <Input
                        id="phone"
                        value={profileData.phone}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        disabled
                        readOnly
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="location" className="text-zinc-400">
                        Location
                    </Label>
                    <Input
                        id="location"
                        value={profileData.location}
                        className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                        disabled
                        readOnly
                    />
                </div>
                <div id="salary" className=" space-x-2 grid grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="salaryMin" className="text-zinc-400">
                            Minimum salary (VND)
                        </Label>
                        <Input
                            id="salaryMin"
                            value={profileData.minsalary}
                            className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                            readOnly
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="salaryMax" className="text-zinc-400">
                            Maximum salary (VND)
                        </Label>
                        <Input
                            id="salaryMax"
                            value={profileData.maxsalary}
                            className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                            disabled
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="jobType" className="text-zinc-400">
                        Preferred Job Type
                    </Label>
                    <Select disabled>
                        <SelectTrigger className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100">
                            <SelectValue placeholder={profileData.jobtype}/>
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
                <Label htmlFor="about" className="text-zinc-400">
                    About
                </Label>
                <Textarea
                    id="about"
                    value={profileData.about}
                    className="bg-zinc-800 text-zinc-100 border-none disabled:opacity-100"
                    placeholder="Brief description about yourself"
                    rows={3}
                    disabled
                />
            </div>
        </div>
    );
}
