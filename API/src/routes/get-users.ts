import { Router } from 'express';
import { users } from '../db/schema.js';
import { db } from '../index.js';

const router: Router = Router();

router.get('/', async (req, res) => {
    try {
        const allUsers = await db.select().from(users);
        res.json(allUsers);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

export default router;