const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyParser.json());

const commentsByPostId = {};



app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id]);
});

app.post('/posts/:id/comments', (req, res) => {
    const { id }  = req.params;
    const {content } = req.body;
    const commentId = randomBytes(4).toString('hex');

    const comments = commentsByPostId[id] || [];
    comments.push({ id: commentId, content});
    commentsByPostId[id] = comments;

    res.status(201).send(commentsByPostId);
});

app.listen(4002, () => {
    console.log('listening on port 4002');
});