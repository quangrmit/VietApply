import { NextApiRequest, NextApiResponse } from "next";
import { query } from "./db";
import jwt, { Secret } from 'jsonwebtoken'
import { JwtPayload } from "@/lib/types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Fetch all resumes, and put them in an 
    const token = req.query.token as string;
    if (!token) return res.status(400).json({message: "no token"})

    const JWT_KEY = <Secret> process.env.JWT_SECRET;
    const decoded = jwt.verify(token, JWT_KEY) as JwtPayload
    console.log('this is decoded', decoded)
    const userId = decoded.userId;



    const sql = 'SELECT * from cvs WHERE user_id = $1';
    const values = [userId];
    const result = await query(sql, values);
    if (result.length == 0) {
        console.log('no resumes found')
    }

    res.status(200).send(result);

}