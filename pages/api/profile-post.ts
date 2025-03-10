import { NextApiRequest, NextApiResponse } from "next";
import { query } from "./db"
import { UserData, JwtPayload } from "@/lib/types";
import { generateToken, hashPassword } from "@/lib/utils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("hello post")
    // first step to validation
    if (!req.body) {
        res.status(400).send({ 'message': 'body is required' })
    }

    const userData = <UserData>JSON.parse(req.body);

    // Validation code
    // Maybe not necessary due to client-side validation

    // Password hashing
    userData.password = await hashPassword(userData.password);


    // add user in the db
    const columns = Object.keys(userData).join(', ');
    const values = Object.values(userData);

    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    const sql = `INSERT INTO users (${columns}) VALUES (${placeholders}) RETURNING *;`;
    console.log(sql)
    const result = await query(sql, values);

    console.log('result after posting', result);
    console.log('this is result[0].id', result[0].id);

    // create token
    const payload: JwtPayload = {
        email: userData.email,
        userId: result[0].id, // how to get userId here
        sub: 'VietApply',
        role: 'user'
    }

    const token = generateToken(payload);

    // ------------ Finish generating token --------

    console.log(result);
    // send the token back to the user
    console.log('this is token ', token);

    const response = { token: token };


    return res.status(200).json(response);

}  