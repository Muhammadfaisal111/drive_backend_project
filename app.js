const express = require("express");
const app = express();
const userRoute = require("./routes/user.routes");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config();
connectDB();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/user", userRoute);
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
