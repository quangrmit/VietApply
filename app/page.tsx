"use client";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignUpFlow from "@/components/auth/sign-up-flow";
import ProgressSignUp from "@/components/auth/progress-sign-up";

export default function HomePage() {

    const generateToken = async (credentialResponse: CredentialResponse) => {
        const credential = credentialResponse.credential;
        const response = await fetch("http://localhost:3000/api/verify-google-token", {
            method: "POST",
            body: JSON.stringify({token: credential})
        })
        const data = await response.json();
        console.log(data);
    }

    return (
        <div className="min-w-3xl max-w-4xl ">
            <Card className="flex flex-col items-center">
                <Tabs defaultValue="sign-up" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="sign-up">Sign up</TabsTrigger>
                        <TabsTrigger value="log-in">Log in</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sign-up">
                        <SignUpFlow/>
                    </TabsContent>
                    <TabsContent value="log-in">
                        Log in
                    </TabsContent>
                </Tabs>
                <CardContent>
                    <Button>Sign up</Button>
                </CardContent>
                Or
                <CardFooter>
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            generateToken(credentialResponse)
                        }}
                        onError={() => {
                            console.log("Login Failed");
                        }}
        
                    />
                </CardFooter>
            </Card>


        </div>
    );
}
