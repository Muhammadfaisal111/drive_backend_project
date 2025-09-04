const express = require("express");
const route = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
route.get("/register", (req, res) => {
  res.render("register");
});
route.post(
  "/register",
  body("username").trim().isLength({ min: 3 }), //build in middleware (express-validator)
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req); //check for errors
    if (!errors.isEmpty()) {
      //if there are errors
      return res
        .status(400)
        .json({ erros: errors.array(), message: "Invalid data" });
    }
    const { username, email, password } = req.body;
    //destructuring the data comes from req.body
    const hashedPassword = await brcypt.hash(password, 10); //hash the password
    const newUser = await userModel.create({
      //create new user in the database
      username: username,
      email: email,
      password: hashedPassword,
    });
    res.json(newUser);
  }
);

route.get("/login", (req, res) => {
  res.render("login");
});
route.post(
  "/login",
  body("username").trim().isLength({ min: 3 }),
  body("password").trim().isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array(), message: "Invalid data" });
    }
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username });
    if (!user) {
      return res
        .status(400)
        .json({ message: "username or password is incorrect" });
    }
    const isMatch = await brcypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "username or password is incorrect" });
    }
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET
    );
    res.json({ token });
  }
);

module.exports = route;
