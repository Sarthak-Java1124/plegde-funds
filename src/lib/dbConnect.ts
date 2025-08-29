import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect() {
  if (connection.isConnected) {
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

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
}
export default dbConnect;
