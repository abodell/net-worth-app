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
        console.log(plaidResponse.data.accounts)
    } catch (err) {
        return res.status(500).send(err)
    }

    // loop through the accounts and save the Account Name and the current balance
    // we need to add an accounts model to our schema
    // then we will save each account and the name, connected to the user, the current value of the account, and the time it was fetched
    // this way we can pull value for each account, and show total accounts value

}