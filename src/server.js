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
    city: "Perry Hall",
    country: "US",
    sunrise: 1641990309,
    sunset: 1642024979,
    temperature: 277.83,
    feels_like: 277.83,
    wind_speed: 0.45,
    weather: {
      main: "Clear",
      description: "clear sky",
    },
    daily: [
      {
        temperature: {
          max: 278.27,
          min: 269.21,
        },
        weather: {
          main: "Clouds",
          description: "broken clouds",
        },
        wind_speed: 5.66,
      },
      {
        temperature: {
          max: 279.79,
          min: 274.91,
        },
        weather: {
          main: "Clouds",
          description: "overcast clouds",
        },
        wind_speed: 2.21,
      },
      {
        temperature: {
          max: 278.51,
          min: 267.16,
        },
        weather: {
          main: "Clouds",
          description: "scattered clouds",
        },
        wind_speed: 8.73,
      },
      {
        temperature: {
          max: 268.44,
          min: 265.24,
        },
        weather: {
          main: "Clouds",
          description: "overcast clouds",
        },
        wind_speed: 8.09,
      },
      {
        temperature: {
          max: 275.54,
          min: 263.47,
        },
        weather: {
          main: "Snow",
          description: "rain and snow",
        },
        wind_speed: 11.82,
      },
      {
        temperature: {
          max: 280.41,
          min: 271.95,
        },
        weather: {
          main: "Snow",
          description: "rain and snow",
        },
        wind_speed: 9.03,
      },
      {
        temperature: {
          max: 271.94,
          min: 269.14,
        },
        weather: {
          main: "Clouds",
          description: "rain and snow",
        },
        wind_speed: 8.57,
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
