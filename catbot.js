const bot_secret = require('./lib/bot-secret')
var catbot = require('./lib/bot');

var cat = new catbot()

const discord = require('discord.js')
const client = new discord.Client()

//const catbot = require("./lib/catbot-functions")
const catbotUserID = "CatBot#8780"

// channels (probably shouldn't be hardcoded)
// maybe create a clever algorithm that searches for a channel named catbot
const chan_general = "421090801393598466"
const chan_catbot = "551271365508857866"
const chan_cleverbot = "548078165936046080"

const fs = require('fs');
const path = require('path');
const request = require('request');

/*
process.on('uncaughtException', function(err) {
  logger.debug(err)

  // set discord client "now playing"
  client.user.setActivity(catbot.play("Dead"))
});
*/
client.on('ready', () => {
	var sayHello = true
	var catChannel

	cat.name("Cat")
	cat.default_reply("Meow")
	cat.keywords("cat,kitten")
	cat.rating("G")
	cat.odds(.5)
	cat.log("Connected as " + client.user.tag)

	// locate catbot channel
	client.guilds.forEach((guild) => {
		guild.channels.forEach((channel) => {
			//console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
			if (channel.name.includes("catbot")) {
				catChannel = channel
				// cat.channel(channel) // this doesn't work and I don't know why
			}
		})
	})

	// set discord client "now playing"
	client.user.setActivity(cat.play())

	// say hello
	if (sayHello) { cat.say("Meow", catChannel) }

})

// Rat on people who delete messages and save a log of it
client.on('messageDelete', (receivedMessage) => {
  cat.say("Mao")
  cat.log("Deleted message: \"" + receivedMessage + "\"")
})

// Welcome new members
client.on('guildMemberAdd', msg => {
	// locate catbot channel
	var genChannel
	client.guilds.forEach((guild) => {
		guild.channels.forEach((channel) => {
			//console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
			if (channel.name.includes("general")) {
				genChannel = channel
				// cat.channel(channel) // this doesn't work and I don't know why
			}
		})
	})

	cat.reply(msg.guild.channels.get(genChannel));

  cat.log("New User: " + msg)
  cat.log("<" + receivedMessage.channel.id + "> @catbot: " + newUserGreeting)

})

// Reply to messages
client.on('message', (receivedMessage) => {
  var replyRequired = false
  var suppressOutput = false;

  // Prevent bot from responding to its own messages
  if (receivedMessage.author == client.user) { return } // catch and release


	var msg = receivedMessage.content;
	emu.log(receivedMessage.channel + msg)

	if (receivedMessage.content.includes("cat")) {
		receivedMessage.react("🐤") // random cat emoji
	}

	// Check if the bot's user was tagged in the message
	// Always reply to messages from any channel
	if (receivedMessage.isMentioned(client.user)) {
		// Get acknowledgement message from catbot
		var direct_input = receivedMessage.content.toLowerCase()
		var direct_output = "Meow."

		// Log acknowledgement message
		var msg = receivedMessage.content.toLowerCase();

		// Really need to modularize this function... (Done!)
		if (msg.includes("!gif")) {
			silent = true
			cat.gif(receivedMessage.channel, msg);
		}

		if (msg.includes("!sticker")) {
			silent = true
			cat.sticker(receivedMessage.channel, msg);
		}

		if (msg.includes("!play")) {
			silent = true
			cat.play(msg)
		}

		if (cb_input.includes("!treat")) {
			silent = true
			receivedMessage.channel.send(catbot.randomTreatEmoji())
		}

		// Pineapple
		if ((cb_input.includes("!pineapple")) || (cb_input == "🍍")) {
			silent = true
			receivedMessage.channel.send("🍍")
		}

		// Fish
		if (cb_input.includes("!fish")) {
			silent = true
			receivedMessage.channel.send(catbot.randomFishEmoji())
		}


		if (!(silent)) {
			emu.reply(receivedMessage.channel, receivedMessage.content)
		}
	} else {


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
      cat.log("#catbot: " + receivedMessage.content)

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
      if (cb_output) {
        cat.log("Potential output messages: " + cb_output)
      }

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

          cat.log("<" + receivedMessage.channel.id + "> @catbot: " + retString)

          if (retString && (!(suppressOutput))) {
            cat.say(receivedMessage.channel, retString)
          }

          // log suppressed message
          if (retString && (suppressOutput)) {
            cat.log("<" + receivedMessage.channel.id + "> @catbot: (Message Suppressed) " + retString)
          }
        }
      }
    }
  } else {
    // React to "cat" in messages outside of the catbot channel
    // This should probably be a different bot.
    /*
		var catEmoji = catbot.react(receivedMessage.content)
    if (catEmoji) {
      for (var i = 0; i < catEmoji.length; i++) {
        logger.info("Reacted to: <" + receivedMessage.channel.id + "> " + receivedMessage.content + " with emoji " + catEmoji[i])
        receivedMessage.react(catEmoji[i])
      }
    }
		*/

    // Cat always replies to direct messages in the catbot channel
    // I wonder how long that's going to last...
    if (receivedMessage.content.includes("551263363884122122")) { // why?
      cat.log('@tagged')
      cat.reply(receivedMessage.channel, receivedMessage.content)
      //receivedMessage.channel.send(cb_msg)
    }
  }

  // Check if the bot's user was tagged in the message
  if (receivedMessage.content.includes(client.user.toString())) {
    // Send acknowledgement message
    outputFlag = true
    cat.reply(receivedMessage.channel, receivedMessage.content)
  }

  // Random global meom
  var randomGlobalReply = Math.random();
  if (randomGlobalReply < .05) {
		cat.reply(receivedMessage.channel, receivedMessage.content)
    cat.log("Random Global Reply: " + cb_msg + " to " + receivedMessage.content)
    receivedMessage.channel.send(cb_msg)
  }

  // console.log(receivedMessage.channel.id)
})

client.login(bot_secret.bot_secret_token)
