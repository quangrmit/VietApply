import useAuth from "@/hooks/use-auth";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/app/layout";
import {useRouter} from "next/navigation";

export default function LogOutBtn() {
    const router = useRouter();
    const { setLoggedIn } = useContext(AuthContext)

    const handleLogOut = () => {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
        router.push('/')
    };

    return (
        <Button variant="destructive" onClick={handleLogOut}>
            Log out
        </Button>
    );
}
