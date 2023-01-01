/* eslint-disable max-len */
const functions = require("firebase-functions");
const {Telegraf} = require("telegraf");
const { getWeather } = require("./getWeather");

let config = require('./env.json');

if (Object.keys(functions.config()).length) {
  config = functions.config();
}

const bot = new Telegraf(config.service.bot_token);
bot.start((ctx) => ctx.reply(`Welcome ${ctx.from.first_name}`));
bot.help((ctx) => ctx.reply("With this bot you can check the weather! For start please text the name of your city!"));

bot.on("text", async (ctx) => {
  const city = ctx.update.message.text;
  const params = {
    access_key: config.service.api_key,
    query: city,
  }; 
  const apiRes = await getWeather(params);
  
  return ctx.reply(apiRes);

});

bot.launch();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello guys!", {structuredData: true});
  response.send("First deploy with FireBase!");
});