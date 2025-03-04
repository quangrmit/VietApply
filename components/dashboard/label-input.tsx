import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ProfileData } from "@/lib/types";

type LabelInputProps = {
    elementId: string;
    labelText: string;
    inputValue: string;
    inputOnchange: (field: keyof ProfileData, newValue: string) => void;
    placeholder?: string;
};

export default function LabelInput({
    elementId,
    labelText,
    inputValue,
    inputOnchange,
    placeholder,
}: LabelInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={elementId} className="text-zinc-400">
                {labelText}
            </Label>
            <Input
                id={elementId}
                value={inputValue}
                onChange={(e) => inputOnchange(elementId as keyof ProfileData, e.target.value)}
                className=" text-zinc-100  disabled:opacity-100 hover:bg-accent"
            />
        </div>
    );
}
