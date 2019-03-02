const Discord = require('discord.js')
const client = new Discord.Client()

const chan_general = "421090801393598466"

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    var generalChannel = client.channels.get(chan_general) // Replace with known channel ID
    generalChannel.send("Meow")
})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "NTUxMjYzMzYzODg0MTIyMTIy.D1ucgQ.mEdKNLgLkufvOyHjUHieLfxvByo"
client.login(bot_secret_token)
