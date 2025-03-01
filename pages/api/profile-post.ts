import { NextApiRequest, NextApiResponse } from "next";
import { query } from "./db"
import jwt, { Secret } from 'jsonwebtoken'
import { UserData, JwtPayload } from "@/lib/types";
import { hashPassword } from "@/lib/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    // first step to validation
    if (!req.body) {
        res.status(400).send({ 'message': 'body is required' })
    }

    const userData = <UserData>(req.body); 

    // Validation code

    // Password hashing
    userData.password =  await hashPassword(userData.password);


    // add user in the db
    const columns = Object.keys(userData).join(', ');
    const values = Object.values(userData);

    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    const sql = `INSERT INTO users (${columns}) VALUES (${placeholders}) RETURNING *;`;
    const result = await query(sql, values);


    // create token
    const payload: JwtPayload = {
        email: userData.email,
        role: 'user'
    }

    const secret = <Secret>process.env.JWT_SECRET;
    const token = jwt.sign(
        payload,
        secret,            // secret key
        { expiresIn: '100h' }                // options
    );
    // ------------ Finish generating token --------

    console.log(result);
    // send the token back to the user
    console.log('this is token ', token);

    const response = {token: token};


    return res.status(200).json(response);







}  