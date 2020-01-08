var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
const passport = require('passport');
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

//GET homepage
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    pool.query(allRestaurants, (error, restaurants) => {
      if (error) throw error;
      pool.query(avgRatingForRestaurant, (error2, ratings) => {
        if (error2) throw error2;
        pool.query(topTenRatedRestaurants, (error3, top10restaurants) => {
          if (error3) throw error3;
          pool.query(noOfGenresAndWhich, (error4, restaurantsByGenre) => {
            if (error4) throw error4;
            res.render('homepage', {
              title: title,
              restaurants: restaurants,
              user: req.user,
              ratings: ratings,
              topTen: top10restaurants,
              NoOfRestaurantGenres: restaurantsByGenre
            });
          });
        });
      });
    });
    connection.release();
  });
});
//Login using passport strategy
router.post("/", (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/error'
  })(req, res, next);
});

//user logout
router.get("/logout", (req, res) => {
  req.logout();
  pool.getConnection((error, connection) => {
    if (error) throw error;
    pool.query(allRestaurants, (error, restaurants) => {
      if (error) throw error;
      pool.query(avgRatingForRestaurant, (error2, ratings) => {
        if (error2) throw error2;
        pool.query(topTenRatedRestaurants, (error3, top10restaurants) => {
          if (error3) throw error3;
          pool.query(noOfGenresAndWhich, (error4, restaurantsByGenre) => {
            if (error4) throw error4;
            res.render('homepage', {
              title: title,
              restaurants: restaurants,
              user: req.user,
              ratings: ratings,
              topTen: top10restaurants,
              NoOfRestaurantGenres: restaurantsByGenre
            });
          });
        });
      });
    });
    connection.release();
  });
});

module.exports = router;
