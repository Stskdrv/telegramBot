const { Telegraf } = require('telegraf');
require('dotenv').config();
const getGifData = require('./getGifData');

const bot = new Telegraf(process.env.TG_TOKEN);


console.log('started');

bot.start(ctx => {
    return ctx.replyWithMarkdown(`Hello ${ctx.from.first_name}! This bot can find images by description for you! 
    Just use it inline in any chat by typing [@getimagebyquerybot](t.me/getImagebyquerybot) <image-name> and you will get your image ;)`);
});

bot.on('inline_query', async (ctx) => {
    const q = ctx.inlineQuery.query;
    console.log(q);
    const res = await getGifData(ctx.inlineQuery.query);

    const data = res.data.data.map(({ type, id, url, embed_url, title }) => {
        return {
            type,
            id,
            gif_url: url,
            thumb_url: embed_url,
            title,
            description: title
        }
    });
    await ctx.telegram.answerInlineQuery(ctx.inlineQuery.id, data);
//     ctx.answerInlineQuery(data);
})

bot.launch()
    .catch(e => e);