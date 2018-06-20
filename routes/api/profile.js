const express = require("express");
const router = express();
const mongoose = require('mongoose');
const passport = require("passport");

//load user and profile model
const User = require("../../models/User");
const Profile = require("../../models/profile");

//@route GET api/profile/test
//@desc  Tests Profile Route
//@access public
router.get("/test", (req, res) => {
  res.json({ msg: "profile works" });
});

//@route GET api/profile
//@desc  Get current user profile 
//@access Private
router.get("/", passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id }).then(profile => {
    if (!profile) {
      errors.noprofile = "There is no profile";
      res.status(404).json(errors);
    }
    res.json(profile);
  }).catch(e => res.send(e));
})

module.exports = router;
