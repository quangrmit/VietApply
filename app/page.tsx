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
import { SetStateAction, useContext, useEffect, useState } from "react";
import JobsPage from "./jobs/page";
import { createContext } from "react";
import useLogin from "@/hooks/useLogin";
import { AuthContext } from "./layout";

export default function HomePage() {
    const { loggedIn } = useContext(AuthContext);

    useEffect(() => {
        console.log("changed logged in to ", loggedIn);
    }, [loggedIn]);

    return <>{loggedIn ? <JobsPage /> : <LoginSignup />}</>;
}
