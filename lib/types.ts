export type Resume =  {
    id: string;
    filename: string;
    data: object;
}

export type ResumeContextType = {
    resumes: Resume[] ; // Adjust this type as needed
    setResumes: (resumes: Resume[]) => void;
    selectedResume: Resume | null;
    setSelectedResume: (resume: Resume) => void;
}

export interface ProfileData {
    firstName: string;
    lastName: string;
    dateOfBirth: Date;
    email: string;
    phone: string;
    location: string;
    minSalary: string;
    maxSalary: string;
    jobType: string;    
    skills: string[];
    about: string;
}

export interface ProfileFormProps {
    initialData: ProfileData;
    // onUpdate: (data: ProfileData) => void;
}
