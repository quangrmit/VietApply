import { Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SignUpFlow from "./sign-up-flow";
import LoginForm from "./login-form";

export default function LoginSignup() {

    return (
        <Card className="w-[50vw] mt-10 flex flex-col gap-5 border-none ">
            <Tabs defaultValue="sign-up">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="sign-up">Sign up</TabsTrigger>
                    <TabsTrigger value="log-in">Log in</TabsTrigger>
                </TabsList>
                <TabsContent value="sign-up">
                    <SignUpFlow />
                </TabsContent>
                <TabsContent value="log-in" className="stable-scrollbar">
                    <LoginForm />
                </TabsContent>
            </Tabs>
        </Card>
    );
}
