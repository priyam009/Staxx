var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;
// var assert = chai.assert;

chai.use(chaiHttp);

var request;

describe("Expenses", function() {
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });
  describe("GET expenses", function() {
    it("it should GET all the expenses", function(done) {
      db.User.bulkCreate([
        {
          email: "john@doe.com",
          password: "johndoe123",
          firstname: "John",
          lastname: "Doe",
          avatar: "av2"
        }
      ]).then(function() {
        db.Expense.bulkCreate([
          { name: "burger", amount: 10, category: "food", UserId: 1 },
          { name: "beer", amount: 8, category: "drink", UserId: 1 }
        ]).then(function() {
          request.get("/expenses?user_id=1").end(function(err, res) {
            var responseStatus = res.status;

            expect(err).to.be.null;
            expect(responseStatus).to.equal(200);
            expect(res).to.have.header(
              "content-type",
              "text/html; charset=utf-8"
            );
            done();
          });
        });
      });
    });
  });

  describe("GET expensesChart", function() {
    // beforeEach(function() {
    //   request = chai.request(server);
    //   return db.sequelize.sync({ force: true });
    // });
    it("it should GET all the expenses as per category", function(done) {
      db.User.create({
        email: "john@doe.com",
        password: "johndoe123",
        firstname: "John",
        lastname: "Doe",
        avatar: "av2"
      }).then(function() {
        db.Expense.bulkCreate([
          { name: "vodka", amount: 10, category: "drink", UserId: 1 },
          { name: "beer", amount: 7, category: "drink", UserId: 1 },
          { name: "coke", amount: 3, category: "drink", UserId: 1 }
        ]).then(function() {
          request.get("/expenseChart?user_id=1").end(function(err, res) {
            var responseStatus = res.status;
            var responseBody = res.body;

            console.log("responseBody", responseBody);

            expect(err).to.be.null;
            expect(responseStatus).to.equal(200);

            expect(responseBody)
              .to.be.an("array")
              .that.has.lengthOf(1);

            expect(responseBody[0])
              .to.be.an("object")
              .that.includes({
                category: "drink",
                total: "20"
              });

            done();
          });
        });
      });
    });
  });
});