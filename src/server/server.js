const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const clubRoutes = require("./routes/clubRoutes");
const eventsRoutes = require("./routes/eventsRoutes");

const cors = require("cors");
const eventsRouter= require("./routes/eventsRoutes");

const app = express();
const uri =
  "mongodb+srv://admin:admin@cluster0.qza1qg0.mongodb.net/KFUPM_Events?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    
  })
);
app.use(express.json()); // replaces bodyParser.json()

// Routes
// app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/clubs", clubRoutes);
app.use("/api/events", eventsRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// MongoDB connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB error:", err));

// Error handler (optional but recommended)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
