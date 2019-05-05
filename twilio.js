var Botkit = require('botkit')

// load bot secret file
const bot_secret = require('./lib/bot-secret')

// load common bot functions
var bot = require('./lib/bot')
var gopher = new bot()

// setup connection to twilio
var twilio = Botkit.twiliosmsbot({
    account_sid: bot_secret.twilio_sid,
    auth_token: bot_secret.twilio_auth_token,
    twilio_number: bot_secret.twilio_number,
    debug: true
})

var twilio_send_client = require('twilio')
var twilio_send = new twilio_send_client(bot_secret.twilio_sid, bot_secret.twilio_auth_token)

var twilio_bot = twilio.spawn({})

// setup connection to discord
var discord = require('discord.js')
var discord_bot = new discord.Client()

discord_bot.login(bot_secret.gopher_secret_token)

// setup connection to mongodb 
var mongo_client = require('mongodb').MongoClient
var db_url = bot_secret.mongo_url

// various other dependencies
var os = require('os')

var chan_general = "574103231353847844"
var chan_reply

discord_bot.on('ready', () => {
	// locate catbot channel
    chan_general = getDiscordChannelID("welcome")
    console.log(chan_general.id)
})

discord_bot.on('message', (receivedMessage) => {
    var chan = receivedMessage.channel.name
    var user = receivedMessage.author.username

    if (chan == "welcome") {

    } else {
        var twilio_send_number = "+" + chan
        // don't duplicate messages
        if (chan != user) {            
            twilio_send.messages.create({
                "body": receivedMessage.content,
                "to": twilio_send_number,  // Text this number
                "from": '+1' + bot_secret.twilio_number // From a valid Twilio number
            })
            .then((message) => console.log(message.sid));
        }
    } 
})

twilio.setupWebserver(5000, function(err, server) {
    server.get('/', function(req, res) {
        res.send('Meow.')
    })

    twilio.createWebhookEndpoints(server, twilio_bot, function() {
        console.log('Server is online!')
    })
})

var chan_user
twilio.hears('.*', 'message_received', function(twilio_bot, message) {
    // ^ send this to discord and save the whole message to mongo
    var phone_number = message.from.replace("+","")
    var formatted = phone_number + ": " + message.text

    var chan_user = getDiscordChannelID(phone_number)
    console.log("USER_CHANNEL: " + chan_user)
    
    if (!(chan_user)) {

        discord_bot.guilds.forEach((guild) => {
			//console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
            // console.log(guild)

            var tmp_channel = createDiscordChannel(guild,phone_number).then(
                //console.log("CHANNEL CREATED")
                firstMessageToWelcomeChannel(phone_number,message.text)
            )
            
        })
    } else {
        // change username to phone number for reply
        discord_bot.user.setUsername(phone_number)

        // channel exists already
        chan_user.send(message.text)
    }


    // twilio_bot.reply(message, 'Meow')

    gopher.insertDataMongo(message,"twilio","messages")
    console.log(formatted)
})

// general functions

function firstMessageToWelcomeChannel(phone_number,message) {
    // Use user details from here
    var chan_welcome = getDiscordChannelID("welcome")
    var formatted = "<" + phone_number + "> " + message
    if (chan_welcome) {
        chan_welcome.send(formatted)
    }
}

function getDiscordChannelID(name) {
    var retVal = 0
    discord_bot.guilds.forEach((guild) => {

		guild.channels.forEach((channel) => {
			// console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
			if (channel.name.includes(name)) {
				//catChannel = channel
				retVal  = channel
			}
		})
    })
    
    return retVal
}

function createDiscordChannel(guild,channel_name) {
    return new Promise(function(resolve, reject) {

        guild.createChannel(channel_name,"text",function(err) {
            if (err) {
                reject(err)
            } else {
                resolve("CHANNEL CREATED")
            }
        })
    })
}