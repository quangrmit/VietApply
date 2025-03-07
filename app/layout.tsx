"use client";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { createContext, useEffect } from "react";
import {  ResumeContextType } from "@/lib/types";
import useAuth from "@/hooks/use-auth";
import useResumes from "@/hooks/use-resumes";
import dynamic from "next/dynamic";

export const ResumeContext = createContext<ResumeContextType>({
    resumes: [],
    setResumes: () => {},
    selectedResume: null,
    setSelectedResume: () => {},
    fetchResumes: () => {}
});
export const AuthContext = createContext({
    loggedIn: false,
    setLoggedIn: (loggedIn: boolean) => {
        console.log(loggedIn);
    },
    token:""
});

 function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { loggedIn, setLoggedIn, token} = useAuth();

    const {resumes, setResumes, selectedResume, setSelectedResume, fetchResumes} = useResumes();

   

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn , token}}>
            <html lang="en">
                <body className="dark stable-scrollbar overflow-y-auto">
                    <ResumeContext.Provider
                        value={{ resumes, setResumes, selectedResume, setSelectedResume , fetchResumes}}
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
// disable ssr
export default  dynamic(() => Promise.resolve(RootLayout), {
    ssr: false
  })