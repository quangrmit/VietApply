import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";


const resumes = [
    { id: "1", name: "Python_Software.pdf" },
    { id: "2", name: "Data_Analyst.pdf" },
    { id: "3", name: "NodeJS.pdf" },
    { id: "4", name: "React_Developer.pdf" },
    { id: "5", name: "Frontend_Engineer.pdf" },
    { id: "6", name: "Full_Stack.pdf" },
    { id: "7", name: "Software_Engineer.pdf" },
    { id: "8", name: "Web_Developer.pdf" },
    { id: "9", name: "UI_Developer.pdf" },
    { id: "10", name: "Backend_Developer.pdf" },
  ]

export default function CVSelect() {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose resume" />
            </SelectTrigger>
            <SelectContent className="h-40">
                {resumes.map((resume) => (
                    <SelectItem value={resume.name} key={resume.id}>
                        {resume.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
