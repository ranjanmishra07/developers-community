const express = require("express");
const router = express();

//@route GET api/profile/test
//@desc  Tests Profile Route
//@access public
router.get("/test", (req, res) => {
  res.json({ msg: "profile works" });
});

module.exports = router;
