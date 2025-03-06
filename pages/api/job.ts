import { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
import { v4 as uuidv4 } from "uuid";
import formidable, { IncomingForm } from "formidable";
import fs from "fs/promises";

export const config = {
    api: {
        bodyParser: false, // Disable Next.js default body parser for file uploads
    },
};

const redis = new Redis("redis://job_queue:6379");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const form = new IncomingForm();

    try {
        // Use a Promise to parse the form data
        const parseForm = () =>
            new Promise<{ fields: formidable.Fields; files: formidable.Files }>((resolve, reject) => {
                form.parse(req, (err, fields, files) => {
                    if (err) reject(err);
                    else resolve({ fields, files });
                });
            });

        const { fields, files } = await parseForm();
        console.log(fields);
        const jobId = uuidv4();
        const message = `Job-${Math.floor(Math.random() * 1000)}`;

        let fileData = null;
        if (files.file) {
            const file = Array.isArray(files.file) ? files.file[0] : files.file;
            const fileBuffer = await fs.readFile(file.filepath);
            fileData = fileBuffer.toString("base64"); // Convert file to Base64
        }

        // Push job to Redis queue
        await redis.lpush("job_queue", JSON.stringify({ jobId, message, fileData }));

        return res.status(200).json({ message: "Job added successfully", jobId });
    } catch (error) {
        console.error("Error processing file:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}