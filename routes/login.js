var express = require('express');
var router = express.Router();
var mysql = require('mysql');
/*
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  //database: "local",
  port: 10003
});

connection.connect(function(err){
  if (err) throw err;
  console.log("Connected");
});
*/
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'RestaurantReview' });
});

module.exports = router;
