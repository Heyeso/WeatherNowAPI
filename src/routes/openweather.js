var express = require("express");
var router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log("Time: ", new Date().toUTCString());
  next();
});

// define the home page route
router.get("/", (req, res) => {
  res.send("Birds home page");
});
// define the about route
router.get("/about", (req, res) => {
  res.send("About birds");
});

module.exports = router;