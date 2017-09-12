/* eslint linebreak-style: ["error", "windows"] */

import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import { generateJWT, toAuthJSON } from '../utils';

const router = express.Router();

router.post('/', (req, res) => {
    const { credentials } = req.body;
    User.query({
        where: { email: credentials.email}
    }).fetch().then(user => {
        if(user) {
            if(bcrypt.compareSync(credentials.password,user.get('password_digest'))) {

                const token = generateJWT(user);

                res.json({
                    user: toAuthJSON(user,token)
                });

            } else res.status(403).json({ errors: { global: 'Podano złe hasło bądź adres email' } });
        } else res.status(403).json({ errors: { global: 'Podano złe hasło bądź adres email' } });
    })
});

router.post('/confirmation', (req, res) => {
    const confirmationToken = req.body.token;

    User.query({
        where: { confirmationToken }
    }).fetch().then(user => {
        if(user) {
            user.set('confirmationToken', '');
            user.set('confirmed', true);

            user.save();

            const token = generateJWT(user);

            res.json({
                user: toAuthJSON(user,token)
            });
        } else res.status(403).json({ errors: { global: 'Link jest nieaktywny' } });
    })
});

export default router;