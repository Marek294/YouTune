import express from 'express';
import Vote from '../models/vote';
import voteValidation from '../validations/vote';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.get('/:bookId', authenticate, (req, res) => {
    const { bookId } = req.params;

    Vote.query({
        where: { userId: req.currentUser.get('id') },
        andWhere: { bookId }
    }).fetch().then(vote => {
        res.json({ vote });
    })

});

router.post('/', authenticate, (req, res) => {
    const { data } = req.body;
    const { errors, isValid } = voteValidation(data);

    if(isValid) {
        
        Vote.query({
            where: { userId: req.currentUser.get('id') },
            andWhere: { bookId: data.bookId }
        }).fetch().then(vote => {
            if(vote) {
                if( vote.get('isPositive') == data.isPositive ) vote.destroy().then(() => res.json({}));
                else {
                    vote.set('isPositive', data.isPositive);
                    vote.save();
                    res.json({ vote });
                }
            }
            else {
                Vote.forge({ userId: req.currentUser.get('id'), bookId: data.bookId, isPositive: data.isPositive },{ hasTimestamps: true }).save()
                .then(newVote => {
                    res.json({ vote: newVote });
                })
                .catch(err => res.status(400).json({ errors: err }))
            }
        })

    } else res.status(403).json({ errors });
})

export default router;