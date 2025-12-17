// Imports
import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import routes from "./http/routes.js";

// Instance express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(async (req, res, next) => {
  console.log(
    `⚡ ${req.method} - ${req.path} from ${
      req.host
    } at ⌛ ${new Date().toLocaleString()}`
  );
  next();
});

// Use express routes
app.use("/", routes);

// Health Checking route
app.get("/health", (req, res) => {
  res.json({ success: true, message: "Server is ok!" });
});

// Start the server
const startServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  } catch (err) {
    console.error("Server failed to start:", err?.message);
  }
};

startServer();
