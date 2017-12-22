import express from 'express';
import Messages from '../models/messages';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.get('/all', authenticate, (req, res) => {

    Messages.query({
        where: { receiverId: req.currentUser.get('id') },
        andWhere: { receiverDelete: false }
    }).fetchAll({withRelated: ['sender']})
        .then(messages => {
            if(messages) {
                res.json(messages);
            } else res.status(403).json({ errors: { global: 'Brak wiadomości' } });
        });
})

router.get('/countNewMessages', authenticate, (req, res) => {
    Messages.query(function(qb) {
        qb.where('receiverId', req.currentUser.get('id'));
        qb.where('isReaded', false);
        qb.where('receiverDelete', false);
      }).count()
        .then(numberOfNewMessages => {
            res.json({ numberOfNewMessages });
        });
})

router.get('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    Messages.query({
        where: { id },
        andWhere: { receiverId: req.currentUser.get('id') }
    }).fetch({withRelated: ['sender']})
        .then(message => {
            if(message) {
                if(!message.get('isReaded')) {
                    message.set('isReaded', true);
                    message.save();
                }
                res.json(message);
            } else res.status(403).json({ errors: { global: 'Brak wiadomości' } });
        });
})

router.delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    Messages.query({
        where: { id },
        andWhere: { receiverId: req.currentUser.get('id') }
    }).fetch()
        .then(message => {
            if(message) {
                message.destroy().then(() => { res.json({ success: true }) });
            } else res.status(403).json({ errors: { global: 'Brak wiadomości' } });
        });
})

export default router;