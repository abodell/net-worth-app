import { plaidClient } from '../../lib/plaidClient'

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  try {
    const linkResponse = await plaidClient.linkTokenCreate({
      user: {
        client_user_id: process.env.PLAID_CLIENT_ID
      },
      client_name: 'Net Worth App',
      language: 'en',
      products: ['transactions', 'auth'],
      country_codes: [process.env.PLAID_COUNTRY_CODES],
      redirect_uri: process.env.PLAID_REDIRECT_URI
    });
    return res.status(200).json(linkResponse.data);
  } catch (err) {
    return res.status(500).send(err);
  }
}