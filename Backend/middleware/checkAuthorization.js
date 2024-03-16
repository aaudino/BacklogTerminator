const jwt = require("jsonwebtoken");

const UserModel = require("../models/userSchema");

const checkAuthorization = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ error: "Unauthorized Access - Token required" });
  }

  //get the token- without the Bearer
  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);
    req.user = await UserModel.findOne({ _id });
    next();
  } catch (error) {
    res
      .status(401)
      .json({ error: "Request is not Authorized - Token could be expired" });
  }
};

module.exports = checkAuthorization;
