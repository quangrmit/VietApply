'use client'
import { useState, useEffect } from "react";
import { Resume } from "@/lib/types";
import useAuth from "./use-auth";

export default function useResumes() {
    const [selectedResume, setSelectedResume] = useState<Resume | null>(null);
    const [resumes, setResumes] = useState<Resume[]>([]);
    const {token} = useAuth();
    const fetchResumes = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/resumes?token=${token}`);
            const data = await response.json();

            setResumes(data);

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);
    return {selectedResume, setSelectedResume, resumes, setResumes, fetchResumes}
}