import express from 'express';
import Comment from '../models/comment';
import commentValidation from '../validations/comment';
import authenticate from '../middlewares/authenticate';

const router = express.Router();

router.get('/:bookId/:page', authenticate, (req, res) => {
    const { bookId, page } = req.params;
    
    Comment.query({
        where: { bookId }
    }).orderBy('created_at', 'DESC')
      .fetchPage({page, pageSize: 5, withRelated: ['user']}).then(comments => {
        let hasMore = true;
        if(comments.pagination.pageCount <= page) hasMore = false;

        const response = {
            comments,
            hasMore
        }

        res.json( response );
    })
})

router.post('/', authenticate, (req, res) => {
    const { data } = req.body;
    const { errors, isValid } = commentValidation(data);

    if(isValid) {
        Comment.forge({ userId: req.currentUser.get('id'), bookId: data.bookId, text: data.text },{ hasTimestamps: true }).save()
            .then(comment => {
                res.json({ comment });
            })
        .catch(err => res.status(400).json({ errors: err }))
    } else res.status(403).json({ errors });
})

router.delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    Comment.query({
        where: { id },
        andWhere: { userId: req.currentUser.get('id') }
    }).fetch().then(comment => {

        if(comment) {
            comment.destroy()
                .then(() => res.json({ success: true }))
                .catch(err => res.status(400).json({ errors: err }))
        } else res.status(403).json({ errors: { global: "Brak uprawnień do usunięcia tego komentarza lub komentarz już nie istnieje" }})

    })
})

export default router;