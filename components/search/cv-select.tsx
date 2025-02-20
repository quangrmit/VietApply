import { useContext, useEffect, useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { ResumeContext } from "@/app/layout";
interface Resume {
    id: string;
    filename: string;
    data: object;
}



export default function CVSelect() {

    const {resumes, setResumes, selectedResume, setSelectedResume} = useContext(ResumeContext);

    const chooseFromList = (index: string) => {
        const result = resumes[parseInt(index)];
        setSelectedResume(result)
    }   


    useEffect(() => {
        console.log('changed')
        console.log(selectedResume);
    }, [selectedResume])

    return (
        <Select onValueChange={chooseFromList}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose resume" />
            </SelectTrigger>
            <SelectContent className="h-40">
                {resumes.map((resume, index) => (
                    <SelectItem value={index.toString()} key={resume.id}>
                        {resume.filename}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
