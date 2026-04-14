import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  email: String,
  phone: String,
  status: {
    type: String,
    enum: ["New", "Contacted", "Closed"],
    default: "New",
  },
}, { timestamps: true });

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;