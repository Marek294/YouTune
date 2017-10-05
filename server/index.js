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
import librarianUsers from './api/librarian/users';

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
app.use('/api/librarian/users', librarianUsers);

app.get('/*', (req,res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.set('port', (process.env.PORT || 3000));

server.listen(app.get('port'), () => console.log(`Running on port: ${app.get('port')}`));
