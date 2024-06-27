import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

const plaidClient = new PlaidApi(
    new Configuration({
        basePath: PlaidEnvironments[process.env.PLAID_ENV],
        baseOptions: {
            headers: {
                'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
                'PLAID-SECRET': process.env.PLAID_ENV == 'production' ? process.env.PLAID_SECRET_PRODUCTION : process.env.PLAID_SECRET_SANDBOX
            }
        }
    })
);

export { plaidClient };