const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const groupController = require('./controllers/groups');
const pageController = require('./controllers/pages');
const postController = require('./controllers/posts');
const userController = require('./controllers/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.connect('mongodb://localhost:27017/facebook');
mongoose.connection.on('error', (error) => console.error(error));
mongoose.connection.on('open', () => console.log("Success in connecting to mongodb"));

app.post('/api/v1/users', userController.postNewUser);
app.get('/api/v1/users', userController.getAllUsers);
app.get('/api/v1/users/:id', userController.getUserById);
app.put('/api/v1/users/:id', userController.updateUserById);
app.delete('/api/v1/users/:id', userController.deleteUserById);

app.post('/api/v1/groups', groupController.postNewGroup);
app.get('/api/v1/groups', groupController.getAllGroups);
app.get('/api/v1/groups/:id', groupController.getGroupById);
app.put('/api/v1/groups/:id', groupController.updateGroupById);
app.delete('/api/v1/groups/:id', groupController.deleteGroupById);

app.post('/api/v1/posts', postController.postNewPost);
app.get('/api/v1/posts', postController.getAllPosts);
app.get('/api/v1/posts/:id', postController.getPostById);
app.put('/api/v1/posts/:id', postController.updatePostById);
app.delete('/api/v1/posts/:id', postController.deletePostById);

app.post('/api/v1/pages', pageController.postNewPage);
app.get('/api/v1/pages', pageController.getAllPages);
app.get('/api/v1/pages/:id', pageController.getPageById);
app.put('/api/v1/pages/:id', pageController.updatePageById);
app.delete('/api/v1/pages/:id', pageController.deletePageById);

module.exports = app;
