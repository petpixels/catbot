// When it says secret, it really kind of means secret...
// so let's put it right at the top of this file here
bot_secret_token = "NTUxMjYzMzYzODg0MTIyMTIy.D1vn8Q.GPZqVzIqseOyhWqiM72vZ22qejs"
const uuid = require('uuid')
const id = uuid.v1()

const catbot = require("./catbot-functions")

const Discord = require('discord.js')
const client = new Discord.Client()

const catbotUserID = "CatBot#8780"

// channels (probably shouldn't be hardcoded)
const chan_general = "421090801393598466"
const chan_catbot = "551271365508857866"
const chan_cleverbot = "548078165936046080"

const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file');

const fs = require('fs');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

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

process.on('uncaughtException', function(err) {
  logger.debug(err)

  // set discord client "now playing"
  client.user.setActivity(catbot.play("Dead"))
});

client.on('ready', () => {

  logger.info("Connected as " + client.user.tag)

  var startPlaying = catbot.play();
  // set discord client "now playing"
  client.user.setActivity(startPlaying)
  logger.info("Now playing " + startPlaying)

  // List servers the bot is connected to
  /*
  console.log("Servers:")
  client.guilds.forEach((guild) => {
      console.log(" - " + guild.name)

      // List all channels
      guild.channels.forEach((channel) => {
          console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
      })
  })
  */

  var generalChannel = client.channels.get(chan_general)
  var catbotChannel = client.channels.get(chan_catbot)

  // say hello
  var sayHello = catbot.reply()
  if (sayHello) {
    // 5% chance of failure
    catbotChannel.send(sayHello)
  }
  logger.info("#catbot: " + sayHello)
})

client.on('messageDelete', (receivedMessage) => {
  receivedMessage.channel.send("Mao")
  logger.info("<" + receivedMessage.channel.id + "> @catbot: Mao")
  logger.info("Deleted message: \"" + receivedMessage + "\"")
})

client.on('guildMemberAdd', msg => {
  var newUserGreeting = catbot.reply();
  msg.guild.channels.get(chan_general).send(newUserGreeting)

  logger.info("New User: " + msg)
  logger.info("<" + receivedMessage.channel.id + "> @catbot: " + newUserGreeting)

})

client.on('message', (receivedMessage) => {
  var replyRequired = false

  // Prevent bot from responding to its own messages
  if (receivedMessage.author == client.user) { return } // catch and release

  // In the catbot channel
  if ((receivedMessage.channel.id == chan_catbot) || (receivedMessage.channel.id == chan_cleverbot)) {
    replyRequired = true

    // Check if the bot's user was tagged in the message
    if (receivedMessage.content.includes(client.user.toString())) {
      // Send acknowledgement message
      logger.info("Tagged message received: " + receivedMessage.content)
      var cb_input = receivedMessage.content.toLowerCase()

      var cb_msg = catbot.reply(cb_input)
      receivedMessage.channel.send(cb_msg)
    }

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
      if (cb_input.includes("oink"))      { cb_output.push("Oink!"); outputFlag = true }
      if (cb_input.includes("quack"))     { cb_output.push("Quack!"); outputFlag = true }

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
              console.log("Not meow: " + retString)

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

          if (retString) {
            receivedMessage.channel.send(retString)
          }
        }
      }
    }
  } else {
    // Check if the bot's user was tagged in the message
    if (receivedMessage.content.includes(client.user.toString())) {
      // Send acknowledgement message
      logger.info("Tagged message received from @" + client.user.toString() + ": " + receivedMessage.content)
      var cb_input = receivedMessage.content.toLowerCase()

      var cb_msg = catbot.reply(cb_input)
      logger.info("<" + receivedMessage.channel.id + "> @catbot: " + cb_msg)

      receivedMessage.channel.send(cb_msg)
    }

    // React to "cat" in messages outside of the catbot channel
    var catEmoji = catbot.react(receivedMessage.content)
    if (catEmoji) {
      for (var i = 0; i < catEmoji.length; i++) {
        receivedMessage.react(catEmoji[i])
      }
    }

    // Cat always replies to direct messages outside of catbot channel
    // I wonder how long that's going to last...
    if (receivedMessage.content.includes("551263363884122122")) {
      console.log('@tagged')
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

  // Random global meow
  var randomGlobalReply = Math.random();
  if (randomReply < .05) {
    var cb_msg = catbot.reply(receivedMessage.content)
    receivedMessage.channel.send(cb_msg)
  }


  // console.log(receivedMessage.channel.id)
})

client.login(bot_secret_token)
