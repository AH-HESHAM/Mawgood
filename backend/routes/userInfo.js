const router = require("express").Router();
const userInfoService = require("../services/usersInfoServices");

// get user info
router.get("/", async (req, res) => {
  const userInfo = await userInfoService.getUserInfo(req.user.id);
  res.json(userInfo);
});

module.exports = router;
