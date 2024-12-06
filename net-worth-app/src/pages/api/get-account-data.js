import db from '@/lib/prismadb'

/* 
Accepts a user id
*/

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const id = req.body.id
    
    if (!id) {
        return res.status(400).json({
            error: "User ID is required"
        })
    }

    

}