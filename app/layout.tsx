"use client";
import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { createContext, useState } from "react";
import { Resume, ResumeContextType } from "@/lib/types";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import useLogin from "@/hooks/useLogin";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const ResumeContext = createContext<ResumeContextType>({
    resumes: [],
    setResumes: () => {},
    selectedResume: null,
    setSelectedResume: () => {},
});
export const AuthContext = createContext({ loggedIn: false, setLoggedIn: (loggedIn: boolean) => {} });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
    const [resumes, setResumes] = useState<Resume[]>([]);
    const { loggedIn, setLoggedIn } = useLogin();
    return (
        <GoogleOAuthProvider clientId="125849592219-nbou4ddqnl4vdjn3smsff8huqfbmsvot.apps.googleusercontent.com">
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
        </GoogleOAuthProvider>
    );
}
