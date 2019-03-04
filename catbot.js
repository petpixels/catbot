// When it says secret, it really kind of means secret...
// so let's put it right at the top of this file here
const catbot_secret = require("./catbot-secret")
const bot_secret_token = catbot_secret.bot_secret_token

const Discord = require('discord.js')
const client = new Discord.Client()

const catbot = require("./catbot-functions")
const catbotUserID = "CatBot#8780"

// channels (probably shouldn't be hardcoded)
// maybe create a clever algorithm that searches for a channel named catbot
const chan_general = "421090801393598466"
const chan_catbot = "551271365508857866"
const chan_cleverbot = "548078165936046080"

const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const fs = require('fs');
const path = require('path');
const request = require('request');

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) { fs.mkdirSync(logDir); }

// const filename = path.join(logDir, 'catbot.log');
const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/catbot-%DATE%.log`,
  datePattern: 'YYYY-MM-DD'
});

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          info => `${info.timestamp} ${info.level}: ${info.message}`
        )
      )
    }),
    dailyRotateFileTransport
    //new transports.File({ filename })
  ]
});
/*
process.on('uncaughtException', function(err) {
  logger.debug(err)

  // set discord client "now playing"
  client.user.setActivity(catbot.play("Dead"))
});
*/
client.on('ready', () => {
  var generalChannel = client.channels.get(chan_general)
  var catbotChannel = client.channels.get(chan_catbot)

  logger.info("Connected as " + client.user.tag)

  // set discord client "now playing"
  var startPlaying = catbot.play();
  client.user.setActivity(startPlaying)
  logger.info("Now playing " + startPlaying)

  // say hello on boot
  var sayHello = catbot.reply()
  var saidHello = false;
  if (sayHello) {
    // bot stays quiet in dev mode because
    // it gets rebooted alot
    if (env != "development") {
      catbotChannel.send(sayHello)
      saidHello = true;
    }

  }
  logger.info("#catbot: " + sayHello)
  logger.info("#catbot: " + saidHello + " | " + sayHello)
})

// Rat on people who delete messages and save a log of it
client.on('messageDelete', (receivedMessage) => {
  receivedMessage.channel.send("Mao")
  logger.info("<" + receivedMessage.channel.id + "> @catbot: Mao")
  logger.info("Deleted message: \"" + receivedMessage + "\"")
})

// Welcome new members
client.on('guildMemberAdd', msg => {
  var newUserGreeting = catbot.reply();
  msg.guild.channels.get(chan_general).send(newUserGreeting)

  logger.info("New User: " + msg)
  logger.info("<" + receivedMessage.channel.id + "> @catbot: " + newUserGreeting)

})

// Reply to messages
client.on('message', (receivedMessage) => {
  var replyRequired = false
  var suppressOutput = false;

  // Prevent bot from responding to its own messages
  if (receivedMessage.author == client.user) { return } // catch and release

  // Check if the bot's user was tagged in the message
  // Always reply to messages from any channel
  if (receivedMessage.isMentioned(client.user)) {
    var silent = false

    // Get acknowledgement message from catbot
    var direct_input = receivedMessage.content.toLowerCase()
    var direct_output = catbot.reply(direct_input)

    // Log acknowledgement message
    logger.info("Tagged message received from " + receivedMessage.author.toString() + ": " + receivedMessage.content)

    var msg = receivedMessage.content;

    // Set catbot status
    // Play (anything)
    if (msg.toLowerCase().includes("!pineapple")) {
      receivedMessage.channel.send("🍍")
      logger.info("<" + receivedMessage.channel.id + "> @catbot: 🍍")
      silent = true // because we already sent a pineapple
    }

    if (msg.toLowerCase().includes("!gif")) {
      var url = "https://api.giphy.com/v1/gifs/random?api_key=9nbVwPCSeiP6Hh17oPJkMCRnYpA99FUO&tag=cat%20kitten&rating=PG";
      silent = true

      request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
      }, (err, res, data) => {
        if (err) {
          logger.info("Giphy request failed")
        } else if (res.statusCode !== 200) {
          logger.info("Giphy request succeeded")
        } else {
          // data is already parsed as JSON:
          var received = data
          // loop through each data object because there can be more than one
          for (var data in received) {
            var giphy = received[data];
            receivedMessage.channel.send(giphy.embed_url)
            logger.info("<" + receivedMessage.channel.id + "> @catbot: " + giphy.embed_url)

            // console.log(data+": "+received[data]);
          }

        }
      });
    }

    if (msg.toLowerCase().includes("!play")) {
      var aPlay = msg.split(" ") // because it's not lowercase
      var tmpPlay = ""
      var playLoc = 0

      // double iteration has got to be a bad idea
      // but if it's stupid and it works it's not stupid
      for (var i = 0; i < aPlay.length; i++) {
        if (aPlay[i] == "!play") {
          playLoc = i+1
        }
      }

      for (var i = playLoc; i < aPlay.length; i++) {
        tmpPlay = tmpPlay + " " + aPlay[i]
      }

      logger.info("Now playing " + tmpPlay)

      // set discord client "now playing"
      client.user.setActivity(tmpPlay)
      silent = true
    }

    // Send acknowledgement message
    if (!(silent)) {
      receivedMessage.channel.send(direct_output)
      logger.info("<" + receivedMessage.channel.id + "> @catbot: " + cb_msg)
    } else {
      logger.info("<" + receivedMessage.channel.id + "> @catbot (silenced): " + cb_msg)
    }

    suppressOutput = true
  }

  // In the catbot channel
  if ((receivedMessage.channel.id == chan_catbot) || (receivedMessage.channel.id == chan_cleverbot)) {
    replyRequired = true

    // get a message from cb
    var cb_input = receivedMessage.content.toLowerCase()
    var cb_msg = catbot.reply(cb_input)
    var cb_output = []


    // incoming message cannot be blank
    if (cb_msg) {
      var outputFlag = false

      // log input message
      logger.info("Input message: " + receivedMessage.content)

      // Catbot meows to all mentions of cat in the catbot channel
      if (cb_input.includes("cat"))       { cb_output.push(cb_msg); outputFlag = true }
      if (cb_input.includes("kitt"))      { cb_output.push(cb_msg); outputFlag = true }

      // It's polite to respond to meow
      if (cb_input.includes("meow"))      { cb_output.push(cb_msg); outputFlag = true }
      if (cb_input.includes("moew"))      { cb_output.push(cb_msg); outputFlag = true }
      if (cb_input.includes("mew"))       { cb_output.push(cb_msg); outputFlag = true }
      if (cb_input.includes("nya"))       { cb_output.push(cb_msg); outputFlag = true }
      if (cb_input.includes("miaou"))     { cb_output.push(cb_msg); outputFlag = true }
      if (cb_input.includes("miao"))      { cb_output.push(cb_msg); outputFlag = true }

      // Manual overrides (catbot commands):
      if (cb_input.includes("purr"))      { cb_output.push("Purrr"); outputFlag = true }
      if (cb_input.includes("moo"))       { cb_output.push("Moooo"); outputFlag = true }
      if (cb_input.includes("oink"))      { cb_output.push("🐽"); outputFlag = true }
      if (cb_input.includes("cluck"))     { cb_output.push("Bwaaak!"); outputFlag = true }

      if (cb_input.includes("quack"))     { cb_output.push("Quack!"); outputFlag = true }
      if (cb_input.includes("duck"))     { cb_output.push("Quack!"); outputFlag = true }
      if (cb_input.includes("fuck"))     { cb_output.push("Quack!"); outputFlag = true }

      // Output Message (if any)

      logger.info("Potential output messages: " + cb_output)

      // if ouput flag is set, check for output
      if (outputFlag) {
        var retString = ""
        var meowCount = 0
        var notMeow = []

        if (cb_output) { // output array must exist
          for (var i = 0; i < cb_output.length; i++) {
            if (cb_output[i].toLowerCase().includes("meow")) {
              // count meows for weighted average
              meowCount++
            } else {
              // save "not meows" for later
              if (cb_output[i]) {
                notMeow.push(cb_output[i])
              }
            }
          }

          // console.log("Meow count: " + meowCount)
          // console.log("Not Meow: " + notMeow)

          if (meowCount > 0) {
            // console.log("Positive Meow Count")
            // There are meows
            var outputRandom = Math.random()
            // weighted probability of # of meows vs other responses
            if (notMeow.length > 0) {
              // console.log("Not meow: " + retString)

              if (outputRandom < (meowCount/10)) {
                // get random other reply
                var ret = Math.floor(Math.random() * notMeow.length)
                retString = notMeow[ret]
              } else {
                retString = catbot.reply(notMeow[ret]) // get generic reply
              }
            } else {
              //output is meow
              retString = "Meow"
            }

          } else {
            // no meows to balance it out, just pick a reply at random
            if (notMeow.length > 0) {
              var ret = Math.floor(Math.random() * notMeow.length)
              retString = notMeow[ret]
            }
          }

          logger.info("<" + receivedMessage.channel.id + "> @catbot: " + retString)

          if (retString && (!(suppressOutput))) {
            receivedMessage.channel.send(retString)
          }

          // log suppressed message
          if (retString && (suppressOutput)) {
            logger.info("<" + receivedMessage.channel.id + "> @catbot: (Message Suppressed) " + retString)
          }
        }
      }
    }
  } else {
    // React to "cat" in messages outside of the catbot channel
    // This should probably be a different bot.
    var catEmoji = catbot.react(receivedMessage.content)
    if (catEmoji) {
      for (var i = 0; i < catEmoji.length; i++) {
        logger.info("Reacted to: <" + receivedMessage.channel.id + "> " + receivedMessage.content + " with emoji " + catEmoji[i])
        receivedMessage.react(catEmoji[i])
      }
    }

    // Cat always replies to direct messages outside of catbot channel
    // I wonder how long that's going to last...
    if (receivedMessage.content.includes("551263363884122122")) { // why?
      logger.info('@tagged')
      var cb_msg = catbot.reply()
      receivedMessage.channel.send(cb_msg)
    }

    // occasionally meow
    if (receivedMessage.content.toLowerCase().includes("cat")) {
      var randomReply = Math.random();
      if (randomReply < .1) {
        var cb_msg = catbot.reply(receivedMessage.content)
        receivedMessage.channel.send(cb_msg)
      }
    }
  }

  // Check if the bot's user was tagged in the message
  if (receivedMessage.content.includes(client.user.toString())) {
    // Send acknowledgement message
    outputFlag = true
    cb_output.push(catbot.reply(receivedMessage.content.toLowerCase()))
  }

  // Random global meom

  var randomGlobalReply = Math.random();
  if (randomReply < .05) {
    var cb_msg = catbot.reply(receivedMessage.content)
    logger.info("Random Global Reply: " + cb_msg + " to " + receivedMessage.content)
    receivedMessage.channel.send(cb_msg)
  }


  // console.log(receivedMessage.channel.id)
})

client.login(bot_secret_token)
