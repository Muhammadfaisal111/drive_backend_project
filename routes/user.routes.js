const express = require("express");
const route = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require("../models/user.model");
route.get("/register", (req, res) => {
  res.render("register");
});
route.post(
  "/register",
  body("username").trim().isLength({ min: 3 }),
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ erros: errors.array(), message: "Invalid data" });
    }
    const { username, email, password } = req.body;
    const newUser = await userModel.create({
      username: username,
      email: email,
      password: password,
    });
    res.json(newUser);
  }
);

module.exports = route;
