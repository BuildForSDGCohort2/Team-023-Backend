/**
 * Backend API service for Team-023 project
 */

"use strict";

// Required external modules
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// App variables
const app = express();

if (app.get("env") === "development") require("dotenv").config();

const port = process.env.PORT || 4600;

// Database connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error'));
db.once('open', () => console.log('db connected'));

// App configuration
app.use(cors());
app.use(helmet());

// App routes
app.get("/", (req, res) => {
  res.status(200).json({ msg: "LoanDistro API service" })
});

// Server activation
app.listen(port, () => {
  console.log('Server is listening on port', port);
});