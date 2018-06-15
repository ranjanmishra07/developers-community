const express = require("express");
const router = express();

//@route GET api/profile/posts
//@desc  Tests Posts Route
//@access public
router.get("/test", (req, res) => {
  res.json({ msg: "posts works" });
});

module.exports = router;
