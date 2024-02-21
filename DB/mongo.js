import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(mongoose.connection.host);
  } catch (error) {
    console.log(error);
  }
};
