import { DialogClose, DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "../ui/dialog";
import { Edit } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ProfileData, ProfileFormProps } from "@/lib/types";
import { useState } from "react";
import e from "express";
import LabelInput from "./label-input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import DatePicker from "../ui/date-picker";
import CitiesSearch from "./cities-search";

export default function EditDialog({ initialData }: ProfileFormProps) {
    const [date, setDate] = useState<Date>();

    const [profileData, setData] = useState(initialData);

    const handleChange = (field: keyof ProfileData, value: string) => {
        const newData = { ...profileData, [field]: value };

        console.log(`changing ${field} to ${value}`)

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

                <div className="grid grid-cols-2 gap-4">
                    <LabelInput
                        elementId="firstName"
                        labelText="First name"
                        inputValue={profileData.firstName}
                        inputOnchange={handleChange}
                    />

                    <LabelInput
                        elementId="lastName"
                        labelText="Last name"
                        inputValue={profileData.lastName}
                        inputOnchange={handleChange}
                    />

                    <div>
                        <Label className="text-zinc-400" htmlFor="dob">
                            Date of Birth
                        </Label>
                        <div id="dob">
                            <DatePicker date={date} setDate={setDate} initialDate={initialData.dateOfBirth} />
                        </div>
                    </div>
                    <LabelInput
                        elementId="email"
                        labelText="email"
                        inputValue={profileData.email}
                        inputOnchange={handleChange}
                    />

                    <LabelInput
                        elementId="phone"
                        labelText="Phone"
                        inputValue={profileData.phone}
                        inputOnchange={handleChange}
                    />

    
                    <div className="space-y-2">
                        <Label className="block text-zinc-400">Location</Label>
                        <CitiesSearch handleSelect={handleChange} initialValue={profileData.location} />
                    </div>

                    <div id="salary" className=" space-x-2 grid grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="salaryMin" className="text-zinc-400">
                                Minimum salary (VND)
                            </Label>
                            <Input
                                id="salaryMin"
                                value="3000"
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                className="text-zinc-100  disabled:opacity-100"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="salaryMin" className="text-zinc-400">
                                Maximum salary (VND)
                            </Label>
                            <Input
                                id="salaryMin"
                                value="3000"
                                onChange={(e) => handleChange("lastName", e.target.value)}
                                className=" text-zinc-100  disabled:opacity-100"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="jobType" className="text-zinc-400">
                            Preferred Job Type
                        </Label>
                        <Select onValueChange={(value) => handleChange("jobType", value)}>
                            <SelectTrigger className=" text-zinc-100 disabled:opacity-100">
                                <SelectValue placeholder="Select job type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full-time">Full-time</SelectItem>
                                <SelectItem value="part-time">Part-time</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="freelance">Freelance</SelectItem>
                                <SelectItem value="internship">Internship</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <LabelInput
                        elementId="skills"
                        labelText="Skills"
                        inputValue={profileData.skills.join(", ")}
                        inputOnchange={handleChange}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
