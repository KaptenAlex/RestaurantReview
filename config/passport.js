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
      console.log("Open connection");
      pool.query("SELECT * FROM `users` WHERE userName = ?", [username], (error2, user) => {
        if (error2) throw error2;
        console.log("No errors from query");
        if (!user) {
          return done(null, false);
        }
        console.log("If user exists");
        console.log(user);
        bcrypt.compare(password, user[0].userPassword, (err, auth) => {
          if (err) throw err;
          console.log("Comparing passwords");
          if (auth) {
            console.log("passwords match");
            return done(null, user);
          } else {
            console.log("passwords don't match");
            return done(null, false);
          }
        });
      });
      //connection.release();
    });
  }));
  passport.serializeUser((user, done) => {
    console.log("Serializing user");
    done(null, user[0].ID);
  });

  passport.deserializeUser((id, done) => {
    console.log("Deserializing user");
    pool.getConnection((error, connection) => {
      pool.query("SELECT * FROM `users` WHERE ID = ?", [id], (err, user) => {
        if (err) throw err;
        console.log("Found user with matching id");
        done(err, user);
      });
      connection.release();
    });
  });
}
