var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcryptjs');

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

router.post("/", function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    pool.query("SELECT * FROM `users` WHERE userName = ? AND userPassword = ?", [req.body.uName, req.body.passW], function(error, results) {
      if (error) throw error;
      pool.query("SELECT * FROM `restaurants`", function(error2, results2) {
        res.render("homepage", {
          user: results,
          restaurants: results2,
          title: "wow"
        });
      });
    });
    connection.release();
  });
});

module.exports = router;
