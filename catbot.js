const Discord = require('discord.js')
const client = new Discord.Client()

const chan_general = "421090801393598466"
const chan_catbot = "551271365508857866"

function randomEmoji() {

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
  console.log(randomReaction)
  return catReaction[randomReaction]
}

function catPlay() {
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

  var randomPlaying = Math.floor(Math.random() * catPlaying.length)
  var retString = catPlaying[randomPlaying]

  console.log(retString)
  client.user.setActivity(retString)
}

function catReact(msg) {
  return randomEmoji();
}

function catReply(msg) {
  var input_msg = msg.toLowerCase();

  var catMeow = []
  catMeow[0] = "Meow"
  catMeow[1] = "Meow"
  catMeow[2] = "Meow"
  catMeow[3] = "Meow"
  catMeow[4] = "Meow"
  catMeow[5] = "Meow"
  catMeow[6] = "Meow"
  catMeow[7] = "Meow"
  catMeow[8] = "Meow"
  catMeow[9] = "Meow"
  catMeow[10] = "Purrrrr"
  catMeow[11] = "Mew"
  catMeow[12] = "Mao"
  catMeow[13] = "Mrrrrow"
  catMeow[14] = "Maowow"
  catMeow[15] = "Mrrrrrreow"

  var randomMeow = Math.floor(Math.random() * catMeow.length)
  var retString = catMeow[randomMeow]

  console.log(input_msg)

  if (input_msg == "purr") {
    retString = "Purr"
  }

  console.log(retString)
  return retString
}

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    catPlay();

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
    //catbotChannel.send("Meow")
})

client.on('message', (receivedMessage) => {
    // Prevent bot from responding to its own messages
    if (receivedMessage.author == client.user) {
        return
    }

    // console.log(receivedMessage.channel.id)
    // restrict to catbot channel

    if (receivedMessage.channel.id == chan_catbot) {
      var randomEmoji = catReact()
      console.log(randomEmoji)
      receivedMessage.react(randomEmoji)
      // receivedMessage.channel.send("Meow")
    }

    // Check if the bot's user was tagged in the message
    if (receivedMessage.content.includes(client.user.toString())) {
      // Send acknowledgement message
      var cb_msg = catReply(receivedMessage.content)
      receivedMessage.channel.send(cb_msg)
    }



})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "NTUxMjYzMzYzODg0MTIyMTIy.D1ucgQ.mEdKNLgLkufvOyHjUHieLfxvByo"
client.login(bot_secret_token)
