import db from '@/lib/prismadb'

/* 
Accepts an access token and a user id and saves the access token to the associated user in the database
*/

export default async function handler(req, res) {
    if (req.method !== "PUT") {
        res.setHeader("Allow", ["PUT"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const user_id = req.body.user_id
        const accessToken = req.body.access_token
        // save the access token to the user record so we can use it in the future
        await db.user.update({
            where: {id: user_id},
            data: {
                accessToken: accessToken
            }
        });
        return res.status(200).json({"message": "Access token saved successfully!"})
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}
