const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const openWeather = require("./routes/openweather");

const app = express();

//PORT
const port = process.env.PORT || 3000;

//Rate Limiting
const limit = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 5,
});

// app.use(limit);
app.set("trust proxy", 1);

//Cors
app.use(
  cors({
    origin: `${process.env.ORIGIN}`,
    methods: ["GET"],
  })
);

//Open Weather API Route
app.use("/api/weather", openWeather);

app.use((req, res) => {
  res
    .status(404)
    .send({
      message: "The server has not found anything matching the Request-URI.",
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.........`);
});
