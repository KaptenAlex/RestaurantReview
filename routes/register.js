var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 10003,
  database: "restaurants"
});

router.post("/", function(req, res) {
  connection.connect(function(err) {
    if (err) throw err;
    let username = req.body.username;
    let password = req.body.password;
    connection.query("INSERT INTO `users` SET userName = ?, userPassword = ?, roleID = ?", [username, password, 0], function(error, results, fields) {
      if (error) throw error;
      console.log("Created user!");
      res.render('login', { title: 'RestaurantReview' });
      connection.end();
    });
  });
});


module.exports = router;
