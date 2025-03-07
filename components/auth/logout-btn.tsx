import useAuth from "@/hooks/use-auth";
import { Button } from "../ui/button";
import { useContext } from "react";
import { AuthContext } from "@/app/layout";

export default function LogOutBtn() {
    const { setLoggedIn } = useContext(AuthContext)

    const handleLogOut = () => {
        localStorage.removeItem("jwt");
        setLoggedIn(false);
    };

    return (
        <Button variant="destructive" onClick={handleLogOut}>
            Log out
        </Button>
    );
}
