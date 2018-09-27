const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const keys = require("../../config/keys");
const validateRegisterInput = require("../../validator/register");
const validateLoginInput = require("../../validator/login");
const router = express();

const User = require("../../models/User");

//@route    GET api/users/test
//@desc     Tests Post Route
//@access   public
router.get("/test", (req, res) => {
  console.log("test users");
  res.json({ msg: "users works" });
});

//@route    POST api/users/register
//@desc     Register a user
//@access   public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        errors.email = 'Email already exists';
        return res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm"
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(e => console.log(e));
          });
        });
      }
    })
    .catch(e => res.send(e));
});

//@route    POST api/users/login
//@desc     login a user return jwttoken
//@access   public
router.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  const { errors, isValid } = validateLoginInput(req.body);
  //check validation

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    //compare password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // res.json({ success: true, msg: "user found" });
        //jwt token
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: "Bearer " + token });
        });
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});

//@route    GET api/users/current
//@desc     return current user
//@access   private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
