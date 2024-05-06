const express = require('express');
const {authorisation} = require('../middelware/middelware')
const postRouter = express.Router();
const {getPost,addPost,deletePost, getPostById, putPost} = require('../controllers/postcontrollers');


postRouter.get('/',  getPost)
.get('/:id', getPostById)
.post('/newer', addPost)
.put('/:id', putPost)
.delete('/:id', deletePost);


module.exports = postRouter