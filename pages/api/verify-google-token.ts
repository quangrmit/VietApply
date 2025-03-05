import { NextApiRequest, NextApiResponse } from "next";
import { OAuth2Client } from 'google-auth-library';
import { Underdog } from "next/font/google";
import { OauthPayloadChecks } from "@/lib/utils";


const CLIENT_ID = "125849592219-nbou4ddqnl4vdjn3smsff8huqfbmsvot.apps.googleusercontent.com"

const client = new OAuth2Client(CLIENT_ID);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const parsedBody = JSON.parse(req.body);
    const token = parsedBody.token;
    console.log(token);


    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });

    const payload = ticket.getPayload();


    // important checks 
    const shouldPass = OauthPayloadChecks(payload, CLIENT_ID);

    if (!shouldPass.status) {
        return res.json( {
            message: shouldPass.message
        })
    }


    return res.json(payload)

}