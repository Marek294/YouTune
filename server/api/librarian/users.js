import express from 'express';
import User from '../../models/user';
import authenticate from '../../middlewares/authenticate';

const router = express.Router();

router.get('/', authenticate, (req, res) => {
    const getLibrarian = User.query({
        where: {
            id: req.currentUser.id,
            librarian: true
        }
    }).fetch();

    const query = User.fetchAll({columns: ['firstname', 'lastname', 'email', 'confirmed']});

    Promise.all([ getLibrarian, query ]).then(values => {
        if(values[0]) {
            res.json(values[1]);
        } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } })
    });
});

export default router;