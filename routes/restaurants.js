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

module.exports = router;
