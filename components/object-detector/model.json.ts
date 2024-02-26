// pages/api/model.json.ts

import fs from "fs";
import path from "path";

export default function handler(req, res) {
  try {
    // Read the contents of the model JSON file
    const modelJson = fs.readFileSync(
      path.resolve("./public/models/model.json"),
      "utf-8"
    );

    // Set the content type and send the JSON response
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(JSON.parse(modelJson));
  } catch (error) {
    console.error("Error reading model JSON file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
