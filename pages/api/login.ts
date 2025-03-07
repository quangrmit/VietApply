import { NextApiRequest, NextApiResponse } from "next";
import { generateToken, verifyPassword } from "@/lib/utils";
import { JwtPayload, LoginData } from "@/lib/types";
import { query } from "./db";



export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (!req.body){
        return res.status(400).json({message: "Body is required"})
    }

    const loginData = <LoginData>JSON.parse(req.body);
    console.log("this is login data", loginData)
    const email = loginData.email;
    const password = loginData.password
    
    // get hashed password by email

    const sql = 'SELECT password, id FROM users WHERE email = $1';
    const values = [email];
    const result = await query(sql, values);

    // error handling if there is no email in the db
    if (result.length == 0){
        return res.status(404).json({message: "Email not found"})
    }

    const hashedPassword = result[0].password;

    // compare the plain password to the hashed one
    const shouldAuth = verifyPassword(password, hashedPassword);
    
    if (!shouldAuth){
        return res.status(401).json({message: 'Invalid password'})
    }

    // should return a jwt here
    // should include the user id as well, or create an index for email for faster retrieval
    const payload : JwtPayload = {
        email: email,
        userId: result[0].id,
        role: 'user',
        sub: 'VietApply'
    }
    const token = generateToken(payload)

    return res.status(200).json({message: "Successful login", token: token})

}