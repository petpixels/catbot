const catbot = require("./catbot-functions")

const Discord = require('discord.js')
const client = new Discord.Client()

const catbotUserID = "CatBot#8780"

// channels (probably shouldn't be hardcoded)
const chan_general = "421090801393598466"
const chan_catbot = "551271365508857866"
const chan_cleverbot = "548078165936046080"

process.on('uncaughtException', function(err) {
  catPlay("dead")
});

function catPlay(msg) {
  var nowPlaying

  if (msg) {
    nowPlaying = msg
  } else {
    var nowPlaying = catbot.randomPlaying()
  }

  console.log(nowPlaying)

  client.user.setActivity(nowPlaying)
}

function catReact(msg) {
  var emoji = []

  if (msg) {
    msg = msg.toLowerCase()
  } else { 
    msg = ""
  }

  if (msg.includes("kitt")) { emoji.push(catbot.randomCatEmoji()) }
  if (msg.includes("fish")) { emoji.push(catbot.randomFishEmoji()) }
  if (msg.includes("treat")) { emoji.push(catbot.randomTreatEmoji()) }
  if (msg.includes("bat")) { emoji.push("🦇") }
  if (msg.includes("rat")) { emoji.push("🐀") }
  if (msg.includes("mouse")) { emoji.push("🐁") }
  if (msg.includes("rabbit")) { emoji.push("🐰") }
  if (msg.includes("bun")) { emoji.push("🐇") }
  if (msg.includes("salad")) { emoji.push("🥗") }
  if (msg.includes("horse")) { emoji.push("🐴") }
  if (msg.includes("cow")) { emoji.push("🐄") }
  if (msg.includes("bot")) { emoji.push("🤖") }
  if (msg.includes("bull")) { emoji.push("🐃") }
  if (msg.includes("pineapple")) { emoji.push("🍍") }
  if (msg.includes("squirrel")) { emoji.push("🐿") }
  if (msg.includes("girl")) { emoji.push("🐿") }
  if (msg.includes("chipmunk")) { emoji.push("🐿") }
  if (msg.includes("poo")) { emoji.push("💩") }
  if (msg.includes("shit")) { emoji.push("💩") }
  if (msg.includes("crap")) { emoji.push("💩") }
  if (msg.includes("turd")) { emoji.push("💩") }
  if (msg.includes("turtle")) { emoji.push("🐢") }
  if (msg.includes("tortoise")) { emoji.push("🐢") }
  if (msg.includes("moses")) { emoji.push("🐢") }
  if ((msg.includes("mail")) || (msg.includes("male"))) { emoji.push("📮") }
  if (msg.includes("post")) { emoji.push("📮") }
  if (msg.includes("duck")) { emoji.push("🦆") }
  if (msg.includes("fuck")) { emoji.push("🦆") }

  if ((msg.includes("cat")) && (!(msg.includes("catbot")))) { emoji.push(catbot.randomCatEmoji()) }
  if ((msg.includes("meow")) || (msg.includes("kitt"))) { emoji.push(catbot.randomCatEmoji()) }
  console.log(emoji)
  return emoji
}

function catReply(msg) {

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
  catMeow[24] = catReact(msg)

  // return a random string sometimes, but mostly meow
  var weightedOdds = Math.random()
  var randomMeow = Math.floor(Math.random() * catMeow.length)
  if (weightedOdds < .25) {
    var retString = catMeow[randomMeow]
  } else {
    retString = "Meow"
  }

  // randomly do nothing, .5% chance
  var randomlyDoNothing = Math.random();
  if (randomlyDoNothing < .05) {
    console.log("Randomly did nothing... like a cat")
    retString = ""
  }

  return retString
}

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)

    catPlay();

    // List servers the bot is connected to
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })

    var generalChannel = client.channels.get(chan_general)
    var catbotChannel = client.channels.get(chan_catbot)
    //catbotChannel.send("Meow")
})

client.on('messageDelete', (receivedMessage) => {
  receivedMessage.channel.send("Mao")
  console.log('deleted');
})

client.on('messageEdit', (receivedMessage) => {
  var cb_msg = catReply(receivedMessage.content)
  receivedMessage.channel.send(cb_msg)
})

client.on('guildMemberAdd', msg => {
  var cb_msg = catReply() // just random
  msg.guild.channels.get(chan_general).send(cb_msg)
})

client.on('message', (receivedMessage) => {
  // Prevent bot from responding to its own messages
  if (receivedMessage.author == client.user) { return } // catch and release 

  // console.log(receivedMessage.channel.id)

  // In the catbot channel
  if ((receivedMessage.channel.id == chan_catbot) || (receivedMessage.channel.id == chan_cleverbot)) {

    // get a message from cb
    var cb_input = receivedMessage.content.toLowerCase()
    var cb_msg = catReply(receivedMessage.content)

    // message cannot be blank
    if (cb_msg && (cb_msg != "do nothing")) {

      console.log(cb_msg)
      var catOutput = "";

      // Catbot meows to all mentions of cat in the catbot channel
      if ((cb_input.includes("cat")) || (cb_input.includes("kitt"))) { receivedMessage.channel.send(cb_msg) }

      // It's polite to respond to meow
      if ((cb_input.includes("meow")) || (cb_input.includes("nyan")))  { receivedMessage.channel.send(cb_msg) }

      // Manual overrides (catbot commands):
      if (cb_input == "purr") { receivedMessage.channel.send("Purrr") }
      if (cb_input == "moo") { receivedMessage.channel.send("Moooo") }

      if (cb_input.includes("treat")) { receivedMessage.channel.send(catbot.randomTreatEmoji()) }
      if (cb_input.includes("fish")) { receivedMessage.channel.send(catbot.randomFishEmoji()) }
      if ((cb_input.includes("pineapple")) || (cb_input == "🍍")) { receivedMessage.channel.send("🍍") }
      if ((cb_input.includes("mail")) || (cb_input.includes("post"))) { receivedMessage.channel.send("📮") }


      // !commands

      // Play (anything)
      if (cb_input.includes("!play")) {
        var aPlay = receivedMessage.content.split(" ")
        var tmpPlay = ""
        for (var i = 1; i < aPlay.length; i++) {
          tmpPlay = tmpPlay + " " + aPlay[i]
        }

        console.log("play: " + tmpPlay)
        catPlay(tmpPlay)
      }

    }

  } else {

    // React to "cat" in messages outside of the catbot channel
    var catEmoji = catReact(receivedMessage.content)
    if (catEmoji) {
      for (var i = 0; i < catEmoji.length; i++) {
        receivedMessage.react(catEmoji[i])
      }
    }

    // Cat always replies to direct messages outside of catbot channel
    // I wonder how long that's going to last...
    if (receivedMessage.content.includes("551263363884122122")) {
      console.log('@tagged')
      var cb_msg = catReply()
      receivedMessage.channel.send(cb_msg)
    }

    // occasionally meow
    if (receivedMessage.content.toLowerCase().includes("cat")) {
      var randomReply = Math.random();
      if (randomReply < .1) {
        var cb_msg = catReply(receivedMessage.content)
        receivedMessage.channel.send(cb_msg)
      }
    }
  }

  // Random global meow
  var randomGlobalReply = Math.random();
  if (randomReply < .05) {
    var cb_msg = catReply(receivedMessage.content)
    receivedMessage.channel.send(cb_msg)
  }

  // Check if the bot's user was tagged in the message
  if (receivedMessage.content.includes(client.user.toString())) {
    // Send acknowledgement message
    var cb_msg = catReply(receivedMessage.content.toLowerCase())
    receivedMessage.channel.send(cb_msg)
  }
})

// Get your bot's secret token from:
// https://discordapp.com/developers/applications/
// Click on your application -> Bot -> Token -> "Click to Reveal Token"
bot_secret_token = "NTUxMjYzMzYzODg0MTIyMTIy.D1vn8Q.GPZqVzIqseOyhWqiM72vZ22qejs"
client.login(bot_secret_token)
