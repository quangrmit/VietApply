import { NextApiRequest, NextApiResponse } from "next";
import { query } from "./db";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const fileId = req.query.id;
    console.log("this is the id", fileId);

    const sql = 'SELECT data from cvs WHERE id = $1';
    const values = [fileId];
    const result = await query(sql, values);

    if (result.length === 0) {
        return res.status(404).send("PDF not found");
    }

    const pdfBuffer = result[0].data; // BLOB data
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="file-${fileId}.pdf"`);
    res.send(pdfBuffer);

}