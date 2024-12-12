import db from '@/lib/prismadb'

/* 
Accepts a user id
*/

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const id = req.body.id;
    
    if (!id) {
        return res.status(400).json({
            error: "User ID is required"
        })
    }

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    try {
        const data = await db.account.findMany({
            where: {
                userID: id,
                createdAt: {
                    gte: thirtyDaysAgo
                }
            },
            select: {
                balance: true,
                createdAt: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return res.status(200).json(data);

    } catch (err) {
        return res.status(500).send(err)
    }
}