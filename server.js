const express = require('express');
const morgan = require('morgan')

const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();

server.use(express.json()); //built-in middleware


// endpoints
server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} request to ${req.originalUrl}`
  );
  next();
}

module.exports = server;
