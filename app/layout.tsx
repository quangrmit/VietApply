'use client';
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { createContext, useState } from "react";
import { Resume, ResumeContextType } from "@/lib/types";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export const ResumeContext = createContext<ResumeContextType>({ resumes: [], setResumes: () => { }, selectedResume: null, setSelectedResume: () => { } });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
    const [resumes, setResumes] = useState<Resume[]>([]);
    return (
        <html lang="en">
            <body className={`dark`}>
                <ResumeContext.Provider value={{ resumes, setResumes, selectedResume, setSelectedResume }}>

                    <Navbar />
                    {children}
                </ResumeContext.Provider>
            </body>
            <GoogleTagManager gtmId="G-2D4QZYP55V" />
        </html>
    );
}
