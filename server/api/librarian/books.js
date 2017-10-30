import express from 'express';
import cloudinary from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import Book from '../../models/book';
import authenticate from '../../middlewares/authenticate';
import bookValidation from '../../validations/book';
import bookUpdateValidation from '../../validations/bookUpdate';

const router = express.Router();
const destination = 'uploads/';
const upload = multer({ dest: destination })

cloudinary.config({ 
    cloud_name: 'mylib', 
    api_key: '585265594829346', 
    api_secret: 'wM32NcYHdigu0uCRsHXvKZ2wDgA' 
  });

function addBook(data, cover, res) {
    Book.forge({ title: data.title, author: data.author, cover: cover.secure_url, summary: data.summary },{ hasTimestamps: true }).save()
    .then(book => {
        res.json({
            book
        });
    })
    .catch(err => {
        res.status(400).json({ errors: err });
    })
}

function updateBook(data, cover, book, res) {
    book.set('title', data.title);
    book.set('author', data.author);
    book.set('cover', cover);
    book.set('summary', data.summary);
    book.save().then(book => res.json({ book }));
}

function extractName(url) {
    return url.substring(url.lastIndexOf('/')+1,url.lastIndexOf('.'));
}

router.post('/', upload.single('cover'), authenticate, (req, res) => {
    const { title, author, summary } = req.body;
    const cover = req.file;

    const data = {
        title,
        author,
        summary
    }

    if(req.currentUser.get('librarian')) {
        const { errors, isValid } = bookValidation(data);
        if(isValid) {
            if(cover) {
                cloudinary.uploader.upload(cover.path, result => { 
                    fs.unlinkSync(cover.path);

                    addBook(data, result, res);
                });
            } else addBook(data, '', res);
        } else res.status(403).json({ errors });
    } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
});

router.put('/', upload.single('cover'), authenticate, (req, res) => {
    const { id, title, author, summary } = req.body;
    const cover = req.file;

    const data = {
        id,
        title,
        author,
        summary
    }

    if(req.currentUser.get('librarian')) {
        const { errors, isValid } = bookUpdateValidation(data);
        if(isValid) {
            Book.query({
                where: { id: data.id }
            }).fetch().then(book => {
                if(book) {
                    if(cover) {
                        cloudinary.v2.uploader.destroy(extractName(book.get('cover'))); 
                        cloudinary.uploader.upload(cover.path, result => { 
                            fs.unlinkSync(cover.path);
        
                            updateBook(data, result.secure_url, book, res);
                        }); 
                    } else updateBook(data, book.get('cover'), book, res);

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
                if(book.get('cover')) cloudinary.v2.uploader.destroy(extractName(book.get('cover')));    
                book.destroy().then(() => { res.json({ success: true }) });
            } else res.status(403).json({ errors: { global: 'Nie ma takiej pozycji' } });
        } else res.status(403).json({ errors: { global: 'Zalogowany użytkownik nie jest pracownikiem' } });
    })
})

export default router;