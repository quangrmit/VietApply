import { NextApiRequest, NextApiResponse } from "next";
import jwt, { Secret } from 'jsonwebtoken'

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const token = JSON.parse(req.body).token;

    const JWT_KEY = <Secret>process.env.JWT_SECRET 
    // Verify a token
    try {
        const decoded = jwt.verify(token, JWT_KEY);
        // Need to see what is in this decoded thing
        
        // some validation code
        

        console.log('this is decoded', decoded);
        return res.status(200).json({message: "Success", passed: true})
    } catch (error) {
        return res.status(400).json({message: "Invalid token", passed: false})
    }
}