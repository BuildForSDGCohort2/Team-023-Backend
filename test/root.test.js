/**
 * Test the root route '/'
 */

const assert = require("assert");
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../index");

describe("Unit testing the root / route", function () {
  it("should return OK status", function () {
    return request(app)
      .get("/")
      .then(function (response) {
        assert.equal(response.status, 200);
      });
  });
});
