var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "restaurants",
  port: 10003
});

router.get('/', function(req, res) {
  connection.connect(function(err) {
    if (err) throw err;
    let restaurants = [];
    connection.query("SELECT * FROM `restaurants`", function(error, results) {
      if (error) throw error;
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
      }
      res.render('homepage', {
        title: 'RestaurantReview',
        restaurants: results,
        user: ""
      });
    });
  });
  //connection.end();
});

router.post("/login", function(req, res) {
  connection.connect(function(err) {
    if (err) throw err;
    let userInfo = [];
    let username = req.body.name;
    let password = req.body.pass;
    connection.query("SELECT * FROM `users` WHERE userName = ? AND userPassword = ?", [username, password], function(error, results) {
      if (error) throw error;
      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
      }
      res.render('homepage', {
        title: 'RestaurantReview',
        user: results,
      });
    });
  });
});

module.exports = router;
