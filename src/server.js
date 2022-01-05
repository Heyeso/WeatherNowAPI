const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const openWeather = require("./routes/openweather");

const app = express();

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: `${process.env.ORIGIN}`,
    methods: ["GET"],
  })
);

app.use("/api/weather", openWeather);

app.listen(port, () => {
  console.log(`Server is running on port ${port}.........`);
});
