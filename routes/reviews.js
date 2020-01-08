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

//SQL queries
let allRestaurants = "SELECT * FROM `restaurants`";
let avgRatingForRestaurant = "SELECT AVG(rating) AverageScore,COUNT(r.rating) NumberOfRatings, r.restaurantID FROM `ratings` AS r JOIN `users` AS u ON r.userID = u.ID GROUP BY restaurantID";
let topTenRatedRestaurants = "SELECT AVG(rating) averageScore,COUNT(r.rating) numberOfRatings, re.name FROM `ratings` AS r JOIN `users` AS u JOIN `restaurants` AS re ON r.userID = u.ID AND re.ID = r.restaurantID GROUP BY restaurantID ORDER BY averageScore DESC LIMIT 10";
let noOfGenresAndWhich = "SELECT genre,COUNT(genre) AS noOfGenres FROM `restaurants` GROUP BY genre ORDER BY noOfGenres DESC";

//GET ratings of a specific restaurant
router.get("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    pool.query("SELECT r.rating,r.review,u.userName,r.date FROM `ratings` AS r JOIN `users` as u ON r.userID = u.ID WHERE restaurantID = ?", [req.params.id], (error, reviews) => {
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
    let date = new Date();
    pool.query("INSERT INTO `ratings` SET rating = ?, restaurantID = ?, review = ?, userID = ?, date = ?", [req.body.rating, req.body.hiddenRestaurantID, req.body.review, req.body.hiddenUserID, date], (error, results) => {
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
    });
    connection.release();
  });
});


module.exports = router;
