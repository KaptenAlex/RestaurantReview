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

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', {
    title: 'RestaurantReview'
  });
});

router.post("/home", function(req, res) {
  connection.connect(function(err) {
    if (err) throw err;
    let restaurants = [];
    let userInfo = [];
    let username = req.body.name;
    let password = req.body.pass;
    connection.query("SELECT * FROM `users` WHERE userName = ? AND userPassword = ?", [username, password], function(error, results) {
      if (error) throw error;
      connection.query("SELECT * FROM `restaurants`", function(error2, results2) {
        if (error) throw error;
        for (var i = 0; i < results.length; i++) {
          console.log(results[i]);
        }
        for (var i = 0; i < results2.length; i++) {
          console.log(results2[i]);
        }
        res.render('homepage', {
          title: 'RestaurantReview',
          user: results,
          restaurants: results2
        });
      });
    });
  });
  //connection.end();
});

module.exports = router;
