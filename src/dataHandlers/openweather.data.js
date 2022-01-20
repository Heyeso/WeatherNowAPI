const Atmosphere = (code) => {
  if (code >= 700 && code < 800) return true;

  return false;
};
const OpenWeatherDataHandler = (data) => {
  if (data) {
    return {
      sunrise: data.current.sunrise,
      sunset: data.current.sunset,
      temperature: data.current.temp,
      uvi: data.current.uvi,
      humidity: data.current.humidity,
      feels_like: data.current.feels_like,
      wind_speed: parseFloat(parseFloat(((data.current.wind_speed).toFixed(1)) * 2.237).toFixed(1)),
      weather: {
        main: Atmosphere(data.current.weather[0].id)
          ? "Atmosphere"
          : data.current.weather[0].main,
        description: data.current.weather[0].description,
      },
      hourly: [
        {
          temperature: data.hourly[0].temp,
          humidity: data.hourly[0].humidity,
          weather: {
            main: Atmosphere(data.hourly[0].weather[0].id)
              ? "Atmosphere"
              : data.hourly[0].weather[0].main,
            description: data.hourly[0].weather[0].description,
          },
        },
        {
          temperature: data.hourly[1].temp,
          humidity: data.hourly[1].humidity,
          weather: {
            main: Atmosphere(data.hourly[1].weather[0].id)
              ? "Atmosphere"
              : data.hourly[1].weather[0].main,
            description: data.hourly[1].weather[0].description,
          },
        },
        {
          temperature: data.hourly[2].temp,
          humidity: data.hourly[2].humidity,
          weather: {
            main: Atmosphere(data.hourly[2].weather[0].id)
              ? "Atmosphere"
              : data.hourly[2].weather[0].main,
            description: data.hourly[2].weather[0].description,
          },
        },
        {
          temperature: data.hourly[3].temp,
          humidity: data.hourly[3].humidity,
          weather: {
            main: Atmosphere(data.hourly[3].weather[0].id)
              ? "Atmosphere"
              : data.hourly[3].weather[0].main,
            description: data.hourly[3].weather[0].description,
          },
        },
        {
          temperature: data.hourly[4].temp,
          humidity: data.hourly[4].humidity,
          weather: {
            main: Atmosphere(data.hourly[4].weather[0].id)
              ? "Atmosphere"
              : data.hourly[4].weather[0].main,
            description: data.hourly[4].weather[0].description,
          },
        },
      ],
      daily: [
        {
          temperature: {
            max: data.daily[0].temp.max,
            min: data.daily[0].temp.min,
          },
          weather: {
            main: Atmosphere(data.daily[0].weather[0].id)
              ? "Atmosphere"
              : data.daily[0].weather[0].main,
            description: data.daily[0].weather[0].description,
          },
          wind_speed: parseFloat((data.daily[0].wind_speed).toFixed(1)),
          humidity: data.daily[0].humidity,
        },
        {
          temperature: {
            max: data.daily[1].temp.max,
            min: data.daily[1].temp.min,
          },
          weather: {
            main: Atmosphere(data.daily[1].weather[0].id)
              ? "Atmosphere"
              : data.daily[1].weather[0].main,
            description: data.daily[1].weather[0].description,
          },
          wind_speed: parseFloat((data.daily[1].wind_speed).toFixed(1)),
          humidity: data.daily[1].humidity,
        },
        {
          temperature: {
            max: data.daily[2].temp.max,
            min: data.daily[2].temp.min,
          },
          weather: {
            main: Atmosphere(data.daily[2].weather[0].id)
              ? "Atmosphere"
              : data.daily[2].weather[0].main,
            description: data.daily[2].weather[0].description,
          },
          wind_speed: parseFloat((data.daily[2].wind_speed).toFixed(1)),
          humidity: data.daily[2].humidity,
        },
        {
          temperature: {
            max: data.daily[3].temp.max,
            min: data.daily[3].temp.min,
          },
          weather: {
            main: Atmosphere(data.daily[3].weather[0].id)
              ? "Atmosphere"
              : data.daily[3].weather[0].main,
            description: data.daily[3].weather[0].description,
          },
          wind_speed: parseFloat((data.daily[3].wind_speed).toFixed(1)),
          humidity: data.daily[3].humidity,
        },
        {
          temperature: {
            max: data.daily[4].temp.max,
            min: data.daily[4].temp.min,
          },
          weather: {
            main: Atmosphere(data.daily[4].weather[0].id)
              ? "Atmosphere"
              : data.daily[4].weather[0].main,
            description: data.daily[4].weather[0].description,
          },
          wind_speed: parseFloat((data.daily[4].wind_speed).toFixed(1)),
          humidity: data.daily[4].humidity,
        },
        {
          temperature: {
            max: data.daily[5].temp.max,
            min: data.daily[5].temp.min,
          },
          weather: {
            main: Atmosphere(data.daily[5].weather[0].id)
              ? "Atmosphere"
              : data.daily[5].weather[0].main,
            description: data.daily[5].weather[0].description,
          },
          wind_speed: parseFloat((data.daily[5].wind_speed).toFixed(1)),
          humidity: data.daily[5].humidity,
        },
        {
          temperature: {
            max: data.daily[6].temp.max,
            min: data.daily[6].temp.min,
          },
          weather: {
            main: Atmosphere(data.daily[5].weather[0].id)
              ? "Atmosphere"
              : data.daily[6].weather[0].main,
            description: data.daily[5].weather[0].description,
          },
          wind_speed: parseFloat((data.daily[6].wind_speed).toFixed(1)),
          humidity: data.daily[6].humidity,
        },
      ],
    };
  }

  return {
    code: 500,
    message: "Internal Server Error",
  };
};

const OpenWeatherSearchDataHandler = (data) => {
  if (data) {
    return {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      min: data.main.temp_min,
      max: data.main.temp_max,
      feels_like: data.main.temp,
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      wind_speed: data.wind.speed,
      weather: {
        main: Atmosphere(data.weather[0].id)
          ? "Atmosphere"
          : data.weather[0].main,
        description: data.weather[0].description,
      },
    };
  }

  return {
    code: 500,
    message: "Internal Server Error",
  };
};

module.exports = {
  OpenWeatherDataHandler,
  OpenWeatherSearchDataHandler,
};
