var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');
var mysql = require("mysql");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password: "root",
  database: "restaurants",
  port: 10003
});
