"use client";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { createContext, useState } from "react";
import { Resume, ResumeContextType } from "@/lib/types";
import useLogin from "@/hooks/useLogin";

export const ResumeContext = createContext<ResumeContextType>({
    resumes: [],
    setResumes: () => { },
    selectedResume: null,
    setSelectedResume: () => { },
});
export const AuthContext = createContext({ loggedIn: false, setLoggedIn: (loggedIn: boolean) => { } });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
    const [resumes, setResumes] = useState<Resume[]>([]);
    const { loggedIn, setLoggedIn } = useLogin();
    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            <html lang="en">
                <body className="dark stable-scrollbar overflow-y-auto">
                    <ResumeContext.Provider
                        value={{ resumes, setResumes, selectedResume, setSelectedResume }}
                    >
                        <Navbar />
                        <div className="flex items-center justify-center">{children}</div>
                    </ResumeContext.Provider>
                </body>
                <GoogleTagManager gtmId="G-2D4QZYP55V" />
            </html>
        </AuthContext.Provider>
    );
}
