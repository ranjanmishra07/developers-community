const express = require("express");
const router = express();
const mongoose = require('mongoose');
const passport = require("passport");

//load user and profile model
const User = require("../../models/User");
const Profile = require("../../models/profile");
const validateProfileInput = require("../../validator/profile");
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
});

//@route GET api/profile/handle/:handle
//@desc  Get  user profile by handle
//@access Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there are no profile";
        res.status(404).json(errors)
      }
      else {
        res.json(profile)
      }
    }
    ).catch(e => res.send(e));
})
//@route GET api/profile/user/:user_id
//@desc  Get  user by user id 
//@access Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "there are no profile";
        res.status(404).json(errors)
      }
      else {
        res.json(profile)
      }
    }
    ).catch(e => res.send("invalid profile id"));
})

//@route GET api/profile/all
//@desc  Get  all user profiles 
//@access Public
router.get("/all", (req, res) => {
  const errors = {};
  Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = "there are no profiles";
        res.status(404).json(errors)
      }
      else {
        res.json(profiles)
      }
    }
    ).catch(e => res.send("invalid profile id"));
})

//@route POST api/profile
//@desc  create or update current user profile 
//@access Private
router.post("/", passport.authenticate('jwt', { session: false }), (req, res) => {

  //validation
  const { errors, isValid } = validateProfileInput(req.body);
  //check validation
  if (!isValid) {
    //return any errors with 400 status
    res.status(400).json(errors);
  }


  const profileFields = {};
  profileFields.user = req.user.id;
  if (req.body.handle) profileFields.handle = req.body.handle;
  if (req.body.company) profileFields.company = req.body.company;
  if (req.body.website) profileFields.website = req.body.website;
  if (req.body.status) profileFields.status = req.body.status;
  if (req.body.location) profileFields.location = req.body.location;
  if (req.body.bio) profileFields.bio = req.body.bio;
  if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;

  //skills--split into array
  if (typeof req.body.skills !== "undefined") {
    profileFields.skills = req.body.skills.split(',');
  }
  //social
  profileFields.social = {}
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

  Profile.findOne({ user: req.user.id }).then(profile => {
    if (profile) {
      //update
      Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then(profile => {
        res.json(profile)
      })
    } else {
      //create

      //check if handle exists
      Profile.findOne({ handle: profileFields.handle }).then(profile => {
        if (profile) {
          errors.handle = "handle already exists with that profile"
          res.status(400).json(errors);
        }
        //save the new profile
        new Profile(profileFields).save().then(profile => { res.json(profile) });
      }).catch(e => { res.send(e) })
    }
  }).catch(e => res.send(e));
});


module.exports = router;
