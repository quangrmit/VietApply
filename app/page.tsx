"use client";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpFlow from "@/components/auth/sign-up-flow";
import ProgressSignUp from "@/components/auth/progress-sign-up";
import { ProfileData } from "@/lib/types";
import LoginSignup from "@/components/auth/login-signup";
import { SetStateAction, useEffect, useState } from "react";
import JobsPage from "./jobs/page";
import { createContext } from "react";
import useLogin from "@/hooks/useLogin";

export const AuthContext = createContext(
    { loggedIn: false, 
        setLoggedIn: (loggedIn: boolean) => {}
     })
export default function HomePage() {
    const {loggedIn, setLoggedIn} = useLogin();
  


    useEffect(() => {
        console.log('changed logged in to ', loggedIn)
    }, [loggedIn])

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            <>{loggedIn ? <JobsPage /> : <LoginSignup />}</>
        </AuthContext.Provider>
    );
}
