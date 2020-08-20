/**
 * Backend API service for Team-023 project
 */

"use strict";

// Required external modules
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

// App variables
const app = express();

if (app.get("env") === "development") require("dotenv").config();

const port = process.env.PORT || 4600;

// App configuration
app.use(cors());
app.use(helmet());

// App routes
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Welcome to Team-023 project API service" })
});

// Server activation
app.listen(port, () => {
  console.log('Server is listening on port', port);
});