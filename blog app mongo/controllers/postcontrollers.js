const express = require('express');
const postModel = require('../models/post');
const getPost = (req,res)=>{
    postModel.find()
    .then((data)=>{res.status(201).send(data);})
    .catch((err)=>{res.status(401).send(err)});
}
const addPost= (req,res)=>{
    const data = req.body;
    postModel.create(data)
    .then(mes=>{console.log(mes)})
    .catch(error=>console.log(error));
    res.status(201).send(data);
}

const deletePost= (req,res)=>{
    const title = req.body.title;
    postModel.findOneAndDelete(title)
     .then(data=>{
        if(data)console.log('data deleted successfully',data);
        else console.log('data doese not existe');
     })
     .catch(error=>console.log(error));
}

module.exports = {getPost,addPost,deletePost};