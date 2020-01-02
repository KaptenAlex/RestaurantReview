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

/*GET specific restaurant*/
router.get("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    pool.query("SELECT * FROM `restaurants` WHERE id = ?", [req.params.id], (err, rows, fields) => {
      if (!err) {
        console.log(JSON.stringify(rows[0]));
        res.json(rows);
      } else {
        console.log(err);
      }
    });
    connection.release();
  });
});

router.post("/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    pool.query("UPDATE `restaurants` SET name = ?, genre = ?, image = ? WHERE ID = ?", [req.body.restaurantName, req.body.restaurantGenre, null, req.params.id], (error, results, fields) => {
      if (error) throw error;
      pool.query("SELECT * FROM `restaurants`", (error2, results2) => {
        if (error2) throw error2;
        res.render("homepage", {
          title: "RestaurantReview",
          user: "",
          restaurants: results2
        });
      });
    });
    connection.release();
  });
});

router.delete("/delete/:id", (req, res) => {
  pool.getConnection((err, connection) => {
    pool.query("DELETE FROM `restaurants` WHERE ID = ?", [req.params.id], (error, results) => {
      if (error) throw error;
      pool.query("SELECT * FROM `restaurants`", (error2, results2) => {
        if (error2) throw error2;
        res.render("homepage", {
          title: "RestaurantReview",
          user: "",
          restaurants: results2
        });
      });
    });
    connection.release();
  });
});

router.post("/", (req, res) => {
  pool.getConnection((err, connection) => {
    pool.query("INSERT INTO `restaurants` (name, genre, image) VALUES (?,?,?)", [req.body.nameForRestaurant, req.body.genreForRestaurant, null], (error, results) => {
      if (error) throw error;
      pool.query("SELECT * FROM `restaurants`", (error2, results2) => {
        if (error2) throw error2;
        res.render("homepage", {
          title: "RestaurantReview",
          user: "",
          restaurants: results2
        });
      });
      connection.release();
    });
  });
});

module.exports = router;
