const UserModel = require("../models/userSchema");
const BacklogEntryModel = require("../models/backlogEntrySchema");
const mongoose = require("mongoose");

// ###############################
// GET REQUESTS
// ###############################

// TODO: CONCERNING CHECKAUTHORIZATION.js : JUST PASS THE ID OF THE USER and not THE ENTIRE USER ENTRY

const getBacklogEntries = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Unknown User");
    }
    const userWithBacklogEntries = await user.populate({
      path: "gameEntries",
      populate: {
        path: "backlogItem",
        model: "BacklogEntry",
      },
    });
    const filteredGameEntries = userWithBacklogEntries.gameEntries.filter(
      (entry) => entry.completedGame === false
    );

    res.status(200).json(filteredGameEntries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getTerminatedGames = async (req, res) => {
  try {
    const user = req.user;
    // const user = await UserModel.findById(userID);

    const userWithBacklogEntries = await user.populate({
      path: "gameEntries",
      populate: {
        path: "backlogItem",
        model: "BacklogEntry",
      },
    });
    const filteredGameEntries = userWithBacklogEntries.gameEntries.filter(
      (entry) => entry.completedGame === true
    );

    res.status(200).json(filteredGameEntries);
  } catch (error) {
    console.log(error);
  }
};

const getGameReviews = async (req, res) => {
  try {
    const gameEntry = await BacklogEntryModel.findOne({ id: req.query.id });

    if (!gameEntry) {
      throw new Error("Unknown Game");
    }
    res.status(200).json(gameEntry.reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ###############################
// POST REQUESTS
// ###############################

const getStoredGame = async (req, res, next) => {
  const game = req.body.game;

  let gameDBEntry = await BacklogEntryModel.findOne({ id: game.id });
  if (!gameDBEntry) {
    gameDBEntry = new BacklogEntryModel(game);
    await gameDBEntry.save();
  }
  req.gameDBEntry = gameDBEntry;
  next();
};

const saveBacklogGame = async (req, res, next) => {
  const gameDBEntry = req.gameDBEntry;
  const userData = req.body.user;
  const { gameInfo } = userData;
  const user = req.user;

  const gameEntryObject = {
    ...gameInfo,
    backlogItem: gameDBEntry._id,
  };

  const existingEntry = user.gameEntries.findIndex((entry) =>
    entry.backlogItem.equals(gameDBEntry._id)
  );

  //Overwrite GameEntry
  if (existingEntry >= 0) {
    user.gameEntries[existingEntry] = gameEntryObject;
  } else {
    user.gameEntries.push(gameEntryObject);
  }

  const filter = { _id: gameDBEntry._id };

  const reviewObject = {
    userName: user.userName,
    review: gameInfo.review,
    starRating: gameInfo.starRating,
    shareWithCommunity: gameInfo.shareWithCommunity,
  };

  const existingReviewIndex = gameDBEntry.reviews.findIndex(
    (review) => review.userName === user.userName
  );

  if (gameInfo.shareWithCommunity === true) {
    if (existingReviewIndex > -1) {
      gameDBEntry.reviews[existingReviewIndex] = reviewObject;
    } else {
      gameDBEntry.reviews.push(reviewObject);
    }
  }

  if (gameInfo.shareWithCommunity === false && existingReviewIndex > -1) {
    gameDBEntry.reviews.splice(existingReviewIndex, 1);
  }

  await BacklogEntryModel.findOneAndUpdate(filter, { ...gameDBEntry });

  user.platforms = [...new Set([...user.platforms, gameInfo.platformSelect])];
  user.genres = [...new Set([...user.genres, ...gameDBEntry.genre])];
  await user.save();

  res.status(200).json({});
};

const deleteBacklogGame = async (req, res, next) => {
  const user = req.user;

  const idString = req.body.backlogItemId;

  const userWithBacklogEntries = await user.populate({
    path: "gameEntries",
    populate: {
      path: "backlogItem",
      model: "BacklogEntry",
      select: "genre",
    },
  });

  const entryIndex = user.gameEntries.findIndex(
    (entry) => entry.backlogItem._id.toString() === idString
  );

  const gameEntryToDelete = user.gameEntries[entryIndex];

  // DELETE THE REVIEW IF IT HAS BEEN SHARED
  if (gameEntryToDelete.shareWithCommunity) {
    const gameEntry = await BacklogEntryModel.findOne({ _id: idString });

    const reviews = gameEntry.reviews;
    const entryIndex = reviews.findIndex(
      (review) => review.userName === user.userName
    );

    reviews.splice(entryIndex, 1);
    await gameEntry.save();
  }

  user.gameEntries.splice(entryIndex, 1);

  //REBUILD THE GENRES AND THE PLATFORMS
  user.platforms = [];
  user.genres = [];

  userWithBacklogEntries.gameEntries.forEach((gameEntry) => {
    user.platforms.push(gameEntry.platformSelect);
    user.genres.push(...gameEntry.backlogItem.genre);
  });

  user.platforms = [...new Set([...user.platforms])];
  user.genres = [...new Set([...user.genres])];

  await user.save();

  res.status(200).json({});
};

module.exports = {
  getStoredGame,
  saveBacklogGame,
  getBacklogEntries,
  getTerminatedGames,
  getGameReviews,
  deleteBacklogGame,
};
