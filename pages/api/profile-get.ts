import { NextApiRequest, NextApiResponse } from "next";
import {query} from './db'
import jwt , {Secret}from 'jsonwebtoken'
import { JwtPayload } from "@/lib/types";

export default async function handler (req: NextApiRequest, res: NextApiResponse){

    // some validation is required
    const token = req.query.token as string;
    if(!token){
        return res.status(400).json({message: "No token"})
    }
    const JWT_KEY = <Secret>process.env.JWT_SECRET

    const decoded = jwt.verify(token,JWT_KEY ) as JwtPayload
    const email = decoded.email;

    const sql = "SELECT firstName, middleName, lastName, dateOfBirth, email, phone, location, minSalary, maxSalary, jobType, about FROM users WHERE email = $1";
    const values = [email]
    const result = await query(sql, values);
    
    if (result.length == 0) {
        return res.status(404).json({message: "Email not found"})
    }
    return res.status(200).json(result[0])

}