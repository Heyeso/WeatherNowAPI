
const OpenWeatherDataHandler = (data) => {
  if (data) {
    return {
      sunrise: data.current.sunrise,
      sunset: data.current.sunrise,
      temperature: data.current.temp,
      weather: {
        main: data.current.weather[0].main,
        description: data.current.weather[0].description,
      },
      daily: [
        {
          temperature: {
            day: data.daily[0].temp.day,
            night: data.daily[0].temp.night,
          },
          weather: {
            main: data.daily[0].weather[0].main,
            description: data.daily[0].weather[0].description,
          },
        },
        {
          temperature: {
            day: data.daily[1].temp.day,
            night: data.daily[1].temp.night,
          },
          weather: {
            main: data.daily[1].weather[0].main,
            description: data.daily[1].weather[0].description,
          },
        },
        {
          temperature: {
            day: data.daily[2].temp.day,
            night: data.daily[2].temp.night,
          },
          weather: {
            main: data.daily[2].weather[0].main,
            description: data.daily[2].weather[0].description,
          },
        },
        {
          temperature: {
            day: data.daily[3].temp.day,
            night: data.daily[3].temp.night,
          },
          weather: {
            main: data.daily[3].weather[0].main,
            description: data.daily[3].weather[0].description,
          },
        },
        {
          temperature: {
            day: data.daily[4].temp.day,
            night: data.daily[4].temp.night,
          },
          weather: {
            main: data.daily[4].weather[0].main,
            description: data.daily[4].weather[0].description,
          },
        },
        {
          temperature: {
            day: data.daily[5].temp.day,
            night: data.daily[5].temp.night,
          },
          weather: {
            main: data.daily[5].weather[0].main,
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
      weather: {
        main: data.weather[0].main,
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
