import express from 'express';
import _ from 'lodash';
import Book from '../models/book';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.get('/:id', authenticate, (req, res) => {
    const id = req.params.id;

    Book.query({
        where: { id }
    }).fetch({withRelated: ['votes']})
        .then(book => {
            if(book) {

                let votes = book.related('votes').toJSON();
                votes = _.countBy(votes, 'isPositive' );

                votes = {
                    true: votes.true ? votes.true : 0,
                    false: votes.false ? votes.false : 0
                }

                const total = votes.true - votes.false;

                const response = book.toJSON();
                response.votes = total;

                res.json(response);
            } else res.status(403).json({ errors: { global: 'Brak pozycji' } });
        }); 
});

router.get('/:select/:query', authenticate, (req, res) => {
    const select = req.params.select;
    const query = req.params.query;

    if(select && query) {
        Book.query(function(qb) {
            qb.whereRaw(`LOWER(${select}) LIKE LOWER(?)`, [`%${query}%`])
          }).fetchAll({withRelated: ['votes']})
                .then(books => {
                    if(books) {

                        const response = books.map(item => {
                            let votes = item.related('votes').toJSON();
                            votes = _.countBy(votes, 'isPositive' );
            
                            votes = {
                                true: votes.true ? votes.true : 0,
                                false: votes.false ? votes.false : 0
                            }
            
                            const total = votes.true - votes.false;
            
                            const responseItem = item.toJSON();
                            responseItem.votes = total;

                            return responseItem;
                        })

                        res.json(response);
                    } else res.status(403).json({ errors: { global: 'Brak pozycji' } });
                });
    } else res.status(403).json({ errors: { global: 'Wybierz opcję oraz podaj wartość tekstową' }});
})

export default router;