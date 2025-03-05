import { NextApiRequest, NextApiResponse } from "next";
import data from '../../lib/cities.json' assert {type: 'json'}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (data) {
        res.status(200).json(data.data.data)
    } else {
        res.status(404).json({ 'message': "data not found" })
    }
}