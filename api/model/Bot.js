const mongoose = require("mongoose");
const { UserModel } = require("./User");

const bot = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: UserModel.modelName,
      required: true,
    },
    diagram: {
      type: String
    }
  },
  { timestamps: true },
  {
    versionKey: false,
  }
);

const BotModal = mongoose.model("Bot", bot);
module.exports = { BotModal };
