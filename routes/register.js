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
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    let username = req.body.username;
    let password = req.body.password;
    pool.query("INSERT INTO `users` SET userName = ?, userPassword = ?, roleID = ?", [username, password, 0], function(error, results, fields) {
      if (error) throw error;
      pool.query("SELECT * FROM `restaurants`", function(error2, results2) {
        if (error2) throw error2;
        for (var i = 0; i < results2.length; i++) {
          console.log(results2[i]);
        }
        pool.query("SELECT * FROM `users` WHERE userName = ? AND userPassword = ?", [username, password], function(error3, results3) {
          if (error) throw error;
          for (var i = 0; i < results.length; i++) {
            console.log(results[i]);
          }
          res.render('homepage', {
            user: results3,
            restaurants: results2,
            title: 'RestaurantReview'
          });
        });
      });
    });
    connection.release();
  });
});


module.exports = router;
