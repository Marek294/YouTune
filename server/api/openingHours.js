import express from 'express';
import OpeningHours from '../models/openingHours';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
    OpeningHours.fetchAll()
        .then(openingHours => {
            res.json(openingHours);
        })
});

export default router;