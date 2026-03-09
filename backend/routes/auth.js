const express = require("express");
const router = express.Router();
const { signup, login } = require("../services/userService");

router.post("/register", async (req, res) => {
    signup(req, res);
});

router.post("/login", async (req, res) => {
    login(req, res);
});

router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logout successful" });
});

module.exports = router;
