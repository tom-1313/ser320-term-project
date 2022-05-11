const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.getToken = (user) => {
  console.log(user);
  const account = {
    email: user.email,
    isFaculty: user.isFaculty,
    id: user._id,
  };
  return jwt.sign(account, process.env.SECRET, { expiresIn: 3600 });
};

exports.verifyUser = (req, res, next) => {
  // check header or url parameters or post parameters for token
  //retrieve token from one of these places
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  // decode token

  console.log(token);
  if (token) {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        var err = new Error("You are not authenticated !");
        err.status = 401;
        return next(err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    var err = new Error("No token provided!");
    err.status = 403;
    return next(err);
  }
};

exports.verifyFaculty = (req, res, next) => {
  console.log(req.decoded);
  if (req.decoded.isFaculty === true) {
    console.log("faculty verified");
    next();
  } else {
    const err = new Error("You are not authorized!");
    err.status = 403;
    return next(err);
  }
};
