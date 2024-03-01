const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const connectDB = async () => {
  try {
    require("dotenv").config({ path: "../.env" });
    console.log("Loaded .env file:", process.env);
    console.log("MongoDB URI:", process.env.MONGODB_URI);

    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MongoDB URI is not defined in the environment variables."
      );
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: true,
    });
    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    // Process.exit();
  }
};

module.exports = connectDB;
