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
      feels_like: data.current.feels_like,
      wind_speed: data.current.wind_speed,
      weather: {
        main: Atmosphere(data.current.weather[0].id)
          ? "Atmosphere"
          : data.current.weather[0].main,
        description: data.current.weather[0].description,
      },
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
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
      temperature: data.main.temp,
      feels_like: data.main.temp,
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
