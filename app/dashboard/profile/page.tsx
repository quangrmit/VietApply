import { DocumentList } from "@/components/dashboard/document-list";
import { ProfileForm } from "@/components/dashboard/profile-form";

const resumers = [
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

const coverLetters = [
    { id: "1", name: "GameLoft_intern.pdf" },
    { id: "2", name: "Data_Analyst.pdf" },
    { id: "3", name: "NodeJS.pdf" },
];

const profileData = {
    firstName: "Quang",
    lastName: "Nguyen",
    dateOfBirth: "17/12/2003",
    email: "quang.nguyen@example.com",
    phone: "+84 123 456 789",
    location: "Ho Chi Minh City, Vietnam",
    salaryPreference: "$3,000 - $5,000 per month",
    jobType: "full-time",
    skills: "JavaScript, React, Node.js, Python",
    about:
      "Passionate software developer with 2 years of experience in web development. Eager to contribute to innovative projects and continuously improve my skills.",
  }
  

export default function ProfilePage() {
    async function handleDeleteDocument(id: string) {
        "use server";
        // Handle document deletion here
        console.log("Deleting document:", id);
    }

    async function handleUpdateProfile(data: any) {
        "use server";
        // Handle profile update here
        console.log("Updating profile:", data);
    }
    return (
        <div className="min-h-screen bg-black p-8">
<h1 className="mb-8 text-2xl font-bold text-white">Profile Information</h1> 
            <div className="mx-auto max-w-5xl space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                    <DocumentList title="Resumers" documents={resumers} />
                </div>
                <ProfileForm initialData={profileData} onUpdate={handleUpdateProfile} />
            </div>
        </div>
    );
}


