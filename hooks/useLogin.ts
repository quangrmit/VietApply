import { useState, useEffect } from "react"


export default function useLogin() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);

    const verifyToken = async (token: string) => {
        const reqBody = { token: token }
        const response = await fetch("http://localhost:3000/api/verify-token", {
            method: "POST",
            body: JSON.stringify(reqBody)
        })
        const data = await response.json();

        // if the token passes verification
        if (data.passed) {
            // setLoggedIn = true
            setLoggedIn(true)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("jwt");
        // we have to verify the token as well
        if (token) {
            // verify the token 
            verifyToken(token);
        }
    }, [])

    return { loggedIn, setLoggedIn }
}