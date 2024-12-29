import db from '@/lib/prismadb'

/* 
Accepts a user id and returns the user's account balance for the last 30 days
*/

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader("Allow", ["GET"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const id = req.query.id;
    
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
                createdAt: 'asc'
            }
        });

        // Group the data by the date, ignoring the time value
        const groupByDate = data.reduce((acc, record) => {
            const date = record.createdAt.toISOString().split('T')[0]
            if (!acc[date] || acc[date].createdAt < record.createdAt) {
                acc[date] = record
            }
            return acc
        }, {})

        const latestRecordPerDay = Object.values(groupByDate)

        return res.status(200).json(latestRecordPerDay);

    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}