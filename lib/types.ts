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