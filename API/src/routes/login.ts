import { Router } from 'express';
import { users } from '../db/schema.js';
import { db } from '../index.js';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcrypt';
import * as jose from 'jose'; // Import jose

const router: Router = Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const SECRET_KEY = new TextEncoder().encode(
            process.env.JWT_SECRET);

            
        const [user] = await db.select()
            .from(users)
            .where(
                or(eq(users.email, email), eq(users.username, email))
            )
            .limit(1);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = await new jose.SignJWT({ userID: user.userID })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(SECRET_KEY);

        res.status(201).json({
            message: 'Session created',
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Login failed' });
    }
});

export default router;