import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const connectDB = async () => {
  try {
    console.log("Loaded .env file:", process.env);
    console.log("MongoDB URI:", process.env.MONGODB_URI);

    if (!process.env.MONGODB_URI) {
      throw new Error(
        "MongoDB URI is not defined in the environment variables."
      );
    }

    const options: any = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      // useFindAndModify: true,
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);

    console.log(`MongoDB connected : ${conn.connection.host}`);
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    // Process.exit();
  }
};

export default connectDB;
