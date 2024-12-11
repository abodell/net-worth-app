import db from '@/lib/prismadb'
import { plaidClient } from '../../lib/plaidClient'

/*
Accepts a user id
*/

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    const id = req.body.id

    if (!id) {
        return res.status(400).json({
            error: "User ID is required"
        })
    }

    // have to get the access token from the database
    const { accessToken } = await db.user.findUnique({
        where: {
            id: id
        },
        select: {
            accessToken: true
        }
    });

    if (!accessToken) {
        throw new Error('User has not connected their bank account!')
    }

    // get the data from plaid and save it to the user
    try {
        const plaidReq = {
            access_token: accessToken
        }
        const plaidResponse = await plaidClient.accountsBalanceGet(plaidReq)

        for (let account of plaidResponse.data.accounts) {
            const insert_account = await db.account.create({
                data: {
                    userID: id,
                    name: account.name,
                    balance: account.balances.current,
                    type: account.subtype
                }
            });

            return res.status(200).json(insert_account)
        }

    } catch (err) {
        return res.status(500).send(err)
    }
}