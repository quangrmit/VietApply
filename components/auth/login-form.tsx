import { useContext, useEffect, useState } from "react";
import LabelInput from "../dashboard/label-input";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LoginData } from "@/lib/types";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/layout";

export default function LoginForm() {
    const [loginEmail, setLoginEmail] = useState<string>("");
    const [loginPwd, setLoginPwd] = useState<string>("");
    const {loggedIn, setLoggedIn} = useContext(AuthContext);

    useEffect(() => {
        console.log(loginEmail, " ", loginPwd);
    }, [loginEmail, loginPwd]);

    const handleLogin = async () => {

        const loginData: LoginData = {
            email: loginEmail,
            password: loginPwd
        }

        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            body: JSON.stringify(loginData)
        })

        if (response.status == 404){
            console.log('email not found')
            // email not found
        }

        if (response.status === 401){
            console.log('password not correct')
            // password not correct 
        }

        const data = await response.json();
        const token = data.token;
        localStorage.setItem('jwt', token);        
        setLoggedIn(true);
        
    }

    return (
        <div>
            <Label htmlFor="email" className="text-zinc-400">
                Email
            </Label>
            <Input
                id="email"
                value={loginEmail}
                onChange={(e: any) => setLoginEmail(e.target.value)}
                className=" text-zinc-100  disabled:opacity-100 hover:bg-accent"
            />
            <Label htmlFor="password" className="text-zinc-400">
                Password
            </Label>
            <Input
                id="password"
                value={loginPwd}
                onChange={(e: any) => setLoginPwd(e.target.value)}
                className=" text-zinc-100  disabled:opacity-100 hover:bg-accent"
            />
            <Button onClick={handleLogin}>Log in</Button>
        </div>
    );
}
