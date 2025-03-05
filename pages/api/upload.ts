import { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm, Fields, Files } from 'formidable';
import fs from 'fs';
import { query } from './db'; // Assuming your database connection is set up in 'lib/db'

export const config = {
    api: {
        bodyParser: false, // Disable Next.js's body parser for file uploads
    },
};

// Type the function parameters in the form.parse callback
export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }

    const form = new IncomingForm({
        keepExtensions: true, // Keep file extensions intact
    });

    form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
        if (err) {
            return res.status(500).json({ error: 'Error parsing form data' });
        }
        console.log(files);

        // Make sure the file is included in the request
        if (!files.pdf) {
            return res.status(400).json({ error: 'No file uploaded' });
        }
        console.log('Fields:', fields);
        console.log('Files:', files);

        const file = files.pdf[0]; // Assuming file is in an array
        const oriFilename = file.originalFilename;
        const fileBuffer = fs.readFileSync(file.filepath); // Read the file into a buffer

        // Fixing the userId

        try {
            // SQL query to insert file as a BLOB (BYTEA)
            const sql = 'INSERT INTO cvs (filename, data) VALUES ($1, $2) RETURNING id';
            console.log('this is file buffer')
            console.log(fileBuffer);
            const values = [oriFilename, fileBuffer];
            const result = await query(sql, values); // Insert into your PostgreSQL database
            console.log(result)

            return res.json({ message: 'File uploaded successfully', fileId: result[0].id });
        } catch (error) {
            console.error('Database error:', error);
            return res.status(500).json({ error: 'Failed to upload file' });
        }
    });
}



