/* eslint linebreak-style: ["error", "windows"] */

import express from 'express';
import http from 'http';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import dotenv from 'dotenv';
import webpackConfig from '../webpack.config.dev';
import auth from './api/auth';
import users from './api/users';
import books from './api/books';
import librarianUsers from './api/librarian/users';
import librarianBooks from './api/librarian/books';
import votes from './api/votes';
import comments from './api/comments';
import lending from './api/lending';
import openingHours from './api/openingHours';
import librarianComments from './api/librarian/comments';
import librarianLending from './api/librarian/lending';
import librarianOpeningHours from './api/librarian/openingHours';
import librarianMessages from './api/librarian/messages';
import messages from './api/messages';

dotenv.config();
const app = express();
const server = http.Server(app);

const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
    hot: true,
    publicPath: webpackConfig.output.publicPath,
    noInfo: true
}));
app.use(webpackHotMiddleware(compiler));

app.use(express.static('public'));
app.use(bodyParser());
app.use(morgan('dev'));

app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/books', books);
app.use('/api/librarian/users', librarianUsers);
app.use('/api/librarian/books', librarianBooks);
app.use('/api/librarian/comments', librarianComments);
app.use('/api/votes', votes);
app.use('/api/comments', comments);
app.use('/api/lending', lending);
app.use('/api/librarian/lending', librarianLending);
app.use('/api/librarian/openingHours', librarianOpeningHours);
app.use('/api/openingHours', openingHours);
app.use('/api/librarian/messages', librarianMessages);
app.use('/api/messages', messages);

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.set('port', (process.env.PORT || 3000));

server.listen(app.get('port'), () => console.log(`Running on port: ${app.get('port')}`));
