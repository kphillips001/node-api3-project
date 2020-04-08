const express = require('express');
const morgan = require('morgan')

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter');

const server = express();

// middleware
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {}

module.exports = server;
