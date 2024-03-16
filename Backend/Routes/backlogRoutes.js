const express = require("express");

const checkAuthorization = require("../middleware/checkAuthorization");
const {
  saveBacklogGame,
  getStoredGame,
  getBacklogEntries,
  getTerminatedGames,
  getGameReviews,
  deleteBacklogGame,
} = require("../controllers/backlogEntryController");

const backlogRouter = express.Router();

//Check the authorization for all Routes
backlogRouter.use(checkAuthorization);

backlogRouter.get("/getBacklogEntries", getBacklogEntries);

backlogRouter.get("/getTerminatedGames", getTerminatedGames);

backlogRouter.get("/getGameReviews", getGameReviews);

backlogRouter.post("/addBacklogGame", getStoredGame, saveBacklogGame);

backlogRouter.post("/deleteBacklogGame", deleteBacklogGame);

module.exports = backlogRouter;
