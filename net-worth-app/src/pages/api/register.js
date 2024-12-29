import bycrpt from 'bcrypt'

import db from '@/lib/prismadb'

// this API route registers a new user in the database with the provided email, name, and password

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    try {
        const { email, name, password } = req.body;

        const hashedPassword = await bycrpt.hash(password, 12);

        const user = await db.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        });

        return res.status(200).json(user);

    } catch (err) {
        console.log(err);
        return res.status(400).end();
    }
}