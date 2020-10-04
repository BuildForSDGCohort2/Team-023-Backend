/**
 * Dashboard routes /dashboard
 */

"use strict";

const router = require("express").Router();
const authenticateProvider = require("../../utils").authenticateProvider;
const getDateTime = require("./get-date-time");

const summaryInfo = require("./summary-info");

router.get("/summary-info", authenticateProvider, (req, res, next) => {
  const period = req.query.period;
  if (!period) {
    console.log('Missing parameter period');
    return res.status(400).json({ message: "Missing parameter period" });
  }
  const dateTime = getDateTime(period);
  summaryInfo(req, res, next, dateTime);
});

module.exports = router;