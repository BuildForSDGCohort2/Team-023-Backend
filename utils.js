/**
 * Util methods
 */

"use strict";

const Provider = require("./models/providers");

module.exports.errorHandler = (err, req, res, next) => {
  console.log("A server error occured: ", err);
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
};

module.exports.authenticateProvider = (req, res, next) => {
  // Handle missing params
  if (
    !req.query.hasOwnProperty("id") ||
    !req.query.hasOwnProperty("token")
  ) {
    console.log(
      `Missing query params ${[
        "id",
        "token"
      ]
        .filter((param) => !req.query.hasOwnProperty(param))
        .join(", ")}`
    );
    return res.status(400).json({
      message: `Missing query parameter ${[
        "id",
        "token"
      ]
        .filter((param) => !req.query.hasOwnProperty(param))
        .join(", ")}`,
    });
  }

  // Get provider record
  Provider.findById(req.query.id, (err, provider) => {
    if (err) {
      console.log("Error authenticating provider", err);
      return next(err);
    }
    
    if (provider.token !== req.query.token) {
      console.log("Provider tokens do not match");
      return res.status(401).json({ message: "Invalid provider token" });
    }

    return next();
  });
}