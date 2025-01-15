import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Kết nối mongoose thành công!");
  } catch (error) {
    console.error("Kết nối mongoose thất bại!", error);
    process.exit(1);
  }
};

export default connectMongoDB;
