import express from 'express';
import Lending from '../models/lending';
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

export default router;