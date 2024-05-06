const express = require('express');
const {authorisation} = require('../middelware/middelware')
const postRouter = express.Router();
const {getPost,addPost,deletePost} = require('../controllers/postcontrollers');


postRouter.get('/',authorisation,  getPost)
.post('/newer',authorisation, addPost)
.delete('/:title',authorisation, deletePost);


module.exports = postRouter