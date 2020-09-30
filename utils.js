/**
 * Util methods
 */

"use strict";

module.exports.errorHandler = (err, req, res, next) => {
  console.log("A server error occured: ", err);
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
};