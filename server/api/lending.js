import express from 'express';
import Lending from '../models/lending';
import LendingHistory from '../models/lendingHistory';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
    Lending.query({
        where: { userId: req.currentUser.get('id') }
    }).fetchAll()
        .then(lending => {
            res.json({ lending });
        })
})

router.get('/history', authenticate, (req, res) => {
    LendingHistory.query({
        where: { userId: req.currentUser.get('id') }
    }).fetchAll()
        .then(lendingHistory => {
            res.json({ lendingHistory });
        })
})

export default router;