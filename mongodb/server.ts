import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import connectDB from "../mongoConfig/db";
import { saveMessageData } from "./messageService";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

connectDB();

// GET endpoint to check if API is running
app.get("/api/messages", async (req: Request, res: Response) => {
  res.send("API IS RUNNING");
});

// POST endpoint to save message data
app.post("/api/messages", async (req: Request, res: Response) => {
  const { question, answer } = req.body; // Extract question and answer from request body

  try {
    // Call the saveMessageData function to save the message data
    await saveMessageData(question, answer);
    res.status(200).json({ message: "Message data saved successfully" });
  } catch (error) {
    console.error("Error saving message data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// New endpoint to expose saveMessageData functionality
app.post("/api/save-message", async (req: Request, res: Response) => {
  const { question, answer } = req.body; // Extract question and answer from request body

  try {
    // Call the saveMessageData function to save the message data
    await saveMessageData(question, answer);
    res.status(200).json({ message: "Message data saved successfully" });
  } catch (error) {
    console.error("Error saving message data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
