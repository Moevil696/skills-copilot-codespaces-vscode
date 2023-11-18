// Create web server
// Create a route to get all comments
// Create a route to get all comments by post id
// Create a route to create a comment
// Create a route to update a comment
// Create a route to delete a comment
// Create a route to delete all comments by post id

const express = require('express');
const router = express.Router();
const comments = require('../data/comments');
const posts = require('../data/posts');

router.get('/', async (req, res) => {
  try {
    const allComments = await comments.getAllComments();
    res.json(allComments);
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {
  try {
    const comment = await comments.getCommentById(req.params.id);
    res.json(comment);
  } catch (e) {
    res.status(404).json({ error: 'Comment not found' });
  }
});

router.post('/', async (req, res) => {
  const commentData = req.body;
  if (!commentData.name || !commentData.comment || !commentData.postId) {
    res.status(400).json({ error: 'You must provide all fields' });
    return;
  }
  try {
    await posts.getPostById(commentData.postId);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  try {
    const newComment = await comments.addComment(
      commentData.name,
      commentData.comment,
      commentData.postId
    );
    res.json(newComment);
  } catch (e) {
    res.status(500).send();
  }
});

router.put('/:id', async (req, res) => {
  const commentData = req.body;
  if (!commentData.name || !commentData.comment || !commentData.postId) {
    res.status(400).json({ error: 'You must provide all fields' });
    return;
  }
  try {
    await posts.getPostById(commentData.postId);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  try {
    await comments.getCommentById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Comment not found' });
    return;