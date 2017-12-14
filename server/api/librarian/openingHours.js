import express from 'express';
import OpeningHours from '../../models/openingHours';
import authenticate from '../../middlewares/authenticate';
import openingHoursValidation from '../../validations/openingHours';

const router = express.Router();

router.post('/', authenticate, (req, res) => {
    const data = req.body;
    const { errors, isValid } = openingHoursValidation(data);

    if(req.currentUser.get('librarian')) {
        if(isValid)
            OpeningHours.query({ where: { day: data.day} }).fetch()
            .then(day => {
                if(day) {
                    if(data.isOpen) {
                        day.set('from', data.from)
                        day.set('to', data.to)
                    }
                    day.set('isOpen', data.isOpen)

                    day.save().then(() => res.json(day))
                } else {
                    if(data.isOpen) {
                        OpeningHours.forge({ day: data.day, from: data.from, to: data.to, isOpen: data.isOpen },{ hasTimestamps: true }).save()
                        .then(day => {
                            res.json(day);
                        })
                        .catch(err => {
                            res.status(400).json({ errors: err });
                        })
                    }
                }
                
            })
        else res.status(403).json(errors);
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
});

export default router;