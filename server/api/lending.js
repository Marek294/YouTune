import express from 'express';
import Lending from '../models/lending';
import LendingHistory from '../models/lendingHistory';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
    Lending.query({
        where: { userId: req.currentUser.get('id') }
    }).fetchAll({withRelated: ['book']})
        .then(lending => {
            res.json(lending);
        })
})

router.get('/historyCount', authenticate, (req, res) => {
    LendingHistory.query({
        where: { userId: req.currentUser.get('id') }
    }).fetchAll()
        .then(lendingHistory => {
            res.json({ lendingHistory: lendingHistory.length });
        })
})

export default router;