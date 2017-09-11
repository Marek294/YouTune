/* eslint linebreak-style: ["error", "windows"] */

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user';

const router = express.Router();

router.post('/', (req, res) => {
    const credentials = req.body;
    User.query({
        where: { email: credentials.email}
    }).fetch().then(user => {
        if(user) {
            if(bcrypt.compareSync(credentials.password,user.get('password_digest'))) {

                const token = jwt.sign({
                    email: user.get('email')
                }, process.env.JWT_SECRET );

                res.json({ user: {
                    email: user.get('email'),
                    token }
                });

            } else res.status(403).json({ errors: { global: 'Invalid authentication' } });
        } else res.status(403).json({ errors: { global: 'Invalid authentication' } });
    })
});

export default router;