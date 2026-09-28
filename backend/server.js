const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// CORS
app.use(cors({
  origin: "http://localhost:5173"
}));

app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/todoDB")
  .then(() => {
    console.log("MongoDB connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection error:", error);
  });

const todoRoutes = require("./routes");

// app.use("/api/todos", todoRoutes);
app.use("/api/todoname", todoRoutes);