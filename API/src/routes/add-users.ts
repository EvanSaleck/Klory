import { Router } from 'express';
import { users } from '../db/schema.js';
import { db } from '../index.js';
import bcrypt from 'bcrypt';
const saltrounds = 12;

const router: Router = Router();

router.post('/', async (req, res) => {
    const { username, email, password, name, lastname, weight, height, birthdate } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltrounds);

        await db.insert(users).values({ 
            username, 
            email, 
            password: hashedPassword, 
            name: name || "", 
            lastname: lastname || "", 
            weight: weight || "", 
            height: height || "", 
            birthdate: birthdate || "" 
        });

        res.json({ message: 'User added successfully' });
    } catch (error) {
        console.error(error); // Good to log the error to console for debugging
        res.status(500).json({ error: 'Failed to create user' });
    }
});

export default router;