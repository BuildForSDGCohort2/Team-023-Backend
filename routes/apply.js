/**
 * Routes - /apply
 * For loan applications
 */

"use strict";

const router = require("express").Router();
const LoanApplication = require("../models/loan-applications");
const Provider = require("../models/providers");


/**
 * POST Apply - Create a new loan application record 
 */
router.post("/:shortid", (req, res, next) => {
  // Handle missing params
  if (
    !req.body.hasOwnProperty("name") ||
    !req.body.hasOwnProperty("address") ||
    !req.body.hasOwnProperty("email") ||
    !req.body.hasOwnProperty("phoneNumber") ||
    !req.body.hasOwnProperty("amount")
  ) {
    console.log(
      `Missing params ${["name", "address", "email", "phoneNumber", "amount"]
        .filter((param) => !req.body.hasOwnProperty(param))
        .join(", ")}`
    );
    return res.status(400).json({
      message: `Missing parameter ${["name", "address", "email", "phoneNumber", "amount"]
        .filter((param) => !req.body.hasOwnProperty(param))
        .join(", ")}`,
    });
  }

  const { name, address, email, phoneNumber, amount } = req.body;

  // Get provider from shortid
  Provider.find({ shortid: req.params.shortid }, (err, providers) => {
    if (err) {
      console.log('Error finding provider by shortid', err);
      return res.status(500).json({ message: 'Error finding provider by shortid' });
    }

    const provider = providers[0]; // Not two providers will have same shortID

    const newLoanApplication = new LoanApplication({
      name,
      address,
      email,
      phoneNumber,
      amount,
      provider: provider._id,
      creditScore: Math.floor(Math.random() * (850 - 300)) + 300, // (Values between 300 - poor and 850 - Excellent) Randomly generated for now
      created: Date.now(),
    });
    newLoanApplication.save((err, loanApplication) => {
      if (err) {
        console.log("Error creating new loan application", err);
        return next(err);
      }
      console.log("Successfully created new loan application", loanApplication._id);
      return res
        .status(201)
        .json({ message: "Successfully created new loanee", loanApplication });
    });
  });
});

module.exports = router;
