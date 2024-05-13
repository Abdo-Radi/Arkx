const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
process.env.TOKEN_SECRET;
app.post('/login',(req,res)=>{
  const user = {id : 123};
  const token = jwt.sign({user : user.id} , process.env.TOKEN_SECRET, {expiresIn : '2h'});
  res.json({token});
})
function ensureToken(req, res, next){
  const bareerHeader = req.headers['authorization'];
  if(typeof bareerHeader !== 'undefined'){
    const bareerToken = bareerHeader.split(' ')[1];
    req.token = bareerToken;
    next();
  }else{
    res.sendStatus(403);
  }
}

app.get('/protected',ensureToken,(req,res)=>{
  jwt.verify(req.token,process.env.TOKEN_SECRET,(err,data)=>{
    if(err){
      res.sendStatus(403);
    }else{
      res.json({data});
    }
  })
})



app.listen(3000,()=>{
  console.log('Server is running on port 3000');
})
