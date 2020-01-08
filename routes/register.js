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

//SQL queries
let allRestaurants = "SELECT * FROM `restaurants`";
let avgRatingForRestaurant = "SELECT AVG(rating) AverageScore,COUNT(r.rating) NumberOfRatings, r.restaurantID FROM `ratings` AS r JOIN `users` AS u ON r.userID = u.ID GROUP BY restaurantID";
let topTenRatedRestaurants = "SELECT AVG(rating) averageScore,COUNT(r.rating) numberOfRatings, re.name FROM `ratings` AS r JOIN `users` AS u JOIN `restaurants` AS re ON r.userID = u.ID AND re.ID = r.restaurantID GROUP BY restaurantID ORDER BY averageScore DESC LIMIT 10";
let noOfGenresAndWhich = "SELECT genre,COUNT(genre) AS noOfGenres FROM `restaurants` GROUP BY genre ORDER BY noOfGenres DESC";

//Create new account
router.post("/createAccount", async (req, res) => {
  try {
    const hashPass = await bcrypt.hash(req.body.password, 10);
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      /*Need to add check to see if a user already exist with that username.
        and send the user a message describing what went wrong.
      */
      pool.query("INSERT INTO `users` SET userName = ?, userPassword = ?, roleID = ?", [req.body.username, hashPass, 0], function(error, results) {
        if (error) throw error;
        res.redirect("../..")
      });
      connection.release();
    });
  } catch (e) {
    console.log(e);
    res.redirect("/login");
  }
});


module.exports = router;
