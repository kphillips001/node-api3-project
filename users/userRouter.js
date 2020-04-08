const express = require('express');

const router = express.Router();

const Users = require("./userDb.js");
const Posts = require("../posts/postDb");

router.post('/', (req, res) => {
  // do your magic!
  userdb.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    console.log('Error', err);
    res.status(500).json({ error: "There was an error creating a user." })
  })
});

router.post('/:id/posts', (req, res) => {
  const postId = req.params.id
  const postInfo = {...req.body, user_id, postId}
  // do your magic!
  posts.db.insert(postInfo)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    console.log('Error', err);
    res.status(500).json({ error: "There was an error creating a post." })
  })
});

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;

  Users.getById(id)
    .then(item => {
      if (item) {
        req.user = item;
        next();
      } else {
        res.status(400).json({ 
          message: "invalid user id" 
        });
      };
    });
};

function validateUser(req, res, next) {
  const body = req.body;
  const name = req.body.name;

  if (!body) {
    res.status(400).json({ message: "missing user data" });
  } else if (!name || name === "") {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next();
  };
};

function validatePost(req, res, next) {
  // do your magic!
  const body = req.body;
  const text = req.body.text;
  const { id } = req.params;

  if (!body) {
    res.status(400).json({ message: "missing post data" });
  } else if (!text || text === "") {
    res.status(400).json({ message: "missing required text field" });
  } else if (!body.user_id == id) {
    res.status(400).json({
      message: "User_id does not match."
    })
  } else {
    next();
  };
};

module.exports = router;