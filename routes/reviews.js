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

router.post("/", (req, res) => {
  pool.getConnection((err, connection) => {
    if(err) throw err;
    pool.query("INSERT INTO `ratings` SET rating = ?, restaurantID = ?, review = ?, userID = ?", [req.body.rating, req.body.hiddenRestaurantID, req.body.review, req.body.hiddenUserID], (error, results) => {
      if(error) throw error;
      pool.query("SELECT * FROM `restaurants`", (error2, restaurants) => {
        if(error2) throw error2;
        pool.query("SELECT * FROM `ratings`", (error3, reviews) => {
          if(error3) throw error3;
          res.render("homepage", {
            title: "RestaurantReview",
            user:"",
            restaurants: restaurants
          });
        });
      });
    });
    connection.release();
  });
});


module.exports = router;
