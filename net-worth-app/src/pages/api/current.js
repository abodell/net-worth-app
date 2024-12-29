import serverAuth from "@/lib/serverAuth";

// this API route fetches the current user's information

export default async function handler( req, res ) {
    if (req.method !== 'GET') {
        return res.status(405).end();
    }
    try {
        const { currentUser } = await serverAuth(req, res);
        return res.status(200).json({
            id: currentUser.id,
            name: currentUser.name,
            hasAccessToken: currentUser.accessToken ? true : false
        });
    } catch (err) {
        console.log(err);
        return res.status(400).end();
    }
}