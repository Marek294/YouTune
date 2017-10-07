import express from 'express';
import User from '../../models/user';
import authenticate from '../../middlewares/authenticate';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
    User.fetchAll({columns: ['id', 'firstname', 'lastname', 'email', 'confirmed']}).then(users => {
        if(req.currentUser.get('librarian')) {
            if(users) {
                res.json(users);
            } else res.status(403).json({ errors: { global: 'Brak czytelników' } });
        } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
    })
});

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