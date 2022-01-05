const express = require("express");
const url = require("url");
var router = express.Router();
require("dotenv").config();
const axios = require("axios").default;

router.get(
  "/",
  (req, res, next) => {
    const Params = url.parse(req.url, true).query;
    if (Params.state) {
      axios
        .get(`${process.env.API_URL_SEARCH}`, {
          params: {
            q: Params.state,
            APPID: process.env.API_KEY,
          },
        })
        .then((response) => response.data)
        .then((data) => res.status(data.cod).send(data))
        .catch((error) =>
          res.status(error.response.status).send({
            ...error.response.data,
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
            APPID: process.env.API_KEY,
          },
        })
        .then((response) => response.data)
        .then((data) => res.status(data.cod).send(data))
        .catch((error) =>
          res.status(error.response.status).send({
            ...error.response.data,
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
