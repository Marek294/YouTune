import express from 'express';
import Messages from '../../models/messages';
import User from '../../models/user';
import messagesValidation from '../../validations/messages';
import authenticate from '../../middlewares/authenticate';

const router = express.Router();

router.get('/all', authenticate, (req, res) => {

    if(req.currentUser.get('librarian')) {
        Messages.query({
            where: { senderId: req.currentUser.get('id') },
            andWhere: { senderDelete: false }
        }).fetchAll({withRelated: ['receiver']})
            .then(messages => {
                if(messages) {
                    res.json(messages);
                } else res.status(403).json({ errors: { global: 'Brak wiadomości' } });
            });
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
})

router.get('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    if(req.currentUser.get('librarian')) {
        Messages.query({
            where: { id },
            andWhere: { senderId: req.currentUser.get('id') }
        }).fetch({withRelated: ['receiver']})
            .then(message => {
                if(message) {
                    res.json(message);
                } else res.status(403).json({ errors: { global: 'Brak wiadomości' } });
            });
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
})

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

router.delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    if(req.currentUser.get('librarian')) {
        Messages.query({
            where: { id },
            andWhere: { senderId: req.currentUser.get('id') }
        }).fetch()
            .then(message => {
                if(message) {
                    if(!message.get('senderDelete')) {
                        if(message.get('receiverDelete')) message.destroy().then(() => { res.json({ success: true }) });
                        else {
                            message.set('senderDelete', true);
                            message.save().then(() => { res.json({ success: true }) });
                        }
                    } else res.status(403).json({ errors: { global: 'Brak wiadomości' } });
                } else res.status(403).json({ errors: { global: 'Brak wiadomości' } });
            });
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
})

export default router;