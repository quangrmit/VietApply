import { ProfileFormProps } from "@/lib/types";
import LabelInput from "./label-input";
import CitiesSearch from "./cities-search";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import DatePicker from "../ui/date-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useEffect, useState } from "react";


export default function ProfileForm({profileData, handleChange}: ProfileFormProps) {

    const [date, setDate]= useState<Date>();

    useEffect(() => {
        // everytime the date changes, the value from the profile object    must change
        if (!date){
            return ;
        }

        handleChange("dateOfBirth", date);
    }, [date])



    return (

        <div className="grid grid-cols-2 gap-4">
        <LabelInput
            elementId="firstName"
            labelText="First name"
            inputValue={profileData.firstName}
            inputOnchange={handleChange}
            />  
        <LabelInput
            elementId="middleName"
            labelText="Middle name"
            inputValue={profileData.middleName}
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
            <div id="dateOfBirth">
                <DatePicker date={profileData.dateOfBirth} setDate={setDate} initialDate={profileData.dateOfBirth} />
            </div>
        </div>
        <LabelInput
            elementId="email"
            labelText="Email"
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
                <Label htmlFor="minSalary" className="text-zinc-400">
                    Minimum salary (VND)
                </Label>
                <Input
                    id="minSalary"
                    value={profileData.minSalary}
                    onChange={(e) => handleChange("minSalary", e.target.value)}
                    className="text-zinc-100  disabled:opacity-100"
                    />
            </div>
            <div className="space-y-2">
                <Label htmlFor="maxSalary" className="text-zinc-400">
                    Maximum salary (VND)
                </Label>
                <Input
                    id="maxSalary"
                    value={profileData.maxSalary}
                    onChange={(e) => handleChange("maxSalary", e.target.value)}
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
    </div>)
}
