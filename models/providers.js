/**
 * Provider model, schema and methods
 */

"use strict";

const mongoose = require("mongoose");

const ProviderSchema = new mongoose.Schema({
  businessName: String,
  address: String,
  email: String,
  phoneNumber: String,
  shortid: String,
  created: Date,
});

const Provider = mongoose.model('Provider', ProviderSchema);

module.exports = Provider;