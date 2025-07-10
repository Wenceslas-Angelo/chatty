import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined");
    }
    await mongoose.connect(process.env.MONGO_URI, {
      family: 4,
    });
    console.log("🚀MongoDB connected");
  } catch (error) {
    console.error("❌MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
