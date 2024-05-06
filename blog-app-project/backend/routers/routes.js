const express = require('express');
const userRouter = express.Router();
const {register,login} = require('../controllers/userController')

userRouter.post('/register',register)
.post('/login',login) 
module.exports = userRouter;
