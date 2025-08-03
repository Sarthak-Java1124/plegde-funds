import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("The Database is Already Connected");
    return;
  }

  try {
    const mongoUri = process.env.MONGO_URI || "";
    if (!mongoUri) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    const db = await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("The Database is Connected");
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}
export default dbConnect;
