import { NextApiRequest, NextApiResponse } from "next";
import {v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';
import {query} from './db';

const redis = new Redis("redis://localhost:6379")

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    const resumeId = req.query.id;
    const messageId = uuidv4();

    const message = {"messageId": messageId, "resumeId": resumeId}
    
    await redis.lpush("job_queue", JSON.stringify(message));

    res.status(200).send({"status": "success"});

}