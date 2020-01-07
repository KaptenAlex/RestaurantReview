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
let avgRating = "SELECT AVG(rating) AverageScore,COUNT(r.rating) NumberOfRatings, r.restaurantID FROM `ratings` AS r JOIN `users` AS u ON r.userID = u.ID GROUP BY restaurantID";

//GET specific restaurant
router.get("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    pool.query("SELECT * FROM `restaurants` WHERE id = ?", [req.params.id], (err, restaurant) => {
      if (!err) {
        res.json(restaurant);
      } else {
        console.log(err);
      }
    });
    connection.release();
  });
});
//UPDATE certain restaurant
router.post("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    pool.query("UPDATE `restaurants` SET name = ?, genre = ?, image = ? WHERE ID = ?", [req.body.restaurantName, req.body.restaurantGenre, null, req.params.id], (error, results) => {
      if (error) throw error;
      pool.query(allRestaurants, (error2, restaurants) => {
        if (error2) throw error2;
        pool.query(avgRating, (error3, ratings) => {
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

//DELETE certain restaurant
router.delete("/delete/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    pool.query("DELETE FROM `restaurants` WHERE ID = ?", [req.params.id], (error, results) => {
      if (error) throw error;
      pool.query(allRestaurants, (error2, restaurants) => {
        if (error2) throw error2;
        pool.query(avgRating, (error3, ratings) => {
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

//CREATE new restaurant
router.post("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    pool.query("INSERT INTO `restaurants` (name, genre, image) VALUES (?,?,?)", [req.body.nameForRestaurant, req.body.genreForRestaurant, null], (error, results) => {
      if (error) throw error;
      pool.query(allRestaurants, (error2, restaurants) => {
        if (error2) throw error2;
        pool.query(avgRating, (error3, ratings) => {
          if (error3) throw error3;
          res.render('homepage', {
            title: title,
            restaurants: restaurants,
            user: req.user,
            ratings: ratings
          });
        });
      });
      connection.release();
    });
  });
});

module.exports = router;
