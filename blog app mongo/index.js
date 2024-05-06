const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')
const userRouter = require('./routers/routes')
const postRouter = require('./routers/postRouter')
mongoose.connect('mongodb://localhost:27017/dbtest')
 .then(()=>{console.log('database connected')})
 .catch((error)=>{console.log(error)})

app.use(express.json());
app.use('/users',userRouter);
app.use('/post',postRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port : ${PORT}.`)
} )