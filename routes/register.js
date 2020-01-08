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
    pool.getConnection(function(err, connection) {
      if (err) throw err;
      if (req.body.password.length < 1) {
        res.redirect("../..");
      } else if (req.body.username.length < 1) {
        res.redirect("../..");
      }
      pool.query("SELECT userName FROM `users` where userName = ?", [req.body.username], async (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
          res.redirect("../..")
        } else {
          const hashPass = await bcrypt.hash(req.body.password, 10);
          pool.query("INSERT INTO `users` SET userName = ?, userPassword = ?, roleID = ?", [req.body.username, hashPass, 0], function(error2, results) {
            if (error2) throw error2;
            res.redirect("../..")
          });
        }
      });
      connection.release();
    });
  } catch (e) {
    console.log(e);
    res.redirect("/login");
  }
});


module.exports = router;
