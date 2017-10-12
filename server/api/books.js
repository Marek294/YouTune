import express from 'express';
import Book from '../models/book';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.get('/:select/:query', authenticate, (req, res) => {
    const select = req.params.select;
    const query = req.params.query;

    if(select && query) {
        Book.query(function(qb) {
            qb.whereRaw(`LOWER(${select}) LIKE LOWER(?)`, [`%${query}%`])
          }).fetchAll()
                .then(books => {
                    if(books) {
                        res.json(books);
                    } else res.status(403).json({ errors: { global: 'Brak pozycji' } });
                });
    } else res.status(403).json({ errors: { global: 'Wybierz opcję oraz podaj wartość tekstową' }});
})

export default router;