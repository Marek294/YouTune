import express from 'express';
import OpeningHours from '../../models/openingHours';
import authenticate from '../../middlewares/authenticate';
import openingHoursValidation from '../../validations/openingHours';

const router = express.Router();

router.post('/', authenticate, (req, res) => {
    const data = req.body;
    const { errors, isValid } = openingHoursValidation(data);

    if(req.currentUser.get('librarian')) {
        if(isValid) {
            const promises = [];

            data.map( item => promises.push( OpeningHours.query({ where: { day: item.day} }).fetch() ) )

            Promise.all(promises)
                .then(values => {
                    values.map( (item, i) => {
                        if(item) {
                            if(data[i].isOpen) {
                                item.set('from', data[i].from)
                                item.set('to', data[i].to)
                            }
                            item.set('isOpen', data[i].isOpen)

                            item.save();
                        } else {
                            if(data.isOpen) {
                                OpeningHours.forge({ day: data[i].day, from: data[i].from, to: data[i].to, isOpen: data[i].isOpen },{ hasTimestamps: true }).save()
                            }
                        }
                    })

                    res.json({ success: true });
                })
                .catch(err => res.status(403).json(err))
        }
        else res.status(403).json(errors);
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
});

export default router;