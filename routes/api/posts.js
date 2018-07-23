const router = require('express').Router();
// @route   GET api/posts/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({
  msg: "Posts Works"
}));
module.exports = router;
