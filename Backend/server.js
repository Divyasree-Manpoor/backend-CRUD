const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// ✅ import error middleware
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

// 🔹 Middleware
app.use(cors());
app.use(express.json());

// 🔹 Connect Database
connectDB();

// 🔹 Routes
app.use("/api/sales", require("./routes/salesRoutes"));

// 🔹 Test Route
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// ❌ Not Found Middleware (must be after routes)
app.use(notFound);

// ❌ Global Error Handler (must be last)
app.use(errorHandler);

// 🔹 Server
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});