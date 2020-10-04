/**
 * Routes - /provider
 */

"use strict";

const router = require("express").Router();
const shortid = require("shortid");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

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
  if (
    !req.body.hasOwnProperty("businessName") ||
    !req.body.hasOwnProperty("address") ||
    !req.body.hasOwnProperty("email") ||
    !req.body.hasOwnProperty("phoneNumber") ||
    !req.body.hasOwnProperty("password")
  ) {
    console.log(
      `Missing params ${["businessName", "address", "email", "phoneNumber", "password"]
        .filter((param) => !req.body.hasOwnProperty(param))
        .join(", ")}`
    );
    return res.status(400).json({
      message: `Missing parameter ${[
        "businessName",
        "address",
        "email",
        "phoneNumber",
        "password"
      ]
        .filter((param) => !req.body.hasOwnProperty(param))
        .join(", ")}`,
    });
  }

  const { businessName, address, email, phoneNumber, password } = req.body;

  // Hash password
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      console.log('Error generating brcrypt salt', err);
      return next(err);
    }
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.log('Error hashing password', err);
        return next(err);
      }

      const newProvider = new Provider({
        businessName,
        address,
        email,
        phoneNumber,
        shortid: shortid.generate(),
        password: hash,
        created: Date.now(),
      });
      newProvider.save((err, provider) => {
        if (err) {
          console.log("Error creating new provider", err);
          return next(err);
        }
        console.log("Successfully created new provider", provider._id);
        return res
          .status(201)
          .json({ message: "Successfully created new provider", provider });
      });
    })
  })
});

/**
 * POST Provider - Login an existing provider
 */
router.post("/login", (req, res, next) => {
  // Handle missing params
  if (
    !req.body.hasOwnProperty("email") ||
    !req.body.hasOwnProperty("password")
  ) {
    console.log(
      `Missing params ${[
        "email",
        "password",
      ]
        .filter((param) => !req.body.hasOwnProperty(param))
        .join(", ")}`
    );
    return res.status(400).json({
      message: `Missing parameter ${[
        "email",
        "password",
      ]
        .filter((param) => !req.body.hasOwnProperty(param))
        .join(", ")}`,
    });
  }

  const { email, password } = req.body;

  // Get provider record
  Provider.find({ email }, (err, providers) => {
    if (err) {
      console.log('Error getting provider record during login', err);
      return next(err);
    }

    // Check if provider is not in record
    if (providers.length <= 0) {
      console.log('Provider record not found', email);
      return res.status(404).json({ message: 'Provider record not found' });
    }

    const provider = providers[0];

    // Compare password
    bcrypt.compare(password, provider.password, (err, isMatch) => {
      if (err) {
        console.log('Error comparing provider password during login', err);
        return next(err);
      }
      if (!isMatch) {
        console.log('Password is not a match for provider', email);
        return res.status(401).json({ message: 'Invalid provider password' });
      }

      // Generate and update provider access token
      const token = uuidv4();
      Provider.findByIdAndUpdate(provider._id, { token }, { new: true }, (err, updatedProvider) => {
        if (err) {
          console.log('Error updating provider token', err);
          return next(err);
        }
        console.log('Successfully logged in provider', email);
        res.status(200).json({ message: 'Successfully logged in provider', provider: updatedProvider });
      });
    });
  });
});

module.exports = router;