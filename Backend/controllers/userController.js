const UserModel = require("../models/userSchema");

const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET);
};

const provideDemoData = (req, res, next) => {
  req.body.password = process.env.DEMOPW;
  req.body.userName = process.env.DEMOUN;

  next();
};

const signUp = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await UserModel.signUp(userName, password);
    const token = createToken(user._id);
    res.status(200).json({ userName, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await UserModel.login(userName, password);
    const token = createToken(user._id);
    res.status(200).json({ userName, token, userName });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  signUp,
  login,
  provideDemoData,
};
