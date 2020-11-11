const db = require("../models/index");
const expressJwt = require("express-jwt");
const user = require("../models/user");
const userModal = user(db.sequelize, db.Sequelize.DataTypes);

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

//  const { userById } = require("../controllers/user");

exports.userById = async (req, res, next) => {
  const record = await userModal.findOne({ where: { id: req.params.userId } });
  if (!record) {
    return res.status.json({
      message:
        "Authenticated resource. Access Denied!. Please login to access it.",
    });
  }
  req.user = record;
  next();
};

exports.authMiddleware = (req, res, next) => {
  //req.user is bcoz of :userId in route, middleware gets it.
  //req.auth is bcoz of requireSignin(express jwt)
  let loggedUser = req.user && req.auth && req.user.id == req.auth.id;
  if (!loggedUser) {
    return res.status(401).json({
      error: "Access denied",
    });
  }
  next();
};
