const Discord = require('discord.js')
const client = new Discord.Client()

const chan_general = "421090801393598466"
const chan_catbot = "551271365508857866"

function randomCatEmoji() {

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

function randomFishEmoji() {

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
  console.log(randomReaction)
  return fishReaction[randomReaction]

}

function randomTreatEmoji() {

  var treatReaction = []
  treatReaction[0] = "🐟"
  treatReaction[1] = "🐟"
  treatReaction[2] = "🐟"
  treatReaction[3] = "🐟"

  var randomReaction = Math.floor(Math.random() * treatReaction.length)
  console.log(randomReaction)
  return treatReaction[randomReaction]

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
  catPlaying[9]  = "with a toy mouse"
  catPlaying[10] = "chess"
  catPlaying[11] = "at the park"
  catPlaying[12] = "Live at the Apollo"
  catPlaying[13] = "with its tail"
  catPlaying[14] = "with the dog"
  catPlaying[15] = "possum"
  catPlaying[16] = "with a cucumber"
  catPlaying[17] = "with a crab"
  catPlaying[18] = "with a fidget spinner"
  catPlaying[19] = "the accordion"
  catPlaying[20] = "flute"
  catPlaying[21] = "Cat Simulator 2000"
  catPlaying[22] = "Strikeforce: Kitty"
  catPlaying[23] = "Skyrim"
  catPlaying[24] = "Lasercat"

  var randomPlaying = Math.floor(Math.random() * catPlaying.length)
  var retString = catPlaying[randomPlaying]

  console.log(retString)
  client.user.setActivity(retString)
}

function catReact(msg) {
  var emoji = []
  msg = msg.toLowerCase()

  if (msg.includes("fish")) { emoji.push(randomFishEmoji()) }
  if (msg.includes("treat")) { emoji.push(randomTreatEmoji()) }
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

  if ((msg.includes("cat")) || (msg.includes("meow"))) { emoji.push(randomCatEmoji()) }
  if ((msg.includes("squirrel")) || (msg.includes("chipmunk"))) { emoji.push("🐿") }
  if ((msg.includes("shit")) || (msg.includes("poo")) || (msg.includes("crap"))) { emoji.push("💩") }
  if ((msg.includes("turtle")) || (msg.includes("tortoise")) || (msg.includes("moses"))) { emoji.push("🐢") }

  console.log(emoji)
  return emoji
}

function catReply(msg) {
  var input_msg = msg.toString().toLowerCase();

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
  catMeow[9] = "Meow?"
  catMeow[10] = "Purrrr"
  catMeow[11] = "Mew"
  catMeow[12] = "Mewtwo"
  catMeow[13] = "Mrrrrow"
  catMeow[14] = "Maowow"
  catMeow[15] = "Mrrrrrreow"
  catMeow[16] = "Ring-ding-ding-ding-dingeringeding! Wa-pa-pa-pa-pa-pa-pow!"
  catMeow[17] = "You have cat to be kitten me"
  catMeow[18] = "Prrrrrrrrr"
  catMeow[19] = "Moo"
  catMeow[20] = "Meow"
  catMeow[21] = "Meow"
  catMeow[22] = "Meow"
  catMeow[23] = "Meow"
  catMeow[24] = "Meow"
  catMeow[25] = "Meow"
  catMeow[26] = "Meow"
  catMeow[27] = "Meow"
  catMeow[28] = "Meow"
  catMeow[29] = "Meow?"

  var randomMeow = Math.floor(Math.random() * catMeow.length)
  var retString = catMeow[randomMeow]

  console.log(input_msg)

  if (input_msg == "purr") {
    retString = "Purr"
  }

  if (input_msg == "moo") {
    retString = "Mooo"
  }

  if (input_msg == "🍍") {
    retString = "🍍"
  }

  // randomly do nothing, .5% chance
  var randomlyDoNothing = Math.random();
  if (randomlyDoNothing > .95) {
    console.log("Randomly did nothing... like a cat")
    retString = ""
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

client.on('messageDelete', (receivedMessage) => {
  receivedMessage.channel.send("Mao")
  console.log('deleted');
})

client.on('messageEdit', (receivedMessage) => {
  var cb_msg = catReply(receivedMessage.content)
  receivedMessage.channel.send(cb_msg)
})

client.on('message', (receivedMessage) => {
  // Prevent bot from responding to its own messages

  if (receivedMessage.author == client.user) {
    return
  }

  // console.log(receivedMessage.channel.id)

  // Only in the catbot channel
  if (receivedMessage.channel.id == chan_catbot) {
    // Catbot meows to all mentions of cat in the catbot channel
    if (receivedMessage.content.toLowerCase().includes("cat")) {
      var cb_msg = catReply(receivedMessage.content)
      receivedMessage.channel.send(cb_msg)
    }

    if (receivedMessage.content.toLowerCase().includes("meow")) {
      var cb_msg = catReply(receivedMessage.content)
      receivedMessage.channel.send(cb_msg)
    }

    if (receivedMessage.content.toLowerCase().includes("treat")) {
      var cb_treat = randomTreatEmoji()
      receivedMessage.channel.send(cb_treat)
    }
  } else {
    // React to "cat" in messages outside of the catbot channel
    var catEmoji = catReact(receivedMessage.content)
    if (catEmoji) {
      for (var i = 0; i < catEmoji.length; i++) {
        receivedMessage.react(catEmoji[i])
      }
    }

    // occasionally meow
    if (receivedMessage.content.toLowerCase().includes("cat")) {
      var randomReply = Math.random();
      if (randomReply > .9) {
        var cb_msg = catReply(receivedMessage.content)
        receivedMessage.channel.send(cb_msg)
      }
    }
  }

  // Random global meow
  var randomGlobalReply = Math.random();
  if (randomReply > .95) {
    var cb_msg = catReply(receivedMessage.content)
    receivedMessage.channel.send(cb_msg)
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
bot_secret_token = "NTUxMjYzMzYzODg0MTIyMTIy.D1vn8Q.GPZqVzIqseOyhWqiM72vZ22qejs"
client.login(bot_secret_token)
