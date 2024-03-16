const mongoose = require("mongoose");
const { isEmail } = require("validator");
const completedGameSchema = require("./completedGameSchema");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const gameInfoSchema = new mongoose.Schema(
  {
    backlogItem: {
      type: Schema.Types.ObjectId,
      ref: "BacklogEntry",
    },
    platformSelect: {
      type: String,
      required: true,
    },
    alreadyPlayedCB: Boolean,

    hoursPlayed: {
      type: Number,
      required: function () {
        // is required when actively playing is set to true
        return this.activelyPlaying === true;
      },
    },
    playstyleSelect: {
      type: String,
      required: true,
    },
    completedGame: Boolean,

    date: {
      type: Date,
      default: function () {
        // Set to Date.now() if completed is true, otherwise null
        return this.completedGame ? Date.now() : null;
      },
    },
    review: {
      type: String,
    },
    starRating: {
      type: Number,
    },
    shareWithCommunity: {
      type: Boolean,
    },
  },
  { _id: false }
);

// COMPLETED Game ID's+ DATUM
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    // validate: [isEmail, "Ungültige Email "],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gameEntries: {
    type: [gameInfoSchema],
    default: [],
  },
  platforms: {
    type: [String],
    default: [],
  },
  genres: {
    type: [String],
    default: [],
  },
});

userSchema.statics.signUp = async function (userName, password) {
  if (!userName || !password) {
    throw new Error("Please provide a Username and a Password");
  }

  const exists = await this.findOne({ userName });
  if (exists) {
    throw new Error("Username is already taken");
  }

  //TODO: Passwordlength should be checked
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = this.create({ userName: userName, password: hash });

  return user;
};

userSchema.statics.login = async function (userName, password) {
  if (!userName || !password) {
    throw new Error("Please provide a Username and a Password");
  }

  const user = await this.findOne({ userName });
  if (!user) {
    throw new Error("Username does not exist");
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  console.log(passwordsMatch);

  if (!passwordsMatch) {
    throw new Error("Incorrect Password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
