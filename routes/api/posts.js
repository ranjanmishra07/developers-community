const express = require("express");
const router = express();
const passport = require('passport')
const mongoose = require('mongoose');
const Post = require('../../models/posts');
const validatePostInput = require('../../validator/posts');
//@route GET api/profile/posts
//@desc  Tests Posts Route
//@access public
router.get("/test", (req, res) => {
  res.json({ msg: "posts works" });
});

router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  const { isValid, errors } = validatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors)
  }
  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  })
  newPost.save().then(post => res.json(post))

});

router.get('/', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(e => res.status(404).send("nopost found"))
})

router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
    .sort({ date: -1 })
    .then(post => res.json(post))
    .catch(e => res.status(404).send("nopost found"))
})

router.delete('/', (req, res) => {

})

router.post("posts/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile({ user: req.user.id }).then(profile => {
    Post.findById(req.params.id).then(post => {
      if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
        res.status(400).send('not able to like')
      }
      post.likes.unshift({ user: req.user.id });
      post.save().then(post => res.json(post))
    })
  })

});

module.exports = router;
