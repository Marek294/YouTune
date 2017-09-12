import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import signupValidation from '../validations/signup';

const router = express.Router();

router.post('/', (req, res) => {
    const { errors, isValid } = signupValidation(req.body);
    if(isValid) {
        const { email, password } = req.body;
        const password_digest = bcrypt.hashSync(password,10);

        User.forge({ email, password_digest },{ hasTimestamps: true }).save()
            .then(user => {
                const token = jwt.sign({
                    email: user.get('email')
                }, process.env.JWT_SECRET );

                res.json({ user: {
                    email: user.get('email'),
                    token }
                });
            })
            .catch(err => {
                if(err.constraint === 'users_email_unique') res.status(400).json({ errors: { global: "Istnieje już użytkownik o takim adresie email"}})
                else res.status(400).json({ errors: err });
            })

    } else res.status(403).json({ errors });
});

export default router;