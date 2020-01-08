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
      res.redirect("../")
    });
    connection.release();
  });
});


module.exports = router;
