"use client";
import { DocumentList } from "@/components/dashboard/document-list";

import { ProfileInfo } from "@/components/dashboard/profile-info";
import React, { useEffect, useState, useContext, createContext } from "react";

export default function ProfilePage() {
    return (
        <div className="min-h-screen bg-black p-8">
            <h1 className="mb-8 text-2xl font-bold text-white">Profile Information</h1>
            <div className="mx-auto max-w-5xl space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <DocumentList title="Resumes" />
                </div>

                <ProfileInfo />
            </div>
        </div>
    );
}
