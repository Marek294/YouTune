import express from 'express';
import cloudinary from 'cloudinary';
import axios from 'axios';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import Book from '../../models/book';
import authenticate from '../../middlewares/authenticate';
import bookValidation from '../../validations/book';
import bookUpdateValidation from '../../validations/bookUpdate';

const router = express.Router();
const upload = multer({ dest: 'uploads/' })

cloudinary.config({ 
    cloud_name: 'mylib', 
    api_key: '585265594829346', 
    api_secret: 'wM32NcYHdigu0uCRsHXvKZ2wDgA' 
  });

function fileUploadMiddleware(req, res) {
    cloudinary.uploader.upload_stream((result) => {
      axios({
        url: '/api/upload', //API endpoint that needs file URL from CDN
        method: 'post',
        data: {
          url: result.secure_url,
          name: req.body.name,
          description: req.body.description,
        },
      }).then((response) => {
        res.status(200).json(response.data.data);
      }).catch((error) => {
        res.status(500).json(error.response.data);
      });
    }).end(req.file.buffer);
  }

router.post('/upload', upload.single('cover'), (req, res) => {
    const { previousUploadedFilePath } = req.body;

    if(previousUploadedFilePath) {
        const deletePath = path.join(__dirname, '../../../', previousUploadedFilePath)
        fs.unlinkSync(deletePath);
    }
    res.json({ file: req.file });
})

router.post('/', authenticate, (req, res) => {
    const { data } = req.body;
    console.log(req.files);

    cloudinary.uploader.upload(data.file, function(result) { 
        console.log(result);
      });
      res.json({});
    // if(req.currentUser.get('librarian')) {
    //     const { errors, isValid } = bookValidation(data);
    //     if(isValid) {
    //         Book.forge({ title: data.title, author: data.author, cover: data.cover, summary: data.summary },{ hasTimestamps: true }).save()
    //             .then(book => {
    //                 res.json({
    //                     book
    //                 });
    //             })
    //             .catch(err => {
    //                 res.status(400).json({ errors: err });
    //             })

    //     } else res.status(403).json({ errors });
    // } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
});

router.put('/', authenticate, (req, res) => {
    const { data } = req.body;
    if(req.currentUser.get('librarian')) {
        const { errors, isValid } = bookUpdateValidation(data);
        if(isValid) {
        Book.query({
            where: { id: data.id }
        }).fetch().then(book => {
            if(book) {
                book.set('title', data.title);
                book.set('author', data.author);
                book.set('cover', data.cover);
                book.set('summary', data.summary);
                book.save().then(() => res.json({ success: true }));

            } else res.status(403).json({ errors: { global: "Pozycja nie istnieje"} });
        })

        } else res.status(403).json({ errors });
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
});

router.delete('/:id', authenticate, (req, res) => {
    const deleteBookId = req.params.id;
    
    Book.query({
        where: { id: deleteBookId }
    }).fetch().then(book => {
        if(req.currentUser.get('librarian')) {
            if(book) {          
                book.destroy().then(() => res.json({ success: true }));
            } else res.status(403).json({ errors: { global: 'Nie ma takiej pozycji' } });
        } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
    })
})

export default router;