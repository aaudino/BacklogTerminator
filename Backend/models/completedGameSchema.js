const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const completedGameSchema = new Schema({
  backlogEntry: { type: Schema.Types.ObjectId, ref: "BacklogEntry" },
  completedAt: { type: Date, default: Date.now },
});

module.exports = { completedGameSchema };
