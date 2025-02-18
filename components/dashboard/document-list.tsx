"use client";
import { Trash2, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Secular_One } from "next/font/google";
import {
    DialogClose,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
    DialogFooter,
    DialogHeader,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";

interface Document {
    id: string;
    name: string;
}

interface DocumentListProps {
    title: string;
    documents: Document[];
    //   onDelete: (id: string) => void
}

export function DocumentList({ title, documents }: DocumentListProps) {
    const [file, setFile] = useState<File | null>(null);


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]); 
        
        }
    };

    const handleAddResume = async ()  => {
        if (!file) return;

        const formData = new FormData();
        formData.append("pdf", file);

        const response = await fetch("http://localhost:3000/api/upload", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        console.log("Upload response:", data);
    }


    return (
        <div className="rounded-lg bg-zinc-900 p-4">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
                {title} <div className="text-zinc-400">[{documents.length}]</div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant={"outline"}>
                            {" "}
                            <PlusIcon />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Upload a resume</DialogTitle>
                        </DialogHeader>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            {/* <Label htmlFor="picture" className="text-zinc-400">
                                Resume
                            </Label> */}
                            <Input
                                id="picture"
                                type="file"
                                accept="application/pdf"
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
                {documents.map((doc) => (
                    <div
                        key={doc.id}
                        className="flex items-center justify-between rounded-md bg-zinc-800 px-4 py-2"
                    >
                        <span className="text-sm text-zinc-300">{doc.name}</span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:text-red-500"
                            //   onClick={() => onDelete(doc.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}
