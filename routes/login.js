var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
const passport = require('passport');


var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "restaurants",
  port: 10003
});

//Get homepage
router.get('/', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    pool.query("SELECT * FROM `restaurants`", (error, restaurants) => {
      if (error) throw error;
      pool.query("SELECT AVG(rating) AverageScore,COUNT(rating) NumberOfRatings, restaurantID FROM `ratings` GROUP BY restaurantID", (error2, ratings) => {
        if(error2) throw error2;
        console.log(ratings);
        res.render('homepage', {
          title: 'RestaurantReview',
          restaurants: restaurants,
          user: req.user,
          ratings: ratings
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
    pool.query("SELECT * FROM `restaurants`", (err, restaurants) => {
      if (err) throw err;
      res.render("homepage", {
        title: "RestaurantReview",
        restaurants: restaurants,
        user: ""
      });
    });
    connection.release();
  });
});

module.exports = router;
