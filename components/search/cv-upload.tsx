import { Label } from "../ui/label"
import { Input } from "../ui/input"

export default function CVUpload() {

    

    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="picture" className="text-zinc-400">Resume</Label>
        <Input id="picture" type="file" />
    </div>
    )
}