const express = require("express");
const router = express();
const mongoose = require('mongoose');
const passport = require("passport");

//load user and profile model
const User = require("../../models/User");
const Profile = require("../../models/profile");
const validateProfileInput = require("../../validator/profile");
const validateExperienceInput = require("../../validator/experience");
const validateEducationInput = require("../../validator/education");
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
        res.json(`${profiles}`);
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

//@route POST api/profile/experience
//@desc  create experience within profile
//@access Private
router.post("/experience", passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body);
  //check validation
  if (!isValid) {
    //return any errors with 400 status
    res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      //add to exp array
      profile.experience.unshift(newExp);
      profile.save().then(profile => res.json(profile))
    })
})

//@route POST api/profile/education
//@desc  create sducation within profile
//@access Private
router.post("/education", passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body);
  //check validation
  if (!isValid) {
    //return any errors with 400 status
    res.status(400).json(errors);
  }
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      }
      //add to exp array
      profile.education.unshift(newEdu);
      profile.save().then(profile => res.json(profile))
    })
})

//@route DELETE api/profile/experience/:exp_id
//@desc  delete experience within profile
//@access Private
router.delete("/experience/:exp_id", passport.authenticate('jwt', { session: false }), (req, res) => {

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);
      //splice out of the array
      profile.experience.splice(removeIndex, 1);
      //save the profile
      profile.save().then(profile => res.json(profile)).catch(e => res.send(e));
    })
})
//@route DELETE api/profile/education/:exp_id
//@desc  delete education within profile
//@access Private
router.delete("/education/:edu_id", passport.authenticate('jwt', { session: false }), (req, res) => {

  Profile.findOne({ user: req.user.id })
    .then(profile => {
      const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);
      //splice out of the array
      profile.education.splice(removeIndex, 1);
      //save the profile
      profile.save().then(profile => res.json(profile)).catch(e => res.send(e));
    })
})

//@route DELETE api/profile
//@desc  delete profile and user
//@access Private
router.delete("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() => {
    User.findOneAndRemove({ _id: req.user.id }).then(() => { res.send("user and profile successfully deleted") })
  })
})

module.exports = router;
