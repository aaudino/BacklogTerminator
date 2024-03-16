const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameReviewSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
    },
    review: {
      type: String,
    },
    starRating: {
      type: Number,
      required: true,
    },

    shareWithCommunity: {
      type: Boolean,
      validate: {
        validator: function (value) {
          return value === true;
        },
        message: "shareWithCommunity must be true",
      },
    },
  },
  { _id: false }
);

const backlogEntrySchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  gameplayStyles: {
    type: Object,
    required: true,
  },

  gameplayCompletionist: {
    type: Number,
  },
  gameplayMain: {
    type: Number,
  },
  gameplayMainExtra: {
    type: Number,
  },
  platforms: {
    type: [],
  },
  genre: {
    type: [],
  },
  reviews: {
    type: [gameReviewSchema],
  },
});

module.exports = mongoose.model("BacklogEntry", backlogEntrySchema);
