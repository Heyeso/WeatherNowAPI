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
const limitPerDay = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 60,
  handler: function (req, res /*next*/) {
    return res.status(429).send({
      error:
        "Rate limit exhausted by this IP, please try again after 24 hours.",
    });
  },
});

const limitPerSec = rateLimit({
  windowMs: 3 * 1000,
  max: 1,
  handler: function (req, res /*next*/) {
    return res.status(429).send({
      error: "Too many requests, please try again after a few seconds.",
    });
  },
});

app.use(limitPerSec);
app.use(limitPerDay);
app.set("trust proxy", 1);

//Cors
app.use(
  cors({
    origin: `${process.env.ORIGIN}`,
    methods: ["GET"],
    allowedHeaders: ["X-RateLimit-Limit", "X-RateLimit-Remaining"],
    exposedHeaders: ["X-RateLimit-Limit", "X-RateLimit-Remaining"],
  })
);

app.get("/", (req, res) => {
  res.send({
    city: "Carney",
    country: "US",
    sunrise: 1641558363,
    sunset: 1641592682,
    temperature: 271.8,
    weather: {
      main: "Snow",
      description: "snow",
    },
    daily: [
      {
        temperature: {
          max: 271.99,
          min: 266.94,
        },
        weather: {
          main: "Snow",
          description: "snow",
        },
      },
      {
        temperature: {
          max: 271.4,
          min: 265.18,
        },
        weather: {
          main: "Clear",
          description: "clear sky",
        },
      },
      {
        temperature: {
          max: 277.71,
          min: 270.04,
        },
        weather: {
          main: "Rain",
          description: "moderate rain",
        },
      },
      {
        temperature: {
          max: 276.55,
          min: 268.44,
        },
        weather: {
          main: "Clouds",
          description: "broken clouds",
        },
      },
      {
        temperature: {
          max: 268.46,
          min: 265.87,
        },
        weather: {
          main: "Clouds",
          description: "scattered clouds",
        },
      },
      {
        temperature: {
          max: 272.88,
          min: 266.21,
        },
        weather: {
          main: "Clouds",
          description: "broken clouds",
        },
      },
      {
        temperature: {
          max: 276.62,
          min: 271.93,
        },
        weather: {
          main: "Clouds",
          description: "broken clouds",
        },
      },
    ],
  });
});

//Open Weather API Route
app.use("/api/weather", openWeather);

app.use((req, res) => {
  res.status(404).send({
    message: "The server has not found anything matching the Request-URI.",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.........`);
});
