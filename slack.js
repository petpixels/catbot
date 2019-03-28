const bot_secret = require('./lib/bot-secret')
var catbot = require('./lib/bot')

var cat_functions = require('./lib/catbot-functions')
var cat = new catbot()

const MongoClient = require('mongodb').MongoClient
const db_url = bot_secret.mongo_url

const slack_api_key = bot_secret.slack

//const catbot = require("./lib/catbot-functions")
const catbotUserID = "UH0QETX3K"

// channels (probably shouldn't be hardcoded)
// maybe create a clever algorithm that searches for a channel named catbot
const chan_general = "421090801393598466"
const chan_catbot = "CH9FCLRM2"
const chan_cleverbot = "548078165936046080"

var catsMeow = []
var naughty_list = []
var catReplies = getCatReplies()
var naughtyList = loadNaughtyList()

/**
 * Define a function for initiating a conversation on installation
 * With custom integrations, we don't have a way to find out who installed us, so we can't message them :(
 */

function onInstallation(bot, installer) {
  if (installer) {
    bot.startPrivateConversation({user: installer}, function (err, convo) {
      if (err) {
        console.log(err)
      } else {
        convo.say('Meow')
        convo.say('You must /invite catbot to a channel')
				convo.say('Meow')
      }
    })
  }
}


/**
 * Configure the persistence options
 */

var config = {};
if (process.env.MONGOLAB_URI) {
  var BotkitStorage = require('botkit-storage-mongo');
  config = {
    storage: BotkitStorage({mongoUri: process.env.MONGOLAB_URI}),
  }
} else {
  config = {
    json_file_store: ((process.env.TOKEN)?'./db_slack_bot_ci/':'./db_slack_bot_a/'), //use a different name if an app or CI
  }
}

/**
 * Are being run as an app or a custom integration? The initialization will differ, depending
 */

if (process.env.TOKEN || process.env.SLACK_TOKEN || slack_api_key) {
  //Treat this as a custom integration
  var customIntegration = require('./lib/custom_integrations');
  var token = (process.env.TOKEN) ? process.env.TOKEN : process.env.SLACK_TOKEN;
	if (slack_api_key) { token = slack_api_key }
  var controller = customIntegration.configure(token, config, onInstallation);

} else if (process.env.CLIENT_ID && process.env.CLIENT_SECRET && process.env.PORT) {
  //Treat this as an app
  var app = require('./lib/apps');
  var controller = app.configure(process.env.PORT, process.env.CLIENT_ID, process.env.CLIENT_SECRET, config, onInstallation);
} else {
  console.log('Error: If this is a custom integration, please specify TOKEN in the environment. If this is an app, please specify CLIENTID, CLIENTSECRET, and PORT in the environment');
  process.exit(1);
}


/**
 * A demonstration for how to handle websocket events. In this case, just log when we have and have not
 * been disconnected from the websocket. In the future, it would be super awesome to be able to specify
 * a reconnect policy, and do reconnections automatically. In the meantime, we aren't going to attempt reconnects,
 * WHICH IS A B0RKED WAY TO HANDLE BEING DISCONNECTED. So we need to fix this.
 *
 * TODO: fixed b0rked reconnect behavior
 */
// Handle events related to the websocket connection to Slack

controller.on('rtm_open', function (bot) {
  console.log('** The RTM api just connected!')
	var sayHello = true

	cat.bot_name = "Cat"
	cat.bot_reply = "Meow"
	cat.bot_keywords = "cat,kitten"
	cat.bot_rating = "G"
	cat.bot_odds = .25
	cat.bot_channel = chan_catbot
	cat.bot_platform = "slack"
	cat.replies = catsMeow
	cat.log("Connected as catbot")

	//console.log("Cat replies on load")
	//console.log(catsMeow)

	// say hello
	if (sayHello) {
		var tmp_msg = {}
		tmp_msg.channel = chan_catbot
		var msg = {}
		msg.text = "Hello"
		bot.reply(tmp_msg,cat_functions.reply(cat,bot,msg))

		//cat.say("Meow", catChannel)
	}

});

controller.on('rtm_close', function (bot) {
    console.log('** The RTM api just closed');
    // you may want to attempt to re-open
});


/**
 * Core bot logic goes here!
 */
// BEGIN EDITING HERE!

controller.on('bot_channel_join', function (bot, message) {
	console.log(cat.bot_reply)
  bot.reply(message, cat.bot_reply)
})

controller.on(['message_deleted', 'message_changed'], function (bot, message) {
	console.log(message.previous_message.user + ": " + message.previous_message.text)

	var deleted = {}
	deleted.date = Math.round(+new Date()/1000) // unix datestamp
	deleted.user = message.previous_message.user
	deleted.text = message.previous_message.text
	deleted.platform = cat.bot_platform

	cat.insertDataMongo(deleted, "catbot", "deleted", {}, {})

	var deletedReply = "Mao"
  bot.reply(message, deletedReply)
})

controller.hears('', ['direct_mention', 'message', 'mention', 'direct_message'], function(bot, message) {
	// reply to all direct messages
	console.log("Message: " + message)
	console.log(message.text)
	var output = cat_functions.reply(cat,bot,message)
	console.log(output)

	if (output) {
		bot.reply(message, output)
	}
})

controller.hears('', ['ambient'], function(bot, message) {
	// reply to ambient messages but only in catbot channel
	if (message.channel == chan_catbot) {
		console.log("Message: " + message.text)
		console.log(message)
		var output = cat_functions.reply(cat,bot,message)
		console.log(output)
		if (output) {
			bot.reply(message, output)
		}
	}
})

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



/**
 * AN example of what could be:
 * Any un-handled direct mention gets a reaction and a pat response!
 */
//controller.on('direct_message,mention,direct_mention', function (bot, message) {
//    bot.api.reactions.add({
//        timestamp: message.ts,
//        channel: message.channel,
//        name: 'robot_face',
//    }, function (err) {
//        if (err) {
//            console.log(err)
//        }
//        bot.reply(message, 'I heard you loud and clear boss.');
//    });
//});
