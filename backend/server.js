import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import leadRoutes from "./routes/leadRoutes.js";




dotenv.config();

const app = express();

// Middleware

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server + DB connect
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();