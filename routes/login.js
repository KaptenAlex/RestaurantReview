var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
const passport = require('passport');


var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "restaurants",
  port: 10003
});

router.get('/', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    pool.query("SELECT * FROM `restaurants`", function(error, results) {
      if (error) throw error;
      res.render('homepage', {
        title: 'RestaurantReview',
        restaurants: results,
        user: ""
      });
    });
    connection.release();
  });
});

router.post("/", (req, res, next) => {
  console.log("Login request");
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/error'
  })(req, res, next);
  console.log("Passport strategy");
});

module.exports = router;
