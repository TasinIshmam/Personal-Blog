const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');

const app = new express();

let port = 3000;

app.use(express.static('public'));
app.use(expressEdge);
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});

app.get('/post', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/post.html'));
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});