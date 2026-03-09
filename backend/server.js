const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const router = express.Router();

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes")
const authMiddleware = require("./middlewares/authMiddleware");


dotenv.config();

connectDB();

const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONT_URL,
    credentials: true,
  }),
);
app.use(authMiddleware);
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// for testing purposes only, remove in production
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use("/api/users", router);
