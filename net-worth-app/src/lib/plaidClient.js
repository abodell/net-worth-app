import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

const plaidClient = new PlaidApi(
    new Configuration({
        basePath: PlaidEnvironments[process.env.PLAID_ENV],
        baseOptions: {
            headers: {
                'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
                'PLAID-SECRET': process.env.PLAID_ENV == 'development' ? process.env.PLAID_SECRET_DEVELOPMENT : process.env.PLAID_SECRET_SANDBOX
            }
        }
    })
);

export { plaidClient };