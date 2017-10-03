import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user';
import signupValidation from '../validations/signup';
import { sendConfirmationEmail } from '../mailer';
import { generateJWT, toAuthJSON } from '../utils';

const router = express.Router();

router.get('/', (req, res) => {
    User.fetchAll({columns: ['firstname', 'lastname', 'email', 'confirmed']}).then(users => {
        res.json({users});
    })
});

router.post('/', (req, res) => {
    const { data } = req.body;
    const { errors, isValid } = signupValidation(data);
    if(isValid) {
        const password_digest = bcrypt.hashSync(data.password,10);

        User.forge({ firstname: data.firstname, lastname: data.lastname, email: data.email, password_digest },{ hasTimestamps: true }).save()
            .then(user => {
                user.set('confirmed', false);
                
                const token = generateJWT(user);

                const confirmationToken = generateJWT(user);

                user.set('confirmationToken', confirmationToken);
                user.save();

                sendConfirmationEmail(user);

                res.json({
                    user: toAuthJSON(user,token)
                });
            })
            .catch(err => {
                if(err.constraint === 'users_email_unique') res.status(400).json({ errors: { global: "Istnieje już użytkownik o takim adresie email"}})
                else res.status(400).json({ errors: err });
            })

    } else res.status(403).json({ errors });
});

export default router;