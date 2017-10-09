import express from 'express';
import Book from '../models/user';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
    // do zrobienia
    res.json({ });
})

export default router;