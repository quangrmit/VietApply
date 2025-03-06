import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from 'uuid';
import Redis from 'ioredis';

const redis = new Redis("redis://job_queue:6379")

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const resumeId = req.query.id;
    const messageId = uuidv4();

    const message = { "messageId": messageId, "resumeId": resumeId }

    await redis.lpush("job_queue", JSON.stringify(message));

    const timeout = Date.now() + 5000; // Wait for maximum 5 seconds
    while (true) {
        if (Date.now() > timeout) {
            break;
        }
        const status = await redis.hget(messageId, "status");
        if (status == "complete") {
            const result = await redis.hget(messageId, "result");
            // await redis.del(messageId)
            res.status(200).send({ "status": "success", "data": result })
            return;
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
    }
    res.status(500).send({ "status": "failed", "message": "timeout" });
    return;
}