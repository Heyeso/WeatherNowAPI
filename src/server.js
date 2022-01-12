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
    sunrise: 1641817537,
    sunset: 1641852057,
    temperature: 273.5,
    feels_like: 270.82,
    wind_speed: 2.24,
    weather: {
      main: "Clouds",
      description: "few clouds",
    },
    daily: [
      {
        temperature: {
          max: 276.26,
          min: 269.56,
        },
        weather: {
          main: "Clouds",
          description: "few clouds",
        },
      },
      {
        temperature: {
          max: 269.46,
          min: 266.07,
        },
        weather: {
          main: "Clouds",
          description: "scattered clouds",
        },
      },
      {
        temperature: {
          max: 277.68,
          min: 269.08,
        },
        weather: {
          main: "Clouds",
          description: "few clouds",
        },
      },
      {
        temperature: {
          max: 278.62,
          min: 273.15,
        },
        weather: {
          main: "Clouds",
          description: "overcast clouds",
        },
      },
      {
        temperature: {
          max: 275.23,
          min: 263.66,
        },
        weather: {
          main: "Clear",
          description: "clear sky",
        },
      },
      {
        temperature: {
          max: 267.23,
          min: 262.3,
        },
        weather: {
          main: "Clouds",
          description: "overcast clouds",
        },
      },
      {
        temperature: {
          max: 271.92,
          min: 265.98,
        },
        weather: {
          main: "Clouds",
          description: "overcast clouds",
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
