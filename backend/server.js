const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const bookmarkRoutes = require("./routes/bookmarks");
const newsRoutes = require("./routes/newsRoutes");

const app = express();

// CORS Configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://mern-stack-project-backend-5osd.onrender.com",
  "https://news-monkey-project.onrender.com",
  "https://news-monkey-project1.onrender.com",
  process.env.FRONTEND_URL,
  // Add Vercel domains
  /^https:\/\/.*\.vercel\.app$/,
].filter(Boolean);

// Temporary: allow all origins during debugging. Remove before production.
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Check if the origin is in the allowed list
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "API is running",
    env_check: {
      GNEWS_API_KEY: process.env.GNEWS_API_KEY ? "SET" : "NOT SET",
      MONGO_URI: process.env.MONGO_URI ? "SET" : "NOT SET",
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
    }
  });
});

app.use("/api", authRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api", newsRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Connect to MongoDB first, then start server
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully");

    // Start server after DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error("Server cannot start without database connection");
    process.exit(1);
  }
};

connectDB();
