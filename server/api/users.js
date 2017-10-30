import express from 'express';
import bcrypt from 'bcrypt';
import multer from 'multer';
import fs from 'fs';
import cloudinary from 'cloudinary';
import User from '../models/user';
import signupValidation from '../validations/signup';
import updateDataValidation from '../validations/updateData';
import updatePasswordValidation from '../validations/updatePassword';
import { sendConfirmationEmail } from '../mailer';
import { generateJWT, toAuthJSON } from '../utils';
import authenticate from '../middlewares/authenticate';

const router = express.Router();
const destination = 'uploads/';
const upload = multer({ dest: destination })

cloudinary.config({ 
    cloud_name: 'mylib', 
    api_key: '585265594829346', 
    api_secret: 'wM32NcYHdigu0uCRsHXvKZ2wDgA' 
  });

function extractName(url) {
    return url.substring(url.lastIndexOf('/')+1,url.lastIndexOf('.'));
}

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

router.put('/avatar', upload.single('avatar'), authenticate, (req, res) => {
    const avatar = req.file

    if(avatar) {
        cloudinary.uploader.upload(avatar.path, result => { 
            fs.unlinkSync(avatar.path);

            User.query({
                where: { id: req.currentUser.id }
            }).fetch().then(user => {
                if(user) {
                    if(user.get('avatar')) cloudinary.v2.uploader.destroy(extractName(user.get('avatar')));

                    user.set('avatar', result.secure_url);
                    user.save().then(savedUser => res.json({ user: savedUser }));
    
                } else res.status(403).json({ errors: { global: "Użytkownik nie istnieje"} });
            })
        });
    } else {
        res.status(400).json({ errors: { global: "Brak pliku do przesłania" }})
    }
})

router.get('/currentUser', authenticate, (req, res) => {
    User.query({
        where: { id: req.currentUser.id }
    }).fetch({ columns: ['firstname', 'lastname', 'created_at', 'avatar']}).then(user => {
        if(user) {
            res.json({ user });
        } else res.status(403).json({ errors: { global: "Użytkownik nie istnieje"} });
    })
})

router.put('/updateData', authenticate, (req, res) => {
    const { data } = req.body;
    const { errors, isValid } = updateDataValidation(data);
    if(isValid) {
        User.query({
            where: { id: req.currentUser.id }
        }).fetch().then(user => {
            if(user) {
                user.set('firstname', data.firstname);
                user.set('lastname', data.lastname);
                user.save().then(() => res.json({ success: true  }));

            } else res.status(403).json({ errors: { global: "Użytkownik nie istnieje"} });
        })
    } else res.status(403).json({ errors });
})

router.put('/updatePassword', authenticate, (req, res) => {
    const { data } = req.body;
    const { errors, isValid } = updatePasswordValidation(data);
    if(isValid) {
        User.query({
            where: { id: req.currentUser.id }
        }).fetch().then(user => {
            if(user) {
                const password_digest = bcrypt.hashSync(data.password,10);
                
                user.set('password_digest', password_digest);

                user.save().then(() => res.json({ success: true  }));
                
            } else res.status(403).json({ errors: { global: "Użytkownik nie istnieje"} });
        })
    } else res.status(403).json({ errors });
})

export default router;