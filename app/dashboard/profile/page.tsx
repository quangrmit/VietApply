"use client";
import { DocumentList } from "@/components/dashboard/document-list";

import { ProfileForm } from "@/components/dashboard/profile-form";
import React from "react";


const profileData = {
    firstName: "Quang",
    lastName: "Nguyen",
    dateOfBirth: "17/12/2003",
    email: "quang.nguyen@example.com",
    phone: "+84 123 456 789",
    location: "Ho Chi Minh City, Vietnam",
    salaryPreference: "$3,000 - $5,000 per month",
    jobType: "full-time",
    skills: "JavaScript, React, Node.js, Python",
    about: "Passionate software developer with 2 years of experience in web development. Eager to contribute to innovative projects and continuously improve my skills.",
};

export default function ProfilePage() {

    const handleUpdateProfile = () => { };

    return (
        <div className="min-h-screen bg-black p-8">
            <h1 className="mb-8 text-2xl font-bold text-white">Profile Information</h1>
            <div className="mx-auto max-w-5xl space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <DocumentList title="Resumes" />
                </div>
                <ProfileForm initialData={profileData} onUpdate={handleUpdateProfile} />
            </div>
        </div>
    );
}
