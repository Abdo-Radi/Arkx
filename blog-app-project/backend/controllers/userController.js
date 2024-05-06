const users = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const register = (req, res) => {
    const data = req.body;

    users.create(data)
        .then((data) => { 
             res.status(201).json({user:data});
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ message: 'Error creating customer', error: error.message });
        })

}
const login = (req, res) => {
    const { email, password } = req.body;
    users.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(404).json({ messsage: 'user not found' })
            }
            if (user.password !== password) {
                return res.status(401).json({ message: 'Incorrect password' })
            }
            const token = jwt.sign({ name: user.name, id: user._id }, process.env.SECRET_KEY);
            return res.status(200).json({ message: 'login successfully!' ,token });
        })
        .catch(error => res.send(error))

}
module.exports = { register, login }