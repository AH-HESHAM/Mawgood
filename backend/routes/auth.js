const express = require("express");
const router = express.Router();
const { signup, login } = require("../services/userService");

router.post("/register", async (req, res) => {
    signup(req, res);
});

router.post("/login", async (req, res) => {
    login(req, res);
});

module.exports = router;
