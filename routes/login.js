var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "restaurants",
  port: 10003
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'RestaurantReview' });
});

router.post("/home", function(req,res){
  connection.connect(function(err){
    if (err) throw err;
    let username = req.body.name;
    let password = req.body.pass;
    connection.query("SELECT * FROM `users` WHERE userName = ? AND userPassword = ?", [username,password], function(error,results,fields){
      if(error) throw error;
      console.log(results);
      res.render('homepage', {title: 'RestaurantReview', userName: results[0].userName, role: results[0].roleID});
      connection.end();
    });
  });
});

module.exports = router;
