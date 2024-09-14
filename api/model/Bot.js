const mongoose = require("mongoose");

const bot = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    diagram: {
      type: String
    }
  },
  { timestamps: true }
);

const BotModal = mongoose.model("bot", bot);
module.exports = { BotModal };
