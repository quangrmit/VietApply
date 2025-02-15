// import { NextApiRequest, NextApiResponse } from "next";
// import Redis from "ioredis";
// import { v4 as uuidv4 } from "uuid";

// const redis = new Redis("redis://localhost:6379");

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

//     const jobId = uuidv4();
//     const message = `Job-${Math.floor(Math.random() * 1000)}`;

//     // Push to Redis queue
//     await redis.lpush("job_queue", JSON.stringify({ jobId, message }));

//     // Wait for the result
//     let result;
//     for (let i = 0; i < 30; i++) {  // 30 retries
//         result = await redis.get(`result:${jobId}`);
//         if (result) {
//             await redis.del(`result:${jobId}`); // Cleanup
//             return res.status(200).json({ message: result });
//         }
//         await new Promise((resolve) => setTimeout(resolve, 100)); // Wait 0.5 sec
//     }

//     return res.status(408).json({ message: "Job timed out" });
// }
