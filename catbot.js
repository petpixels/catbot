const Discord = require('discord.js')
const client = new Discord.Client()

const chan_general = "421090801393598466"
const chan_catbot = "551271365508857866"

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

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

console.log(receivedMessage.channel.id)
    // restrict to catbot channel

    if (receivedMessage.channel.id == chan_catbot) {


    }

    // Check if the bot's user was tagged in the message
    if (receivedMessage.content.includes(client.user.toString())) {
      // Send acknowledgement message
      receivedMessage.channel.send("Meow")
    }


})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "NTUxMjYzMzYzODg0MTIyMTIy.D1ucgQ.mEdKNLgLkufvOyHjUHieLfxvByo"
client.login(bot_secret_token)
