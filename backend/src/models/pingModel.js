import mongoose from "mongoose";

const pingSchema = new mongoose.Schema(
  {
    monitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Monitor",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: { type: String, enum: ["up", "down"], required: true },
    responseTime: { type: Number },
    checkedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Ping = mongoose.model("Ping", pingSchema);
export default Ping;
