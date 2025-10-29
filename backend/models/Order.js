const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");

const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      default: uuidv4,   // Automatically generate a unique orderId
      unique: true,      // Ensure uniqueness at the DB level
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    item: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    address: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Dispatched", "Out for delivery", "Cancelled"],
      default: "Pending",
    },
    paymentMode: {
      type: String,
      enum: ["COD", "UPI", "CARD"],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Order", orderSchema);
