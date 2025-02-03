import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const mongoURI = process.env.MONGO_URI; // Get the MongoDB URI from .env

mongoose.connect(mongoURI) // Removed deprecated options
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

export default mongoose;