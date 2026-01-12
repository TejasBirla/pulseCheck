import mongoose from "mongoose";

const monitorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    protocol: { type: String, enum: ["HTTP", "HTTPS"], default: "HTTP" },
    interval: { type: Number, default: 10 }, //in minutes
    status: { type: String, enum: ["up", "down"], default: "up" },
    lastPing: { type: Date },
  },
  { timestamps: true }
);

const Monitor = mongoose.model("Monitor", monitorSchema);
export default Monitor;
