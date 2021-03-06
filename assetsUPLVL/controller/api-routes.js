// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  // app.post("/api/v1/signup", (req, res) => {
  //   console.log("POST /api/v1/signup");

  //   db.User.create({
  //     name: req.body.name,
  //     email: req.body.email,
  //     password: req.body.password
  //   })
  //     .then(() => {
  //       res.redirect(307, "/api/login"); // 307: redirect with the same method
  //     })
  //     .catch(err => {
  //       res.status(401).json(err);
  //     });
  // });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    console.log("GET /logout")
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    console.log("GET /api/user_data");
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
