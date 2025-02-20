import { NextApiRequest, NextApiResponse } from "next";
import {query} from './db';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id;

    const sql = 'DELETE FROM cvs WHERE id = $1;';
    const values = [id];
    const result = await query(sql, values);
    console.log(result);

    return res.status(200).json(result);
}