import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      requiried: true,
      unique: true,
    },
    email: {
      type: String,
      requiried: true,
      unique: true,
    },
    password: {
      type: String,
      requiried: true,
    },
  },
  { timestamps: true }
);

export default new mongoose.model("user", userSchema);
