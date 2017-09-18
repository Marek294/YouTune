/* eslint linebreak-style: ["error", "windows"] */

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import User from '../models/user';
import { generateJWT, generateResetPasswordJWT, toAuthJSON } from '../utils';
import { sendConfirmationEmail, sendResetPasswordEmail } from '../mailer';

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

router.post('/sendConfirmationEmail', (req, res) => {
    const { data } = req.body;
    User.query({
        where: { email: data.email},
        andWhere: { confirmed: false }
    }).fetch().then(user => {
        if(user) {
            const confirmationToken = generateJWT(user);
            
            user.set('confirmationToken', confirmationToken);
            user.set('confirmed', false);
            user.save();

            sendConfirmationEmail(user);

            res.json({
                user: toAuthJSON(user)
            });
        } else res.status(403).json({ errors: { global: 'Adres email został już zweryfikowany, bądź nie istnieje' } });
    })
})

router.post('/resetPasswordRequest', (req, res) => {
    const { email } = req.body;
    User.query({
        where: { email }
    }).fetch().then(user => {
        if(user) {
            const resetPasswordToken = generateResetPasswordJWT(user);
            
            user.set('resetPasswordToken', resetPasswordToken);

            sendResetPasswordEmail(user);

            res.json({ });
        } else res.status(400).json({ errors: { global: 'Adres email nie istnieje' } });
    })
})

router.post('/validateToken', (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
        if(err) {
            res.status(401).json({ })
        } else {
            res.json({ });
        }
    });
})

router.post('/resetPassword', (req ,res) => {
    const { password, token } = req.body.data;
    
    jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
        if(err) {
            res.status(401).json({ errors: { global: "Sesja wygasła" }})
        } else {
            User.query({
                where: { email: decoded.email}
            }).fetch().then(user => {
                if(user) {
                    const password_digest = bcrypt.hashSync(password,10);

                    user.set('password_digest', password_digest);
                    user.save().then(() => res.json({ }));

                } else res.status(403).json({ errors: { global: 'Użytkownik nie istnieje' } });
            })
        }
    });
})

export default router;