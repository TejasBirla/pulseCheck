import mongoose from "mongoose";

const connectDatabase = async () => {
  if (!process.env.DB_CONNECTION_STRING) {
    console.log("Connection string is invalid, DB not connected.");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Database connected successfully.");
    return;
  } catch (error) {
    console.log("Server error: ", error.message);
    process.exit(1);
  }
};

export default connectDatabase;
