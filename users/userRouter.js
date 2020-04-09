const express = require('express');

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(item => {
      res.status(201).json(req.body);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'There was an error while saving the new user.',
        error: err
      });
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  Posts.insert(req.body)
    .then(item => {
      res.status(201).json(req.body)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "There was an error while creating the new post.",
        error: err
      })
    });
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
    .then(item => {
      res.status(200).json(item)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'The user information could not be retrieved. ',
        error: err
      });
    });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.user.id)
    .then(item => {
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({
          message: 'The user with the specified ID does not exist'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'The user information could not be retrieved. ',
        error: err
      });
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  const { id } = req.params;
  console.log(id);
  
  Users.getUserPosts(id)
    .then(item => {
      if (item.length > 0) {
        res.status(200).json(item);
      } else {
        res.status(404).json({
          message: 'There are no posts for this user yet!'
        })
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'The user information could not be retrieved. ',
        error: err
      });
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.user.id)
    .then(removed => {
      res.status(200).json(req.user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'The user could not be deleted',
        error: err
      })
    })
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // do your magic!
  Users.update(req.user.id, req.body)
    .then(item => {
      res.status(200).json(req.body)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "The user could not be updated.",
        error: err
      })
    })
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