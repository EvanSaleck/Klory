import { Router } from 'express';
import { users } from '../db/schema.js';
import { db } from '../index.js';

const router: Router = Router();

router.post('/', async (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).json({ error: 'Username and email are required' });
    }
    try {
        await db.insert(users).values({ username, email });
        res.json({ message: 'User added successfully' });
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

export default router;