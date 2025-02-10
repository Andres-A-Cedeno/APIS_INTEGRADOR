import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("🌎 Connected to MongoDB");
  } catch (error) {
    console.error("💥 Error connecting to MongoDB");
    console.log(error);
  }
};

export default connectDB;
