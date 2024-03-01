const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("../mongoConfig/db");

const app = express();
connectDB();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.get("/api/messages", async (req, res) => {
  req.send("API IS RUNNING");
});

app.post("/api/messages", async (req, res) => {});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
