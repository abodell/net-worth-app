import { plaidClient } from '../../lib/plaidClient'

// this API route is used to exchange the public token for an access token in the Plaid Link Flow
export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    const publicToken = req.body.public_token;
    try {
        const response = await plaidClient.itemPublicTokenExchange({
            public_token: publicToken
        });
        const accessToken = response.data.access_token; // store in database
        const itemID = response.data.item_id;
        return res.status(200).json({access_token: accessToken});
    } catch (err) {
        return res.status(500).send(err);
    }
}