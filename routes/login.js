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

router.get('/', function(req, res) {
  pool.getConnection(function(err, connection) {
    if (err) throw err;
    pool.query("SELECT * FROM `restaurants`", function(error, results) {
      if (error) throw error;
      res.render('homepage', {
        title: 'RestaurantReview',
        restaurants: results,
        user: ""
      });
    });
    connection.release();
  });
});

router.post("/", (req, res) => {
  pool.getConnection((error, connection) => {
    if (error) throw error;
    pool.query("SELECT * FROM `users` WHERE userName = ?", [req.body.uName], (error2, user) => {
      if (error2) throw error2;
      bcrypt.compare(req.body.passW, user[0].userPassword, (error3, result) => {
        if (error3) throw error3;
        if (result) {
          pool.query("SELECT * FROM `restaurants`", (error4, restaurants) => {
            if (error4) throw error4;
            res.render("homepage", {
              title: "RestaurantReview",
              user: user,
              restaurants: restaurants
            });
          });
        } else {
          return res.status(400).send();
        }
      });
    });
    connection.release();
  });
});
module.exports = router;
