import express from 'express';
import Messages from '../../models/messages';
import User from '../../models/user';
import messagesValidation from '../../validations/messages';
import authenticate from '../../middlewares/authenticate';

const router = express.Router();

router.post('/', authenticate, (req, res) => {
    const { data } = req.body;
    const { errors, isValid } = messagesValidation(data);

    if(req.currentUser.get('librarian')) {
        if(isValid) {
            const { receiverId, title, body } = data;
            const senderId = req.currentUser.get('id')

            if(parseInt(senderId, 10) !== parseInt(receiverId, 10)) {
                User.query({
                    where: { id: receiverId }
                }).fetch().then(user => {
                    if(user) {
                        
                        Messages.forge({ senderId, receiverId, title, body },{ hasTimestamps: true }).save()
                            .then(message => {
                                res.json({
                                    message
                                });
                            })
                            .catch(err => {
                                res.status(400).json({ errors: err });
                            })

                    } else res.status(403).json({ errors: { global: 'Odbiorca nie istnieje' } });
                })
            } else res.status(403).json({ errors: { global: 'Nie można wysłać wiadomości do samego siebie' } });

        } else res.status(403).json({ errors });
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
})

export default router;