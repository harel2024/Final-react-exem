import mongoose from "mongoose";
import dotenv from "dotenv";

// טוען את משתני הסביבה
dotenv.config();

// פונקציה להתחברות ל-MongoDB
export const connectToMongoDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || "";
    await mongoose.connect(mongoURI); // ללא הגדרות מיותרות
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // סוגר את השרת במידה והחיבור נכשל
  }
};

