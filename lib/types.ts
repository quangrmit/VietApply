import { Dispatch, SetStateAction } from "react";

export type Resume = {
    id: string;
    filename: string;
    data: object;
}

export type ResumeContextType = {
    resumes: Resume[]; // Adjust this type as needed
    setResumes: (resumes: Resume[]) => void;
    selectedResume: Resume | null;
    setSelectedResume: (resume: Resume) => void;
}

export type JobType = "full-time" | "part-time" | "freelance" | "contract" | "internship"

export interface ProfileData {
    firstName: string;
    lastName: string;
    middleName: string;
    dateOfBirth: Date;
    email: string;
    phone: string;
    location: string;
    minSalary: string;
    maxSalary: string;
    jobType: JobType;
    // skills: string[];
    about: string;
}
export type LoginData = {
    email: string;
    password: string;
}

export type JwtPayload = {
    email: string;
    sub: string;
    role: string;
}

export type UserData = ProfileData & {
    password: string
}

export interface ProfileFormProps {
    profileData: ProfileData;
    handleChange: (field: keyof ProfileData, newValue: string | Date | JobType | string[] ) => void;
}

export type City = {
    _id: string;
    name: string;
    slug: string;
    type: string;
    name_with_type: string;
    isDeleted: boolean;
    code: string;
};
export type CitiesSearchProps = {
    handleSelect: (field: keyof ProfileData, value: string) => void;
    initialValue: string;
};