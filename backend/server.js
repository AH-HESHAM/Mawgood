const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const router = express.Router();

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middlewares/authMiddleware");
const userRoutes = require("./routes/UsersRoutes");
const stripeRoutes = require("./routes/StripeGateway");
const promoCodesRoutes = require("./routes/promoCodesRoute");

const cartRoutes = require("./routes/carts");
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", productRoutes);
app.use(authMiddleware);

app.use("/api/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/payment", stripeRoutes);
app.use("/cart", cartRoutes);
app.use("/promocodes", promoCodesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
