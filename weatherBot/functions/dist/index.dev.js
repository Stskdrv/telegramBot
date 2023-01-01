"use strict";

/* eslint-disable max-len */
var functions = require("firebase-functions");

var _require = require("telegraf"),
    Telegraf = _require.Telegraf;

var _require2 = require("./getWeather"),
    getWeather = _require2.getWeather;

var config = require('./env.json');

if (Object.keys(functions.config()).length) {
  config = functions.config();
}

var bot = new Telegraf(config.service.bot_token);
bot.start(function (ctx) {
  return ctx.reply("Welcome ".concat(ctx.from.first_name));
});
bot.help(function (ctx) {
  return ctx.reply("With this bot you can check the weather! For start please text the name of your city!");
});
bot.on("text", function _callee(ctx) {
  var city, params, apiRes;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          city = ctx.update.message.text;
          params = {
            access_key: config.service.api_key,
            query: city
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(getWeather(params));

        case 4:
          apiRes = _context.sent;
          return _context.abrupt("return", ctx.reply(apiRes));

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
bot.launch();
exports.helloWorld = functions.https.onRequest(function (request, response) {
  functions.logger.info("Hello guys!", {
    structuredData: true
  });
  response.send("First deploy with FireBase!");
});