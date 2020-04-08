const express = require('express');
const morgan = require('morgan')

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();

server.use(express.json()); //built-in middleware

// middleware
server.use(morgan('dev'));

// endpoints
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {}

module.exports = server;
