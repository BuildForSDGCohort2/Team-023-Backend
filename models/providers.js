/**
 * Provider model, schema and methods
 */

"use strict";

const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
  businessName: String,
  address: String,
  email: { type: String, unique: true },
  phoneNumber: { type: String, unique: true },
  shortid: String,
  password: String,
  token: String,
  created: Date,
});

const Provider = mongoose.model('Provider', ProviderSchema);

module.exports = Provider;