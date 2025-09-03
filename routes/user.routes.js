const express = require("express");
const route = express.Router();
const { body, validationResult } = require("express-validator");
route.get("/register", (req, res) => {
  res.render("register");
});
route.post(
  "/register",
  body("username").trim().isLength({ min: 3 }),
  body("email").trim().isEmail(),
  body("password").trim().isLength({ min: 6 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ erros: errors.array(), message: "Invalid data" });
    }
    res.send(errors);
  }
);

module.exports = route;
