const Discord = require('discord.js')
const client = new Discord.Client()

const chan_general = "421090801393598466"
const chan_catbot = "551271365508857866"
const chan_cleverbot = "548078165936046080"

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
  catPlaying[16] = "the odds"
  catPlaying[17] = "with fire"
  catPlaying[18] = "with a fidget spinner"
  catPlaying[19] = "the accordion"
  catPlaying[20] = "flute"
  catPlaying[21] = "Cat Simulator 2000"
  catPlaying[22] = "Strikeforce: Kitty"
  catPlaying[23] = "Skyrim"
  catPlaying[24] = "Lasercat"
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

  var randomPlaying = Math.floor(Math.random() * catPlaying.length)
  var retString = catPlaying[randomPlaying]

  console.log(retString)

  client.user.setActivity(retString)
}

function catReact(msg) {
  var emoji = []

  if (msg) {
    msg = msg.toLowerCase()
  } else { 
    msg = ""
  }

  if (msg.includes("kitt")) { emoji.push(randomCatEmoji()) }
  if (msg.includes("fish")) { emoji.push(randomFishEmoji()) }
  if (msg.includes("treat")) { emoji.push(randomTreatEmoji()) }
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

  if ((msg.includes("cat")) && (!(msg.includes("catbot")))) { emoji.push(randomCatEmoji()) }
  if ((msg.includes("meow")) || (msg.includes("kitt"))) { emoji.push(randomCatEmoji()) }
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

  if (receivedMessage.author == client.user) {
    return
  }

  // console.log(receivedMessage.channel.id)

  // Only in the catbot channel
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

      if (cb_input.includes("treat")) { receivedMessage.channel.send(randomTreatEmoji()) }
      if (cb_input.includes("fish")) { receivedMessage.channel.send(randomFishEmoji()) }
      if ((cb_input.includes("pineapple")) || (cb_input == "🍍")) { receivedMessage.channel.send("🍍") }
      if ((cb_input.includes("mail")) || (cb_input.includes("post"))) { receivedMessage.channel.send("📮") }

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
