/**
 * Route /dashboard/summary-info
 * Returns total applications, number of pending, approved or rejected applications and total amount loaned over a selected period
 */

"use strict";

const LoanApplications = require("../../models/loan-applications");

function summaryInfo(req, res, next, dateTime) {
  LoanApplications.find(
    { provider: req.query.id, created: { $gte: dateTime } },
    (err, applications) => {
      if (err) {
        console.log("Error obtaining loan applications", err);
        return next(err);
      }

      const totalApplications = applications.length;
      const approvedApplications = applications.filter(
        (app) => app.status === "approved"
      );
      const approved = approvedApplications.length;
      const rejected = applications.filter((app) => app.status === "rejected")
        .length;
      const pending = applications.filter((app) => app.status === "pending")
        .length;
      const totalAmountLoaned = approvedApplications.reduce(
        (acc, cur) => cur.amount + acc,
        0
      );

      console.log("Successfully obtained summary info");
      return res.status(200).json({
        message: "Successfully obtained summary info",
        totalApplications,
        approved,
        rejected,
        pending,
        totalAmountLoaned,
      });
    }
  );
}

module.exports = summaryInfo;