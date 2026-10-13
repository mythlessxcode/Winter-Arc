import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing. Copy .env.example to .env and set it.");
}

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
    console.log(`Database: ${connection.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

connectDB();
