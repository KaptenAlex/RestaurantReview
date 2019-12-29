var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "restaurants",
  port: 10003
});

router.post("/createAccount", function(req, res) {
  pool.getConnection(function(err) {
    if (err) throw err;
    let username = req.body.username;
    let password = req.body.password;
    pool.query("INSERT INTO `users` SET userName = ?, userPassword = ?, roleID = ?", [username, password, 0], function(error, results, fields) {
      if (error) throw error;
      console.log("Created user!");
      res.render('homepage', { title: 'RestaurantReview' });
    });
  });
});


module.exports = router;
