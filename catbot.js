const bot_secret = require('./lib/bot-secret')
var catbot = require('./lib/bot');

var cat_functions = require('./lib/catbot-functions');
var cat = new catbot()

const MongoClient = require('mongodb').MongoClient
const db_url = bot_secret.mongo_url

const discord = require('discord.js')
const client = new discord.Client()

//const catbot = require("./lib/catbot-functions")
const catbotUserID = "CatBot#8780"

// channels (probably shouldn't be hardcoded)
// maybe create a clever algorithm that searches for a channel named catbot
const chan_general = "421090801393598466"
//const chan_catbot = "" "551271365508857866","520744286275239946"
const chan_cleverbot = "548078165936046080"
var chan_catbot = []

const fs = require('fs');
const path = require('path');
const request = require('request');

var Sentiment = require('sentiment');
var sentiment = new Sentiment();

var catsMeow = []
var naughty_list = []

var naughtyList = loadNaughtyList()
var catReplies = getCatReplies()

/*
process.on('uncaughtException', function(err) {
  logger.debug(err)

  // set discord client "now playing"
  client.user.setActivity(catbot.play("Dead"))
});
*/

client.on('ready', () => {
	var sayHello = true

	cat.bot_name = "Cat"
	cat.bot_reply = "Meow"
	cat.bot_keywords = "cat,kitten"
	cat.bot_rating = "G"
	cat.bot_odds = .25
	cat.bot_channel = chan_catbot
	cat.bot_platform = "discord"
	cat.replies = catsMeow
	cat.log("Connected as catbot")

	// locate catbot channel
	client.guilds.forEach((guild) => {

		guild.channels.forEach((channel) => {
			console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
			if (channel.name.includes("catbot")) {
				//catChannel = channel
				chan_catbot.push(channel)
				cat.bot_channel = chan_catbot // this doesn't work and I don't know why
			}
		})
	})

	// set discord client "now playing"
	client.user.setActivity(cat.play())

	for (var i in chan_catbot) {
		var tmpChan = chan_catbot[i]
		//console.log(tmpChan.id)
		if (sayHello) { cat.say("Meow", tmpChan) }
	}
	// say hello

})

// Rat on people who delete messages and save a log of it
client.on('messageDelete', (receivedMessage) => {
  cat.say("Mao", receivedMessage.channel)
  cat.log("Deleted message: \"" + receivedMessage + "\"")

	logDelete(receivedMessage)
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

	var msg = {}
	msg.text = "Hello"
	var greeting = cat_functions.reply(cat, {} ,msg);

  cat.log("New User: " + greeting)
  cat.log("<" + receivedMessage.channel.id + "> @catbot: " + greeting)

})


client.on('messageReactionAdd', (reaction, user) => {
	var username = user.username.toLowerCase()
	if (!(user.bot)) {

		var catFeeling = sentiment.analyze(reaction.emoji.name)
		console.log(reaction.emoji.name)
		console.log(catFeeling.score)

		var msg_author = reaction.message.author.username.toLowerCase()
		if (msg_author.includes("catbot")) {
			var reply
			if (catFeeling.score > 0) {
				var reply = "Yum!"
			}

			if (catFeeling.score < 0) {
				var reply = "Yuck!"
			}

			if (catFeeling.score == 0) {
				reply = cat_functions.reply(reaction.emoji.name)
			}

			var catEmotion = Math.random()
			if ((catEmotion < cat.bot_odds) && (catFeeling.score != 0)) {
				var reply = catEmoji(catFeeling.score)
			}

			console.log("REPLY: ")
			console.log(reply)
			if (reply) {
				var cat_treat = {}
				cat_treat.text = reaction.emoji.name
				cat_treat.user = reaction.message.author.id
				cat_treat.score = catFeeling.score

				logTreat(cat_treat)
				reaction.message.channel.send(reply)
			}
		}
	}
})

// Reply to messages
client.on('message', (receivedMessage) => {
	var silent = false
  var replyRequired = false

  // Prevent bot from responding to its own messages
  if (receivedMessage.author == client.user) { return } // catch and release

	// making a list, checking it once...
	for (var i = 0; i < naughty_list.length; i++) {
		var nl_item = naughty_list[i]
		if (receivedMessage.author.id == nl_item.user) {
			// user is on the naughty list
			console.log(nl_item)
			receivedMessage.react("💩")
		}
	}

	if (receivedMessage.author.bot == true) {

		// if it's the dog
		if (receivedMessage.author.username == "DogBot") {
			var dogMsg = receivedMessage.content.toLowerCase()
			if ((dogMsg.includes("grr")) || (dogMsg.includes("bark"))) {
				// cat logs all negative dog messages
				receivedMessage.channel.fetchMessages({ limit: 2 }).then(messages => {
					lastMessage = messages.last()

					if (!(lastMessage.author.bot)) {
						logMessage(lastMessage)
					}
				})
				.catch(console.error)
			}
		}

		silent = true
		return
	} // ignore bots

	var msg = receivedMessage.content;
	cat.log(receivedMessage.channel + msg)

	if (receivedMessage.content.includes("cat")) {
		// receivedMessage.react("🐤") // random cat emoji
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

		if (msg.includes("!treat")) {
			silent = true
			receivedMessage.channel.send(cat_functions.randomTreatEmoji())
		}

		// Pineapple
		if ((msg.includes("!pineapple")) || (cb_input == "🍍")) {
			silent = true
			receivedMessage.channel.send("🍍")
		}

		// Fish
		if (msg.includes("!fish")) {
			silent = true
			receivedMessage.channel.send(cat_functions.randomFishEmoji())
		}


		if (!(silent)) {
			cat.say(cat_functions.reply(receivedMessage.content),receivedMessage.channel)
		}
	} else {


	}


  // In the catbot channel
	for (var i in chan_catbot) {
		var chan = chan_catbot[i]
		console.log(chan.id)
		if (receivedMessage.channel.id == chan.id) {
			replyRequired = true
		}
	}

	//DM
	if (receivedMessage.channel.type == "dm") {
		replyRequired = true
	}

	console.log(replyRequired)

  if (replyRequired) { //receivedMessage.channel.id == chan_catbot

    // get a message from cb
    var cb_input = receivedMessage.content.toLowerCase()

		var tmp_input = {}
		tmp_input.text = cb_input
    var cb_msg = cat_functions.reply(cat,receivedMessage.channel,tmp_input)
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

			if (!(outputFlag)) {
				var tmpInput = {}
				tmpInput.text = cb_input
				cb_output.push(cat_functions.reply(cat, {}, tmpInput))
				outputFlag = true
			}

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
								var tmpInput = {}
								tmpInput.text = notMeow[ret]
                retString = cat_functions.reply(cat, {}, tmpInput) // get generic reply
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

					// ovrride output with sentiment analysis
					// but only on an overwhelming outpouring of emotion
					// aka a random chance... lol
					var randomFeels = Math.random()
					if (randomFeels < cat.bot_odds) { // 25% chance
						var catFeels = catSentiment(receivedMessage.content)
						if (catFeels) {
							retString = catFeels
						}
					}

          cat.log("<" + receivedMessage.channel.id + "> @catbot: " + retString)

          if ((retString) && (!(silent))) {
            receivedMessage.channel.send(retString)
          }

          // log suppressed message
          if (retString && (silent)) {
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
      cat_functions.reply(cat, {}, receivedMessage.content)
      //receivedMessage.channel.send(cb_msg)
    }
  }

	/*
	var catEmoji = cat_functions.randomCatEmoji()
	if (catEmoji) {
		for (var i = 0; i < catEmoji.length; i++) {
			cat.log("Reacted to: <" + receivedMessage.channel.id + "> " + receivedMessage.content + " with emoji " + catEmoji[i])
			receivedMessage.react(catEmoji[i])
		}
	}
	*/

  // Check if the bot's user was tagged in the message
  if (receivedMessage.content.includes(client.user.toString())) {
    // Send acknowledgement message
    outputFlag = true
    cb_msg = cat_functions.reply(cat, {}, receivedMessage.content)
  }

  // Random global meom
  var randomGlobalReply = Math.random();
  if ((randomGlobalReply < .05) && (receivedMessage.channel.id != chan_catbot)) {
		cat_functions.reply(receivedMessage.channel, receivedMessage.content)
    cat.log("Random Global Reply: " + cb_msg + " to " + receivedMessage.content)
    receivedMessage.channel.send(cb_msg)
  }

  // console.log(receivedMessage.channel.id)
})

function catSentiment(msg) {
	// give the cat a mood

	var catSentiment = sentiment.analyze(msg)

	console.log(catSentiment)
	catReturnEmoji = catEmoji(catSentiment.score)

	if (catReturnEmoji) {
		console.log("Return: " + catReturnEmoji)
		return catReturnEmoji
	}
}

function catEmoji(score) {
	var retEmoji

	var catPositive = ["😺","😸","😻","😹","😽"]
	var catNegative = ["🦁","😼","🙀","😿","😾"]

	//var catReturnEmoji = "🐈"

	// negative emotions
	if (score < 0) {
		if (score >= -5) {
			retEmoji = catNegative[((score -1) * -1)]
		} else {
			retEmoji = catNegative[4]
		}
	}
	//positive emotions
	var catReturnEmoji
	if (score > 0) {
		if (score <= 5) {
			retEmoji = catPositive[score -1]
		} else {
			retEmoji = catPositive[4]
		}
	}

	return retEmoji
}



function logMessage(message) {
	MongoClient.connect(db_url, function(err, client) {
		if (err) throw err

		//var dictionary_db = db.db("emuji")
		const collection = client.db("catbot").collection("messages")
		var msg = {}
		msg.date = Math.round(+new Date()/1000) // unix datestamp
		msg.user = message.author.id
		msg.text = message.content.toString()

		var result = collection.insertOne(msg, function(err,result) {
			if (err) throw err

			console.log("Logged: ")
			console.log(msg)

			return
		})
	})
}

function logTreat(cat_treat) {
	var input_treat = cat_treat
	MongoClient.connect(db_url, function(err, client) {
		if (err) throw err

		//var dictionary_db = db.db("emuji")
		const collection = client.db("catbot").collection("treats")
		var treat = {}
		treat.date = Math.round(+new Date()/1000) // unix datestamp
		treat.user = input_treat.user
		treat.text = input_treat.text
		treat.score = input_treat.score

		var result = collection.insertOne(treat, function(err,result) {
			if (err) throw err

			console.log("Logged: ")
			console.log(msg)

			return
		})
	})

}

function logDelete(message) {
	MongoClient.connect(db_url, function(err, client) {
		if (err) throw err

		//var dictionary_db = db.db("emuji")
		const collection = client.db("catbot").collection("deleted")
		var deleted = {}
		deleted.date = Math.round(+new Date()/1000) // unix datestamp
		deleted.user = message.author.id
		deleted.text = message.content.toString()
		deleted.platform = cat.bot_platform

		var result = collection.insertOne(deleted, function(err,result) {
			if (err) throw err

			console.log("Deleted: ")
			console.log(deleted)

			return
		})
	})
}


function loadNaughtyList(user = "") {
	var query = { }
	if (user) {
		query.user = user
	}

	var formatting = { date:1,user:1,text:1, _id:0}
		var initializePromise = cat.getDataMongo("catbot","messages",query,formatting)
		initializePromise.then(function(result) {
				naughty_list = result
				console.log("Initialized naughty list");
				// Use user details from here
				return result
				resolve(result)
		}, function(err) {
				console.log(err);
		})
}

function getCatReplies() {
	var query = { }
	var formatting = { }
		var initializePromise = cat.getDataMongo("catbot","replies",query,formatting)
		initializePromise.then(function(result) {
				catsMeow = result
				console.log("Initialized cat replies");
				// Use user details from here
				//console.log(catsMeow)
				return result
				resolve(result)
		}, function(err) {
				console.log(err);
		})
}





client.login(bot_secret.bot_secret_token)
