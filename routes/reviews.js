var express = require('express');
var router = express.Router();
var mysql = require('mysql');
let title = "RestaurantReview";

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "restaurants",
  port: 10003
});

//GET ratings of a specific restaurant
router.get("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    pool.query("SELECT rating,review,userID FROM `ratings` WHERE restaurantID = ?", [req.params.id], (error, reviews) => {
      if (error) throw error;
      res.json(reviews);
    });
    connection.release();
  });
});

//POST a review to specific restaurant
router.post("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    pool.query("INSERT INTO `ratings` SET rating = ?, restaurantID = ?, review = ?, userID = ?", [req.body.rating, req.body.hiddenRestaurantID, req.body.review, req.body.hiddenUserID], (error, results) => {
      if (error) throw error;
      pool.query("SELECT * FROM `restaurants`", (error2, restaurants) => {
        if (error2) throw error2;
        pool.query("SELECT AVG(rating) AverageScore,COUNT(rating) NumberOfRatings, restaurantID FROM `ratings` GROUP BY restaurantID", (error3, ratings) => {
          if (error3) throw error3;
          res.render('homepage', {
            title: title,
            restaurants: restaurants,
            user: req.user,
            ratings: ratings
          });
        });
      });
    });
    connection.release();
  });
});


module.exports = router;
