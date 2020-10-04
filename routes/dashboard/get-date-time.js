"use strict";

/**
 * getDateTime - A util function to obtain dateTime from period
 * @param {*} period 
 */
function getDateTime(period) {
  let dateTime;

  switch (period) {
    case "today":
      dateTime = new Date();
      break;
    case "lastweek":
      dateTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      break;
    case "lastmonth":
      dateTime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      dateTime = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // last week default
  }

  return dateTime;
}

module.exports = getDateTime;