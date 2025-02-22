import { NextApiRequest, NextApiResponse } from "next";
import {query} from './db'

export default async function handler (req: NextApiRequest, res: NextApiResponse){
    const sql = "SELECT * FROM users"
}