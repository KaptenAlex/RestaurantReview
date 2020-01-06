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


module.exports = (passport) => {
  passport.use(new LocalStrategy({
    usernameField: "uName",
    passwordField: "passW"
  }, (username, password, done) => {
    pool.getConnection((error, connection) => {
      if (error) throw error;
      pool.query("SELECT * FROM `users` WHERE userName = ?", [username], (error2, user) => {
        if (error2) throw error2;
        if (!user) {
          return done(null, false);
        }
        bcrypt.compare(password, user[0].userPassword, (err, auth) => {
          if (err) throw err;
          if (auth) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    });
  }));
  
  passport.serializeUser((user, done) => {
    done(null, user[0].ID);
  });

  passport.deserializeUser((id, done) => {
    pool.getConnection((error, connection) => {
      pool.query("SELECT * FROM `users` WHERE ID = ?", [id], (err, user) => {
        if (err) throw err;
        done(err, user);
      });
      connection.release();
    });
  });
}
