import { NextApiRequest, NextApiResponse } from "next";
import { query } from "./db"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = JSON.parse(req.body);

    // first step to validation
    if (!data){
        res.status(400).send({'message': 'body is required'})
    }

    const columns = Object.keys(data).join(', '); 
    const values = Object.values(data);


    const placeholders = values.map((_, i) => `$${i + 1}`).join(', '); 
    const sql = `INSERT INTO users (${columns}) VALUES (${placeholders}) RETURNING *;`;
    console.log(sql);
    const result = await query(sql, values);
    console.log(result);

    return res.status(200).json(result);

}  