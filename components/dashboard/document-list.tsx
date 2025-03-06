"use client";
import { Trash2, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DialogClose,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogHeader,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useContext, useEffect, useState } from "react";
import { ResumeContext } from "@/app/layout";


interface DocumentListProps {
    title: string;
    //   onDelete: (id: string) => void
}

export function DocumentList({ title }: DocumentListProps) {
    const [file, setFile] = useState<File | null>(null);

    const { resumes, fetchResumes } = useContext(ResumeContext);


    useEffect(() => {
        fetchResumes();
    }, []);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const handleAddResume = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("pdf", file);

        const response = await fetch("http://localhost:3000/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log("Upload response:", data);
        fetchResumes();
    };


    const onDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/delete-cv?id=${id}`)
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);

        }
        fetchResumes();
    }


    return (
        <div className="rounded-lg bg-zinc-900 p-4">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
                {title} <div className="text-zinc-400">[{resumes.length}]</div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"outline"}>
                            <PlusIcon />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-80">
                        <DialogHeader>
                            <DialogTitle>Upload a resume</DialogTitle>
                        </DialogHeader>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            {/* <Label htmlFor="picture" className="text-zinc-400">
                                Resume
                            </Label> */}
                            <Input
                                // id="picture"
                                type="file"
                                accept="application/pdf"
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" onClick={handleAddResume}>
                                    Add Resume
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </h2>
            <div className="h-[300px] space-y-2 overflow-y-auto scrollbar-thin scrollbar-track-zinc-800 scrollbar-thumb-zinc-700 pr-2">
                {resumes.map((doc) => (
                    <div
                        key={doc.id}
                        className="flex items-center justify-between rounded-md bg-zinc-800 px-4 py-2"
                    >
                        <Dialog>
                            <DialogTrigger>
                                <span
                                    className="text-sm text-zinc-300 hover:underline hover:cursor-pointer"

                                >
                                    {doc.filename}
                                </span>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                                <DialogTitle>{doc.filename}</DialogTitle>
                                <iframe
                                    src={`http://localhost:3000/api/preview?id=${doc.id}`}
                                    width="100%"
                                    height="400px"
                                />
                            </DialogContent>
                        </Dialog>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:text-red-500"
                            onClick={() => onDelete(doc.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
