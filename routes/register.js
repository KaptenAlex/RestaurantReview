var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
let title = "RestaurantReview";

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "restaurants",
  port: 10003
});

//Create new account
router.post("/createAccount", async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    const hashPass = await bcrypt.hash(password, 10);
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      //Need to add check to see if a user already exist with that username.
      pool.query("INSERT INTO `users` SET userName = ?, userPassword = ?, roleID = ?", [username, hashPass, 0], function(error, results) {
        if (error) throw error;
        pool.query("SELECT * FROM `restaurants`", (error, restaurants) => {
          if (error) throw error;
          pool.query("SELECT AVG(rating) AverageScore,COUNT(r.rating) NumberOfRatings, r.restaurantID FROM `ratings` AS r JOIN `users` AS u ON r.userID = u.ID GROUP BY restaurantID", (error2, ratings) => {
            if (error2) throw error2;
            res.render('homepage', {
              title: title,
              restaurants: restaurants,
              user: "",
              ratings: ratings
            });
          });
        });
      });
      connection.release();
    });
  } catch (e) {
    console.log(e);
    res.redirect("/login");
  }
});


module.exports = router;
