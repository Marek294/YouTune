import express from 'express';
import Book from '../../models/book';
import authenticate from '../../middlewares/authenticate';
import bookValidation from '../../validations/book';
import bookUpdateValidation from '../../validations/bookUpdate';

const router = express.Router();

router.post('/', authenticate, (req, res) => {
    const { data } = req.body;
    if(req.currentUser.get('librarian')) {
        const { errors, isValid } = bookValidation(data);
        if(isValid) {
            Book.forge({ title: data.title, author: data.author, cover: data.cover },{ hasTimestamps: true }).save()
                .then(book => {
                    res.json({
                        book
                    });
                })
                .catch(err => {
                    res.status(400).json({ errors: err });
                })

        } else res.status(403).json({ errors });
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
});

router.put('/', authenticate, (req, res) => {
    const { data } = req.body;
    if(req.currentUser.get('librarian')) {
        const { errors, isValid } = bookUpdateValidation(data);
        if(isValid) {
        Book.query({
            where: { id: data.id }
        }).fetch().then(book => {
            if(book) {
                book.set('title', data.title);
                book.set('author', data.author);
                book.set('cover', data.cover);
                book.save().then(() => res.json({ success: true  }));

            } else res.status(403).json({ errors: { global: "Pozycja nie istnieje"} });
        })

        } else res.status(403).json({ errors });
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
});

router.delete('/:id', authenticate, (req, res) => {
    const deleteBookId = req.params.id;
    
    Book.query({
        where: { id: deleteBookId }
    }).fetch().then(book => {
        if(req.currentUser.get('librarian')) {
            if(book) {          
                book.destroy().then(() => res.json({ success: true }));
            } else res.status(403).json({ errors: { global: 'Nie ma takiej pozycji' } });
        } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
    })
})

export default router;