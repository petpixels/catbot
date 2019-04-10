const bot_secret = require('./bot-secret')

var request = require('request')
var Sentiment = require('sentiment')
var sentiment = new Sentiment()

var catsMeow = []

const { Language } = require('node-nlp');
const language = new Language()

module.exports = {

	reply: function(catbot, slackbot, message) {
		console.log(message)

		//console.log("MESSAGE: " + message.text)
		var silent = false
		var send_to_slack

		//receivedMessage.channel +
		//bot.log(msg)

		// Check if the bot's user was tagged in the message
		// Always reply to messages from any channel
		//if (receivedMessage.isMentioned(client.user)) {
		// Get acknowledgement message from catbot

		// Log acknowledgement message
		var tmpMsg = message
		if ((message) && (message != "undefined")) {
			if (message.text) {
				tmpMsg = message.text
			} else {
				if (message.content) {
					tmpMessage = message.content
				}
			}
		}
		var msg = tmpMsg.toLowerCase()


		//get random reply
		var cb_msg = catbot.reply(msg)
		var cb_msg = this.random_reply(catbot)

		console.log("CB_MSG RANDOM REPLY: ")
		console.log(cb_msg)

		var cb_output = []

			// incoming message cannot be blank
			if (cb_msg) {
				var outputFlag = false

				// log input message
				catbot.log("#catbot: " + message.text)

				// Catbot meows to all mentions of cat in the catbot channel
				if (msg.includes("cat"))       { cb_output.push(cb_msg); outputFlag = true }
				if (msg.includes("kitt"))      { cb_output.push(cb_msg); outputFlag = true }

				// It's polite to respond to meow
				if (msg.includes("meow"))      { cb_output.push(cb_msg); outputFlag = true }
				if (msg.includes("moew"))      { cb_output.push(cb_msg); outputFlag = true }
				if (msg.includes("mew"))       { cb_output.push(cb_msg); outputFlag = true }
				if (msg.includes("nya"))       { cb_output.push(cb_msg); outputFlag = true }
				if (msg.includes("miaou"))     { cb_output.push(cb_msg); outputFlag = true }
				if (msg.includes("miao"))      { cb_output.push(cb_msg); outputFlag = true }

				// Manual overrides (catbot commands):
				if (msg.includes("purr"))      { cb_output.push("Purrr"); outputFlag = true }
				if (msg.includes("moo"))       { cb_output.push("Moooo"); outputFlag = true }
				if (msg.includes("oink"))      { cb_output.push("🐽"); outputFlag = true }
				if (msg.includes("cluck"))     { cb_output.push("Bwaaak!"); outputFlag = true }

				if (msg.includes("quack"))     { cb_output.push("Quack!"); outputFlag = true }
				if (msg.includes("duck"))     { cb_output.push("Quack!"); outputFlag = true }
				if (msg.includes("fuck"))     { cb_output.push("Quack!"); outputFlag = true }

				if (!(outputFlag)) {
					//cb_output.push(catbot.reply(msg))
					cb_output.push(this.random_reply(catbot))
					outputFlag = true
				}

				// Output Message (if any)
				if (cb_output) {
					catbot.log("Potential output messages: " + cb_output)
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
									retString = bot.reply(notMeow[ret]) // get generic reply
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
						if (randomFeels < catbot.bot_odds) { // 25% chance
							var catFeels = this.sentiment(message.text)
							if ((catFeels) && (!(silent))) {
								retString = catFeels
							}
						}
					}
				}
			}

		// create final output for slack
		if ((retString) && (!(silent))) {
			send_to_slack = retString
			//receivedMessage.channel.send(retString)
		}

		// Really need to modularize this function... (Done!)
		var aMsg = msg.split(" ")
		for (var i in aMsg) {
			var word = this.stripSymbols(aMsg[i])

			if ((word == "pineapple") || (word.includes("pineapple")) || (word == "🍍")) {
				silent = true
				send_to_slack = "🍍"
			}
			if ((word == "gif") || (word == "gifs") || (word == "giphy")) {
				silent = true
				send_to_slack = ""
				this.catGif(catbot, slackbot, message)
			}
			if ((word == "sticker") || (word == "stickers")) {
				silent = true
				send_to_slack = ""
				this.catGif(catbot, slackbot, message, "sticker")
			}
		}

		catbot.log("<" + message.channel + "> @catbot: " + retString)

		// log suppressed message
		if (send_to_slack && (silent)) {
			catbot.log("<" + message.channel + "> @catbot: (Message Suppressed) " + retString)
		}

		// Random global meow
		var randomGlobalReply = Math.random();
		if ((randomGlobalReply < .05) && (message.channel != catbot.bot_channel)) {
			//catbot.reply(message)
			cb_msg = this.random_reply(catbot)
			catbot.log("Random Global Reply: " + cb_msg + " to " + message.text)
			send_to_slack = cb_msg
		}

		// console.log(receivedMessage.channel.id)
		return send_to_slack
	},
	language_detect: function(msg) {
		var lang // default to english

		if (msg) {
			let guess = language.guessBest(
			  msg // ['de', 'es','fr','it','en','jp'],
			)
			console.log(guess.language)
			lang = guess.alpha2
		}

		return lang
	},
	i18n: function(lang) {

		var global_meow = []
		global_meow.en = "Meow"
		global_meow.vi = "Meo"
		global_meow.fr = "Miaou"
		global_meow.de = "Miau"
		global_meow.hr = "Miau"
		global_meow.fi = "Miau"
		global_meow.ia = "Miau"
		global_meow.lt = "Miau"
		global_meow.ms = "Miaw"
		global_meow.pl = "Miau"
		global_meow.pt = "Miau"
		global_meow.ro = "Miau"
		global_meow.es = "Miau"
		global_meow.zh = "喵"
		global_meow.it = "Miao"
		global_meow.tr = "Miyav"
		global_meow.da = "Miav"
		global_meow.no = "Mjau"
		global_meow.sv = "Mjau"
		global_meow.nl = "Miauw"
		global_meow.el = "νιάου"
		global_meow.tl = "Ngiyaw"
		global_meow.in = "Meong"
		global_meow.bn = "ম্যাঁও"
		global_meow.ky = "Meogre"
		global_meow.ur = "میاؤں"
		global_meow.is = "Mjá"
		global_meow.sk = "Mňau"
		global_meow.cs = "Mňau"
		global_meow.et = "Njäu"
		global_meow.uk = "мяу"
		global_meow.ja = "ニャー"
		global_meow.ko = "야옹"
		global_meow.iw = "מיאו"
		global_meow.ji = "מיאַו"
		global_meow.sr = "мјау"
		global_meow.hu = "Miáú"
		global_meow.ru = "мяу"
		global_meow.sl = "Mijav"
		global_meow.default = "Miaŭ" // esperanto

		var retVal = global_meow["en"]
		if (lang) {
			var tmpLang = global_meow[lang]
			if (tmpLang) {
				retVal = tmpLang
			}
		}

		return retVal
	},
	random_reply: function(catbot) {
		var retString = catbot.bot_reply
		if (catbot) {
			// get a message from cb
			var msg = msg
			if (!(catbot.bot_odds)) {
	      catbot.bot_odds = .25
				console.log("Random Reply: Odds defaulted to 25%")
	    }

	    var roll = Math.random()
			if (roll < catbot.bot_odds) {
				var nowPlaying = []

				var replies = catbot.replies
				//console.log(catbot.replies)
				var randomReply = Math.floor(Math.random() * replies.length)


				for (i in replies) {
					//console.log(nowPlaying[i])
					if (i == randomReply) {
						var thisReply = replies[i]

						console.log("RANDOM: ")
						console.log(thisReply)

						retString = thisReply.reply
					}
				}

				console.log("RANDOM REPLY")
				console.log(retString)

				if (!(retString)) { retString = catbot.bot_reply }
			} else {
				retString = catbot.bot_reply
			}
		}
		return retString
	},
  play: function(msg) {
    var nowPlaying

    if (msg) {
      nowPlaying = msg
    } else {
      var nowPlaying = this.randomPlaying()
    }

    return nowPlaying
  },

  react: function(msg) {
    var emoji = []

    if (msg) {
      msg = msg.toLowerCase()
    } else {
      msg = ""
    }

    if (msg.includes("kitt")) { emoji.push(this.randomCatEmoji()) }
    if (msg.includes("puss")) { emoji.push(this.randomCatEmoji()) }
    if (msg.includes("fish")) { emoji.push(this.randomFishEmoji()) }
    if (msg.includes("treat")) { emoji.push(this.randomTreatEmoji()) }
    if ((msg.includes("cat")) && (!(msg.includes("catbot")))) { emoji.push(this.randomCatEmoji()) }
    if ((msg.includes("meow")) || (msg.includes("kitt"))) { emoji.push(this.randomCatEmoji()) }

    console.log(emoji)
    return emoji
  },

  // *********************
  // * Support functions
  // *********************

  randomFishEmoji: function() {

    var fishReaction = []
    fishReaction[0] = "🐟"
    fishReaction[1] = "🐟"
    fishReaction[2] = "🐟"
    fishReaction[3] = "🐟"
    fishReaction[4] = "🐟"
    fishReaction[5] = "🐠"
    fishReaction[6] = "🐡"
    fishReaction[7] = "🎣"
    fishReaction[8] = "🎣"
    fishReaction[9] = "🎣"

    var randomReaction = Math.floor(Math.random() * fishReaction.length)
    return fishReaction[randomReaction]
  },

  randomCatEmoji: function() {

    var catReaction = []
    catReaction[0] = "😺"
    catReaction[1] = "😸"
    catReaction[2] = "😹"
    catReaction[3] = "😻"
    catReaction[4] = "😼"
    catReaction[5] = "😽"
    catReaction[6] = "🙀"
    catReaction[7] = "😿"
    catReaction[8] = "😾"
    catReaction[9] = "🐱"
    catReaction[10] = "🐈"
    catReaction[11] = "🦁"
    catReaction[12] = "🐯"
    catReaction[13] = "🐅"
    catReaction[14] = "🐆"

    var randomReaction = Math.floor(Math.random() * catReaction.length)
    return catReaction[randomReaction]
  },

  randomTreatEmoji: function() {

    var treatReaction = []
    treatReaction[0] = "🐟"
    treatReaction[1] = "🍦"
    treatReaction[2] = "🍧"
    treatReaction[3] = "🍨"
    treatReaction[4] = "🍩"
    treatReaction[5] = "🍪"
    treatReaction[6] = "🍰"
    treatReaction[7] = "🍫"
    treatReaction[8] = "🍬"
    treatReaction[9] = "🍭"
    treatReaction[10] = "🍮"
    treatReaction[11] = "🍍"
    treatReaction[12] = "🐁"
    treatReaction[13] = "🍡"

    var randomReaction = Math.floor(Math.random() * treatReaction.length)
    return treatReaction[randomReaction]
  },

  randomMeow: function() {
    var catMeow = []
    catMeow[0]  = "Meow?"
    catMeow[1]  = "Purrrr"
    catMeow[2]  = "Mew"
    catMeow[3]  = "Mewtwo"
    catMeow[4]  = "Mrrrrow"
    catMeow[5]  = "Maowow"
    catMeow[6]  = "Mrrrrrreow"
    catMeow[7]  = "Ring-ding-ding-ding-dingeringeding! Wa-pa-pa-pa-pa-pa-pow!"
    catMeow[8]  = "You have cat to be kitten me"
    catMeow[9]  = "Prrrrrrrrr"
    catMeow[10] = "Moo"
    catMeow[11] = "I hate Mondays"
    catMeow[12] = "Feed me"
    catMeow[13] = "I love lasagna"
    catMeow[14] = "I'll see you in another life, when we are both cats"
    catMeow[15] = "Miau"
    catMeow[16] = "Nyan"
    catMeow[17] = "Meo"
    catMeow[18] = "Miaou"
    catMeow[19] = "Miao"
    catMeow[20] = "мяу-мяу"
    catMeow[21] = "мур-мур"
    catMeow[22] = "Woof!"
    catMeow[23] = "ニャー"
    catMeow[24] = this.randomCatEmoji()

    var ret = Math.floor(Math.random() * catMeow.length)
    return catMeow[ret]
  },

  randomPlaying: function() {
    var catPlaying = []
    catPlaying[0]  = "with string"
    catPlaying[1]  = "with a ball of twine"
    catPlaying[2]  = "with a mouse"
    catPlaying[3]  = "piano"
    catPlaying[4]  = "jenga"
    catPlaying[5]  = "cards"
    catPlaying[6]  = "with a ball"
    catPlaying[7]  = "with Australia"
    catPlaying[8]  = "Age of Empires II"
    catPlaying[9]  = "with a toy mouse"
    catPlaying[10] = "chess"
    catPlaying[11] = "at the park"
    catPlaying[12] = "Live at the Apollo"
    catPlaying[13] = "with its tail"
    catPlaying[14] = "with the dog"
    catPlaying[15] = "possum"
    catPlaying[16] = "the odds"
    catPlaying[17] = "with fire"
    catPlaying[18] = "with a fidget spinner"
    catPlaying[19] = "the accordion"
    catPlaying[20] = "flute"
    catPlaying[21] = "Cat Simulator 2000"
    catPlaying[22] = "Strikeforce: Kitty"
    catPlaying[23] = "Skyrim"
    catPlaying[24] = "Lasertag"
    catPlaying[25] = "Pinochle"
    catPlaying[26] = "Bridge"
    catPlaying[27] = "Monopoly"
    catPlaying[28] = "Shuffleboard"
    catPlaying[29] = "Parcheesi"
    catPlaying[30] = "Backgammon"
    catPlaying[31] = "Tic Tac Toe"
    catPlaying[32] = "Snakes and Ladders"
    catPlaying[33] = "Candyland"
    catPlaying[34] = "Battleship"
    catPlaying[35] = "Call of Duty"

    var randomCatPlaying = Math.floor(Math.random() * catPlaying.length)
    var retString = catPlaying[randomCatPlaying]

    return retString
  },
	stripSymbols: function(msg) {
		if (msg) {
		return msg.replace(/[.,\/#!\\?$%\^&\*;:{}=\-_`~()]/g,"").replace(/\n/g," ")
		}
	},
	sentiment: function(msg) {
		// give the cat a mood

		var catSentiment = sentiment.analyze(msg)

		console.log(catSentiment)
		catReturnEmoji = this.sentiment_emoji(catSentiment.score)

		if (catReturnEmoji) {
			console.log("Return: " + catReturnEmoji)
			return catReturnEmoji
		}
	},
	sentiment_emoji: function(score) {
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
	},
	catGif: function(catbot, slackbot, message, sticker = false) {
		var msg = message
		if (message.text) {
			msg = message.text
		}
		var q = this.stripSymbols(msg.replace("gif").replace("sticker"))
	  if (!(q)) { q = "" } // default to empty string

	  var aGif = q.replace(",", " ").split(" ")
	  var gifRating = "G"
	  var gifTag = "cat"
	  var gifLoc = 0
	  var gif

	  // filter out !gif command
	  /*
		for (var i = 0; i < aGif.length; i++) {
	    if (aGif[i] == "gif") {
	      gifLoc = i+1
	    }
	  }
		*/

	  // build giphy query URL
	  for (var i = gifLoc; i < aGif.length; i++) {
			if ((aGif[i]) && (aGif[i] != "undefined"))  {
		    gifTag = gifTag + "%20" + aGif[i]
			}
	  }

	  // default to G-Rated
	  if (!(gifRating)) { gifRating = "G" }

	  var url = "https://api.giphy.com/v1/gifs/random?api_key=" + bot_secret.giphy_api_key + "&tag=" + gifTag + "&rating=" + gifRating
		if (sticker) {
			url = "https://api.giphy.com/v1/stickers/random?api_key=" + bot_secret.giphy_api_key + "&tag=" + gifTag + "&rating=" + gifRating
		}
	  console.log("@Catbot: " + "Giphy request URL: " + url)

	  request.get({
	    url: url,
	    json: true,
	    headers: {'User-Agent': 'request'}
	  }, (err, res, data) => {
	    if (err) {
	      console.log("@catbot: " + "Giphy request failed")
	    } else if (res.statusCode !== 200) {
	      console.log("@catbot: " + "Giphy request succeeded")
	    } else {
	      // data is already parsed as JSON:
	      var received = data
	      // loop through each data object because there can be more than one
	      for (var data in received) {
	        var giphy = received[data]
	        gif = giphy.url //embed_url
					console.log(gif)

	        if (gif) {

						if (catbot.bot_platform == "slack") {
							slackbot.reply(message, gif)
						}

						if (catbot.bot_platform == "discord") {
							slackbot.send(gif)
						}
	          return gif
	        }
	      }
	    }
	  })
	}
}
