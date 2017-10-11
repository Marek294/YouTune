import express from 'express';
import Book from '../models/book';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
    const select = req.query.select;
    const query = req.query.query;

    if(select && query) {
        // Book.query({
        //     where: { [select]: query }
        // }).fetch().then(books => {
        //     if(books) {
        //         res.json(books);
        //     } else res.status(403).json({ errors: { global: 'Brak pozycji' } });
        // })

        Book.query(function(qb) {
            qb.whereRaw(`LOWER(?) LIKE LOWER(?)`, [`${select}`, `%${query}%`]) //Blad 
          }).fetch()
            .then(books => {
                if(books) {
                    res.json(books);
                } else res.status(403).json({ errors: { global: 'Brak pozycji' } });
            });
    } else res.status(403).json({ errors: { global: 'Wybierz opcję oraz podaj wartość tekstową' }});
})

export default router;