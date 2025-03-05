import { useContext, useEffect, useState } from "react";
import ProfileForm from "../dashboard/profile-form";
import { Progress } from "../ui/progress";
import ProgressSignUp from "./progress-sign-up";
import { JobType, ProfileData } from "@/lib/types";
import { Button } from "../ui/button";
import { splitByComma } from "@/lib/utils";
import { profile } from "console";
import { Input } from "../ui/input";
import { json } from "stream/consumers";
import { AuthContext } from "@/app/layout";
import { Label } from "../ui/label";

const initialSignUpData: ProfileData = {
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: new Date(),
    email: "",
    phone: "",
    location: "",
    minSalary: "",
    maxSalary: "",
    jobType: "full-time",
    about: "",
};

export default function SignUpFlow() {
    const { setLoggedIn } = useContext(AuthContext);
    const [profileData, setProfileData] = useState(initialSignUpData);
    const [pwd, setPwd] = useState("");

    const handleChange = (field: keyof ProfileData, value: string | Date | JobType | string[]) => {
        const newData = { ...profileData, [field]: value };
        setProfileData(newData);
    };

    useEffect(() => {
        console.log("changed profile data", profileData);
    }, [profileData]);

    const handleSignUp = async () => {
        console.log("handling sign up");
        // Get all the profile data
        const userData = { ...profileData, password: pwd };

        // Call the post api
        const response = await fetch("http://localhost:3000/api/profile-post", {
            method: "POST",
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        // store the jwt in the browser
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
    };
    return (
        <div>
            {/* Prop drill into the profile form */}
            <ProfileForm profileData={profileData} handleChange={handleChange} />
            {/* <ProgressSignUp /> */}
            {/* <Input></Input> */}
            <div className=" mt-3">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    placeholder="Password"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    type="password"
                    className="border-zinc-500 w-[50%]"
                />
            </div>
            <Button onClick={handleSignUp}>Sign up</Button>
        </div>
    );
}
