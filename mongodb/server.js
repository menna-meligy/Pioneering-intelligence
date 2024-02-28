// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  "mongodb+srv://mennameligy567:menna@cluster0.0ok9emt.mongodb.net/";

app.use(bodyParser.json());

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.get("/api/messages", async (req, res) => {});

app.post("/api/messages", async (req, res) => {});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
