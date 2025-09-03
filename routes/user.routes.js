const express = require("express");
const route = express.Router();
route.get("/register", (req, res) => {
  res.render("register");
});
route.post("/register", (req, res) => {
  console.log(req.body);
  res.send("User registered successfully");
});

module.exports = route;
