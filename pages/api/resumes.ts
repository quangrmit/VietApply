import { NextApiRequest, NextApiResponse } from "next";
import {query} from "./db";


export default async function handler (req: NextApiRequest, res: NextApiResponse){
    // Fetch all resumes, and put them in an array

        const sql = 'SELECT * from cvs';
        // const values = [fileId];
        const result = await query(sql);

        res.status(200).send(result);

}