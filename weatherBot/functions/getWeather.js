const axios = require("axios");

const getWeather = async (params) => {
  try {
    return axios.get("http://api.weatherstack.com/current", {params})
        .then((response) => {
            const apiResponse = response.data;
            return `Here is weather for you: ${apiResponse.location.localtime}: temprature: ${apiResponse.current.temperature}, wind: ${apiResponse.current.wind_speed}`;
        }).catch((error) => {
            return `Oh, we run into a problem: ${error}. It seems like you insert incorrect name of city, please try again!`
        });
  } catch (e) {
    return e;
  }
};

exports.getWeather = getWeather;

