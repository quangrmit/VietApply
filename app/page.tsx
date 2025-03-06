"use client";
import LoginSignup from "@/components/auth/login-signup";
import { useContext, useEffect } from "react";
import JobsPage from "./jobs/page";
import { AuthContext } from "./layout";

export default function HomePage() {
  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    console.log("changed logged in to ", loggedIn);
  }, [loggedIn]);

  return <>{loggedIn ? <JobsPage /> : <LoginSignup />}</>;
}
