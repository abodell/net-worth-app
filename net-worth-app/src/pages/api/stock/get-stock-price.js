import axios from 'axios';

export default async function handler(req, res) {
    console.log(process.env.DATABASE_URL)
    const alphaURL = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${req.body.symbol}&apikey=${process.env.ALPHA_VANTAGE_KEY}`;
    const stockPrice = await axios.get(alphaURL);
    return res.status(200).json(stockPrice.data)
}