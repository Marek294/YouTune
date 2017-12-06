import express from 'express';
import Lending from '../../models/lending';
import Book from '../../models/book';
import User from '../../models/user';
import LendingHistory from '../../models/lendingHistory';
import lendingValidation from '../../validations/lending';
import authenticate from '../../middlewares/authenticate';

const router = express.Router();

function isValidDate(dateString)
{
    // First check for the pattern
    if(!/^\d{4}-\d{1,2}-\d{1,2}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    const parts = dateString.split("-");
    const day = parseInt(parts[2], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[0], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month === 0 || month > 12)
        return false;

    const monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

function date(dateParam) {
    if(isValidDate(dateParam)) {
        const parts = dateParam.split('-');
        parts[2] = parseInt(parts[2], 10) + 1;

        return new Date(`${parts[0]}/${parts[1]}/${parts[2]}`);
    }
    
    return null;
};

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

router.get('/history/book/:id/:page/:initialDateString/:finalDateString', authenticate, (req, res) => {
    const { id, page, initialDateString, finalDateString } = req.params;

    const initialDate = date(initialDateString);
    const finalDate = date(finalDateString);

    if(req.currentUser.get('librarian')) {
    if(initialDate && finalDate) {
        LendingHistory.query(function(qb) {
            qb.whereBetween('created_at', [initialDate, finalDate]);
            qb.where('bookId', id);
          }).orderBy('created_at', 'DESC').fetchPage({page, pageSize: 10, withRelated: ['user']})
            .then(lendingHistory => {
                res.json(lendingHistory);
            })
    } else {
        LendingHistory.query({
            where: { bookId: id }
        }).orderBy('created_at', 'DESC').fetchPage({page, pageSize: 10, withRelated: ['user']})
            .then(lendingHistory => {
                res.json(lendingHistory);
            })
    }
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
})

router.post('/', authenticate, (req, res) => {
    const { data } = req.body;
    const { errors, isValid } = lendingValidation(data);

    if(isValid) {
        if(req.currentUser.get('librarian')) {

            const p1 = Book.where('id', 'IN', data.bookIds).fetchAll();

            const p2 = User.query({ where: { id: data.userId } }).fetch();

            Promise.all([p1, p2]).then(values => {
                if(values[0]) {
                    if(values[1]) {
                        const pAll = values[0].map(item => {
                            if(item.get('availability')) {
                                item.set('availability', false);
                                item.save();
                                return Lending.forge({ userId: data.userId, bookId: item.id, status: 'lent' },{ hasTimestamps: true }).save()
                            }
                        })

                        Promise.all(pAll).then(lendings => {
                            res.json(lendings);
                        })
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