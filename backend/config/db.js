const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Stop the server if DB fails
  }
};

module.exports = connectDB;
