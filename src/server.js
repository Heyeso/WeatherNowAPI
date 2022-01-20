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
    min: 277.03,
    max: 284.14,
    sunrise: 1642594946,
    sunset: 1642630234,
    temperature: 280.54,
    uvi: 0,
    humidity: 63,
    feels_like: 278.26,
    wind_speed: 7.6,
    weather: {
      main: "Clouds",
      description: "scattered clouds",
    },
    hourly: [
      {
        temperature: 280.54,
        humidity: 63,
        weather: {
          main: "Clouds",
          description: "scattered clouds",
        },
      },
      {
        temperature: 280.2,
        humidity: 68,
        weather: {
          main: "Clouds",
          description: "broken clouds",
        },
      },
      {
        temperature: 279.86,
        humidity: 73,
        weather: {
          main: "Clouds",
          description: "broken clouds",
        },
      },
      {
        temperature: 279.41,
        humidity: 80,
        weather: {
          main: "Clouds",
          description: "broken clouds",
        },
      },
      {
        temperature: 278.8,
        humidity: 87,
        weather: {
          main: "Rain",
          description: "light rain",
        },
      },
    ],
    daily: [
      {
        temperature: {
          max: 281.99,
          min: 272.89,
        },
        weather: {
          main: "Rain",
          description: "light rain",
        },
        wind_speed: 6,
        humidity: 57,
      },
      {
        temperature: {
          max: 278.19,
          min: 265.14,
        },
        weather: {
          main: "Snow",
          description: "rain and snow",
        },
        wind_speed: 6.8,
        humidity: 77,
      },
      {
        temperature: {
          max: 268.23,
          min: 262.87,
        },
        weather: {
          main: "Clouds",
          description: "broken clouds",
        },
        wind_speed: 6.2,
        humidity: 66,
      },
      {
        temperature: {
          max: 270.07,
          min: 263.23,
        },
        weather: {
          main: "Clear",
          description: "clear sky",
        },
        wind_speed: 4,
        humidity: 55,
      },
      {
        temperature: {
          max: 274.17,
          min: 267.09,
        },
        weather: {
          main: "Clouds",
          description: "scattered clouds",
        },
        wind_speed: 2.5,
        humidity: 55,
      },
      {
        temperature: {
          max: 275.44,
          min: 270.65,
        },
        weather: {
          main: "Clouds",
          description: "few clouds",
        },
        wind_speed: 2.6,
        humidity: 60,
      },
      {
        temperature: {
          max: 277.69,
          min: 272.64,
        },
        weather: {
          main: "Clouds",
          description: "few clouds",
        },
        wind_speed: 4.4,
        humidity: 78,
      },
    ],
  });
});
app.get("/search", (req, res) => {
  res.send({
    city: "Rosedale",
    country: "US",
    sunrise: 1642508571,
    sunset: 1642543784,
    temperature: 276.07,
    min: 274.95,
    max: 277.2,
    feels_like: 276.07,
    wind_speed: 2.68,
    weather: {
      main: "Clouds",
      description: "broken clouds",
    },
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
