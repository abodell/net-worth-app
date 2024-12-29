import db from "@/lib/prismadb";

/* 
This API route accepts a user_id and returns the plaid access token for the user
*/

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
    try {
        const { user_id } = req.body
        const user = await db.user.findUnique({
            where: {
                id: user_id
            }
        });
        return res.status(200).json(user.accessToken);
    } catch (err) {
        console.error('Error fetching access token:', err);
        return res.status(404).send(err);
    }
}