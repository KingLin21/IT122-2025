import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const mongoURI: string = process.env.MONGO_URI || "";

if (!mongoURI) {
  console.error("❌ MONGO_URI is missing! Check your .env file.");
  process.exit(1);
}

console.log(`🔍 Attempting to connect to MongoDB at: ${mongoURI}`);

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, { tlsAllowInvalidCertificates: true });
    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
