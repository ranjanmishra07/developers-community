const express = require("express");
const router = express();

//@route GET api/profile/users
//@desc  Tests Post Route
//@access public
router.get("/test", (req, res) => {
  res.json({ msg: "users works" });
});

module.exports = router;
