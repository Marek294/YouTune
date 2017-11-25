import express from 'express';
import Lending from '../../models/lending';
import Book from '../../models/book';
import User from '../../models/user';
import LendingHistory from '../../models/lendingHistory';
import lendingValidation from '../../validations/lending';
import authenticate from '../../middlewares/authenticate';

const router = express.Router();

router.get('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    if(req.currentUser.get('librarian')) {
        Lending.query({
            where: { userId: id }
        }).fetchAll({withRelated: ['book']})
            .then(lending => {
                res.json(lending);
            })
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
})

router.get('/history/:id', authenticate, (req, res) => {
    const { id } = req.params;

    if(req.currentUser.get('librarian')) {
        LendingHistory.query({
            where: { userId: id }
        }).orderBy('created_at', 'DESC').fetchAll({withRelated: ['book']})
            .then(lendingHistory => {
                res.json(lendingHistory);
            })
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
})

router.post('/', authenticate, (req, res) => {
    const { data } = req.body;
    const { errors, isValid } = lendingValidation(data);

    if(isValid) {
        if(req.currentUser.get('librarian')) {

            const p1 = Book.query({ where: { id: data.bookId } }).fetch();

            const p2 = User.query({ where: { id: data.userId } }).fetch();

            Promise.all([p1, p2]).then(values => {
                if(values[0]) {
                    if(values[1]) {
                        if(values[0].get('availability')) {
                            Lending.forge({ userId: data.userId, bookId: data.bookId, status: 'lent' },{ hasTimestamps: true }).save()
                            .then(lend => {
                                values[0].set('availability', false);
                                values[0].save();
                                res.json(lend);
                            })
                            .catch(err => res.status(400).json({ errors: err }))
                        } else res.status(403).json({ errors: { global: 'Pozycja została już wypożyczona' } });
                    } else res.status(403).json({ errors: { global: 'Brak użytkownika' } });
                } else res.status(403).json({ errors: { global: 'Brak pozycji' } });
            })

        } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
    } else res.status(403).json({ errors });
})

router.put('/return', authenticate, (req, res) => {
    const { id } = req.body;

    if(req.currentUser.get('librarian')) {
        
        Lending.query({
            where: { id }
        }).fetch().then(lend => {
            lend.set('status', 'returned');

            Book.query({
                where: { id: lend.get('bookId') }
            }).fetch().then(book => {
                if(book) {
                    LendingHistory.forge({ userId: lend.get('userId'), bookId: lend.get('bookId'), status: lend.get('status'), lent: lend.get('created_at') },{ hasTimestamps: true }).save()
                    .then(lendHistory => {
                        book.set('availability', true);
                        book.save();

                        lend.destroy();

                        lendHistory.set('book', book);

                        res.json(lendHistory);
                    })
                    .catch(err => res.status(400).json({ errors: err }))
                }
                else res.status(403).json({ errors: { global: 'Brak pozycji' } });
            })
        })

    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });

    
})

export default router;