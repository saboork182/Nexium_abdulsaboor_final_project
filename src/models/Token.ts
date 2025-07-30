import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema({
  token: String,
  email: String,
  expiresAt: Date,
}, { timestamps: true });

export default mongoose.models.Token || mongoose.model("Token", TokenSchema);
