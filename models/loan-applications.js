/**
 * LoanApplications model and schema
 */

"use strict";

const mongoose = require("mongoose");

const LoanApplicationsSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  phoneNumber: String,
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
  amount: Number,
  creditScore: Number,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  created: Date,
});

const LoanApplication = mongoose.model("LoanApplication", LoanApplicationsSchema);

module.exports = LoanApplication;
