const express = require('express');
const postModel = require('../models/post');
const getPost = (req,res)=>{
    postModel.find()
    .then((data)=>{res.status(201).send(data);})
    .catch((err)=>{res.status(401).send(err)});
}
const getPostById = (req, res) => {
    const postId = req.params.id; 
    postModel.findById(postId)
        .then((post) => {
            if (post) {
                console.log('Post found:', post);
                res.status(200).send(post);
            } else {
                console.log('Post not found');
                res.status(404).send('Post not found');
            }
        })
        .catch((error) => {
            console.log('Error retrieving post:', error);
            res.status(500).send(error);
        });
};
const addPost= (req,res)=>{
    const data = req.body;
    postModel.create(data)
    .then(mes=>{console.log(mes)})
    .catch(error=>console.log(error));
    res.status(201).send(data);
}
const putPost = (req, res) => {
    const postId = req.params.id;
    const newData = req.body;

    postModel.findByIdAndUpdate(postId, newData, { new: true })
        .then((updatedPost) => {
            if (updatedPost) {
                console.log('Post updated successfully:', updatedPost);
                res.status(200).send(updatedPost);
            } else {
                console.log('Post not found');
                res.status(404).send('Post not found');
            }
        })
        .catch((error) => {
            console.log('Error updating post:', error);
            res.status(500).send(error);
        });
};

const deletePost= (req,res)=>{
    const postId = req.params.id;
    postModel.findByIdAndDelete(postId)
    .then(data => {
        if (data) {
            console.log('Post deleted successfully', data);
            res.status(200).json({ message: 'Post deleted successfully' });
        } else {
            console.log('Post does not exist');
            res.status(404).json({ message: 'Post not found' });
        }
    })
    .catch(error => {
        console.error('Error deleting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    });
}

module.exports = {getPost,addPost,deletePost, getPostById, putPost};