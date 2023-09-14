import { plaidClient } from '../../lib/plaidClient'

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        const accessToken = req.body.access_token;
        const plaidRequest = {
            access_token: accessToken
        };
        const plaidResponse = await plaidClient.authGet(plaidRequest);
        res.status(200).json(plaidResponse.data);
    } catch (err) {
        res.status(500).send(err);
    }
}