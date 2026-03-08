const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes")


dotenv.config();

connectDB();

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_URL,
  }),
);

app.use(express.json());

app.use("/products", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
