const express = require("express");
const cors = require("cors");

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// JSON middleware
app.use(express.json());

// Routes
const todoRoutes = require("./routes");

app.use("/api/todoname", todoRoutes);

module.exports = app;