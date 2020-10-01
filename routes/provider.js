/**
 * Routes - /provider
 */

"use strict";

const router = require("express").Router();
const shortid = require("shortid");
const Provider = require("../models/providers");

/**
 * GET Provider - Obtain a provider record
 */
router.get("/:id", (req, res, next) => {
  Provider.findById(req.params.id, (err, provider) => {
    if (err) {
      console.log('Error finding provider', err);
      return next(err);
    }
    console.log('Successfully obtained provider', provider._id);
    res.status(200).json({ message: 'Successfully obtained provider', provider });
  });
});

/**
 * POST Provider - Create a new provider record
 */
router.post("/", (req, res, next) => {
  // Handle missing params
  if (!req.body.hasOwnProperty("businessName") || !req.body.hasOwnProperty("address") || !req.body.hasOwnProperty("email") || !req.body.hasOwnProperty("phoneNumber")) {
    console.log(
      `Missing params ${["businessName", "address", "email", "phoneNumber"]
        .filter((param) => !req.body.hasOwnProperty(param))
        .join(", ")}`
    );
    return res.status(400).json({
      message: `Missing parameter ${[
        "businessName",
        "address",
        "email",
        "phoneNumber",
      ]
        .filter((param) => !req.body.hasOwnProperty(param))
        .join(", ")}`,
    });
  }

  const { businessName, address, email, phoneNumber } = req.body;

  const newProvider = new Provider({
    businessName,
    address,
    email,
    phoneNumber,
    shortid: shortid.generate(),
    created: Date.now()
  });
  newProvider.save((err, provider) => {
    if (err) {
      console.log("Error creating new provider", err);
      return next(err);
    }
    console.log('Successfully created new provider', provider._id);
    return res
      .status(201)
      .json({ message: "Successfully created new provider", provider });
  });
});

module.exports = router;