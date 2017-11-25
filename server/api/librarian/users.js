import express from 'express';
import User from '../../models/user';
import authenticate from '../../middlewares/authenticate';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
    User.fetchAll({columns: ['id', 'firstname', 'lastname', 'email', 'confirmed', 'avatar']}).then(users => {
        if(req.currentUser.get('librarian')) {
            if(users) {
                res.json(users);
            } else res.status(403).json({ errors: { global: 'Brak czytelników' } });
        } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
    })
});

router.get('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    User.query({
        where: { id }
    }).fetch().then(user => {
        if(req.currentUser.get('librarian')) {
            if(user) {
                res.json(user);
            } else res.status(403).json({ errors: { global: 'Brak użytkownika' } });
        } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
    })
});

router.post('/search', authenticate, (req, res) => {
    const { firstname, lastname } = req.body.data;

    if(req.currentUser.get('librarian')) {
        if(firstname || lastname) {
            User.query(function(qb) {
                if(firstname) qb.whereRaw(`LOWER(firstname) LIKE LOWER(?)`, [`%${firstname}%`])
                if(lastname) qb.whereRaw(`LOWER(lastname) LIKE LOWER(?)`, [`%${lastname}%`])
            }).fetchAll()
                    .then(users => {
                        if(users) {
                            res.json(users);
                        } else res.status(403).json({ errors: { global: 'Brak czytelników' } });
                    });
        } else res.status(403).json({ errors: { global: 'Podaj imię, nazwisko poszukiwanego czytelnika' }});
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
})

router.delete('/:id', authenticate, (req, res) => {
    const deleteUserId = req.params.id;

    User.query({
        where: { id: deleteUserId }
    }).fetch().then(user => {
        if(req.currentUser.get('librarian')) {
            if(user && req.currentUser.get('id') !== user.get('id')) {
                
                user.destroy().then(() => res.json({ success: true }));

            } else res.status(403).json({ errors: { global: 'Nie ma takiego czytelnika' } });
        } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
    })
})

export default router;