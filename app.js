const express = require('express');
const app = express();
const teleBot = require('telebot');
const oauth = require('oauth');
require('dotenv').config();

const bot = new teleBot('378628793:AAHdHbNZpWC7eLwONQqoulGcxquuQMwJPEo');
let myOauth = new oauth.OAuth(
  //using CONSUMER KEY
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
  process.env.CONSUMER_KEY,
  process.env.CONSUMER_SECRET,
  '1.0',
  'http://127.0.0.1:3000/twitter/callback',
  'HMAC-SHA1',
  null
);

bot.on(['text'], msg => {
  // console.log(msg);
  let fromId = msg.from.id;
  let firstName = msg.from.first_name;
  let reply = msg.message_id;
  let text = msg.text;
  if (msg.from.username == 'kuahrawon') {
    myOauth.post(
          `https://api.twitter.com/1.1/statuses/update.json?status=${text}`, //user timeline
          // 'https://api.twitter.com/1.1/statuses/home_timeline.json', //home timeline
          process.env.TOKEN, //test user token
          process.env.TOKEN_SECRET, //test user secret
          text,
          'text',
          function(e, data) {
            if (e) console.error(e);
            // console.log(data);
            // res.send(data);
            // console.log(require('util').inspect(data));

          }
    )
    return bot.sendMessage(fromId, `Hi ${ firstName }! Tweet sent! `, { reply });
  } else {
    return bot.sendMessage(fromId, `Hi ${ firstName }! To use this bot feature, try to type : /trends`, { reply });
  }


})


bot.connect();

app.listen(3000, ()=>{
  console.log('run...');
})