const jwt = require('jsonwebtoken');
require('dotenv').config();

const authorisation = (req,res,next)=>{
    const TOKEN = req.headers.authorisation;
    if(TOKEN){
        jwt.verify(TOKEN, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(401).json({message: 'Invalid token'});
            }
            req.user = decoded;
            next();
        });
    }else {
        return res.status(401).json({message: 'No token provided'});
    }
    }

module.exports = {authorisation};