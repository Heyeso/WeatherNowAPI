const express = require("express");
const url = require("url");
var router = express.Router();
require("dotenv").config();
const axios = require("axios").default;
const {
  OpenWeatherDataHandler,
  OpenWeatherSearchDataHandler,
} = require("./../dataHandlers/openweather.data");

router.get(
  "/",
  (req, res, next) => {
    const Params = url.parse(req.url, true).query;
    if (Params.state || (Params.lat && Params.lon)) {
      let customParams = {};
      if (Params.state) customParams = { q: Params.state };
      if (Params.lat && Params.lon)
        customParams = {
          lat: Params.lat,
          lon: Params.lon,
        };
      axios
        .get(`${process.env.API_URL_SEARCH}`, {
          params: {
            ...customParams,
            APPID: process.env.API_KEY,
          },
        })
        .then((response) => response.data)
        .then((data) => {
          if (Params.state)
            res.status(data.cod).send(OpenWeatherSearchDataHandler(data));
          if (Params.lat && Params.lon) {
            res.locals.Location = {
              city: data.name,
              country: data.sys.country,
              min: data.main.temp_min,
              max: data.main.temp_max,
            };
            next();
          }
        })
        .catch((error) =>
          error.response
            ? res.status(error.response.status).send({
                ...error.response.data,
              })
            : res.status(500).send({
                error: error,
                message:
                  "The server encountered an unexpected condition which prevented it from fulfilling the request.",
              })
        );
    } else next();
  },
  (req, res, next) => {
    const Params = url.parse(req.url, true).query;
    if (Params.lat && Params.lon) {
      axios
        .get(`${process.env.API_URL}`, {
          params: {
            lat: Params.lat,
            lon: Params.lon,
            exclude: "minutely,alerts",
            APPID: process.env.API_KEY,
          },
        })
        .then((response) => {
          res.status(response.status);
          return response.data;
        })
        .then((data) =>
          res.send({ ...res.locals.Location, ...OpenWeatherDataHandler(data) })
        )
        .catch((error) =>
          error.status
            ? res.status(400).send({
                ...error.status,
              })
            : res.status(500).send({
                error: error.message,
                message:
                  "The server encountered an unexpected condition which prevented it from fulfilling the request.",
              })
        );
    } else next();
  },
  (req, res) => {
    res.status(400).send({
      message: "The request cannot be fulfilled due to bad syntax.",
    });
  }
);

module.exports = router;
