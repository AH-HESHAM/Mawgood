const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  try {
    const { fullName, email, password, role, phoneNumber, address, paymentMethod } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.HASH_SALT_ROUNDS),
    );
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
      address,
      paymentMethod,
    });
    await newUser.save();
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { email: email, role: user.role, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // Send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { signup, login };
