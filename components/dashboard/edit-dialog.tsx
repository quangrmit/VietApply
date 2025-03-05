import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog";
import { Edit } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { JobType, ProfileData, ProfileFormProps } from "@/lib/types";
import { useState } from "react";
import e from "express";
import LabelInput from "./label-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import DatePicker from "../ui/date-picker";
import CitiesSearch from "./cities-search";
import ProfileForm from "./profile-form";

export default function EditDialog() {
    const initialData :ProfileData = {
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: new Date(2003, 11, 17),
        email: "",
        phone: "",
        location: "",
        minSalary: "",
        maxSalary: "",
        jobType: "full-time",
        skills: [],
        about: "",
    };

    // why is this date separate from the original data?
    const [date, setDate] = useState<Date>();

    const [profileData, setData] = useState(initialData);

    const handleChange = (field: keyof ProfileData, value: string | Date | JobType | string[]) => {
        const newData = { ...profileData, [field]: value };


        setData(newData);
    };

    const handleSaveChanges = async () => {
        // call post api for posting the information
        console.log("saving changes");

        const response = await fetch("http://localhost:3000/api/profile-post", {
            method: "POST",
            body: JSON.stringify(profileData),
        });

        const data = await response.json();
        console.log(data);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="max-w-[80vw]">
                <DialogTitle asChild>
                    <h1 className="font-bold">Edit profile</h1>
                </DialogTitle>

                <ProfileForm profileData={profileData}  handleChange={handleChange}/>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
