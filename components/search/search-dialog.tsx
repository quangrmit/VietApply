"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CVUpload from "./cv-upload";
import { useRouter } from "next/navigation";
import CVSelect from "./cv-select";
import { useContext, useEffect } from "react";
import { ResumeContext } from "@/app/layout";

export default function SearchDialog() {
    const router = useRouter();
    const { selectedResume } = useContext(ResumeContext);

    useEffect(() => {
        console.log("selected changed");
        console.log(selectedResume);
    }, [selectedResume]);

    const handleSearch = async () => {
        // Extract key words from user prompt

        // Extract embedding of the CV

        // Run the search op (have some state to render the search page)
        const response = await fetch(`/api/search?id=${selectedResume?.id}`);
        const data = await response.json();
        console.log(data);

        // Reroute to the main page to display search results
        router.push("/");

        // Maybe set some state for the main page to do loading
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className=" bg-sky-700 hover:bg-sky-600 ">
                    Search job
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Search Job</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="upload" className="w-[400px]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="upload">Upload a resume</TabsTrigger>
                        <TabsTrigger value="choose">Choose from profile</TabsTrigger>
                    </TabsList>
                    <TabsContent value="choose">
                        <CVSelect />
                    </TabsContent>
                    <TabsContent value="upload">
                        <CVUpload />
                    </TabsContent>
                </Tabs>

                <DialogTitle>Preferences</DialogTitle>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Preferences
                        </Label>
                        <Textarea />
                    </div>
                </div>

                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button onClick={handleSearch}>Search</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
