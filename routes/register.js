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

router.post("/createAccount", async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    const hashPass = await bcrypt.hash(password, 10)
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      pool.query("INSERT INTO `users` SET userName = ?, userPassword = ?, roleID = ?", [username, hashPass, 0], function(error, results, fields) {
        if (error) throw error;
        pool.query("SELECT * FROM `restaurants`", function(error2, results2) {
          if (error2) throw error2;
          pool.query("SELECT * FROM `users` WHERE userName = ? AND userPassword = ?", [username, hashPass], function(error3, results3) {
            if (error3) throw error3;
            console.log(results3);
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
  } catch(e) {
    console.log(e);
    res.redirect("/login")
  }
});


module.exports = router;
