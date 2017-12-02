import express from 'express';
import Comment from '../../models/comment';
import authenticate from '../../middlewares/authenticate';

const router = express.Router();

router.delete('/:id', authenticate, (req, res) => {
    const { id } = req.params;

    Comment.query({
        where: { id }
    }).fetch().then(comment => {
        if(comment && req.currentUser.get('librarian')) {
            comment.destroy()
                .then(() => res.json({ success: true }))
                .catch(err => res.status(400).json({ errors: err }))
        } else res.status(403).json({ errors: { global: "Brak uprawnień do usunięcia tego komentarza lub komentarz już nie istnieje" }})

    })
})

export default router;