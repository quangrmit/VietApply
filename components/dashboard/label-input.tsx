import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { ProfileData } from "@/lib/types";
import clsx from 'clsx';


type LabelInputProps = {
    className?: string;
    elementId: string;
    labelText: string;
    inputValue: string;
    inputOnchange: (field: keyof ProfileData, newValue: string) => void;
    placeholder?: string;
};

export default function LabelInput({
    className,
    elementId,
    labelText,
    inputValue,
    inputOnchange,
    placeholder,
}: LabelInputProps) {
    return (
        <div className={clsx("space-y-2", className )}>
            <Label htmlFor={elementId} className="">
                {labelText}
            </Label>
            <Input
                id={elementId}
                value={inputValue}
                onChange={(e) => inputOnchange(elementId as keyof ProfileData, e.target.value)}
                className=" border-zinc-500  disabled:opacity-100 hover:bg-accent"
            />
        </div>
    );
}
