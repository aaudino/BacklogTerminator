const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");
let slugify = require("slugify");

const {
  saveBacklogGame,
  getStoredGame,
  getBacklogEntries,
  getTerminatedGames,
} = require("./controllers/backlogEntryController");

const { signUp, login } = require("./controllers/userController");

const userRoutes = require("./Routes/userRoutes.js");
const backlogRoutes = require("./Routes/backlogRoutes.js");

//############################
//SCHEMAS:
//############################

const BacklogEntryModel = require("./models/backlogEntrySchema");
const UserModel = require("./models/userSchema");
//

const hltb = require("./hltb/dist/howlongtobeat.js");

let hltbService = new hltb.HowLongToBeatService();

const port = 8999;

dotenv.config({ path: "./config.env" });

const app = new express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS,
  })
);

// Get Access to the request body
mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGODB_URI).then((result) => {
  console.log("connected to the database");
  console.log("Starting the Server....");
  app.listen(port, () => {
    console.log(`Server is running on port ${port} `);
  });
});

app.use(express.json());

app.get("/api/getGame", (req, res) => {
  hltbService.search(req.query.game).then((result) => {
    res.send(result);
  });
});

app.get("/api/getData", (req, res) => {
  const gameID = req.query.id;
  hltbService.detail(gameID).then((result) => {
    res.send(result);
  });
});

app.get("/api/getBacklogEntries", getBacklogEntries);

app.get("/api/getTerminatedGames", getTerminatedGames);

app.post("/api/addBacklogGame", getStoredGame, saveBacklogGame);

app.use("/api/user", userRoutes);

app.use("/api/backlog", backlogRoutes);
