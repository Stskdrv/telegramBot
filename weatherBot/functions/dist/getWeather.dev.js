"use strict";

var axios = require("axios");

var getWeather = function getWeather(params) {
  return regeneratorRuntime.async(function getWeather$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          return _context.abrupt("return", axios.get("http://api.weatherstack.com/current", {
            params: params
          }).then(function (response) {
            var apiResponse = response.data;
            return "Here is weather for you: ".concat(apiResponse.location.localtime, ": temprature: ").concat(apiResponse.current.temperature, ", wind: ").concat(apiResponse.current.wind_speed);
          })["catch"](function (error) {
            return "Oh, we run into a problem: ".concat(error, ". It seems like you insert incorrect name of city, please try again!");
          }));

        case 4:
          _context.prev = 4;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", _context.t0);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 4]]);
};

exports.getWeather = getWeather;