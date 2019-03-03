// When it says secret, it really kind of means secret...
// so let's put it right at the top of this file here
bot_secret_token = "NTUxMjYzMzYzODg0MTIyMTIy.D1vn8Q.GPZqVzIqseOyhWqiM72vZ22qejs"

const catbot = require("./catbot-functions")

const Discord = require('discord.js')
const client = new Discord.Client()

const catbotUserID = "CatBot#8780"

// channels (probably shouldn't be hardcoded)
const chan_general = "421090801393598466"
const chan_catbot = "551271365508857866"
const chan_cleverbot = "548078165936046080"

process.on('uncaughtException', function(err) {
  console.log(err)
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

  // return a random string sometimes, but mostly meow
  var weightedOdds = Math.random()
  var retString = "Meow"
  if (weightedOdds < .25) {
    retString = catbot.randomMeow()
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

    // say hello
    // catbotChannel.send(catbot.randomMeow())
})

client.on('messageDelete', (receivedMessage) => {
  receivedMessage.channel.send("Mao")

  console.log('Mao');
})

client.on('guildMemberAdd', msg => {
  var newUserGreeting = catbot.randomMeow()
  msg.guild.channels.get(chan_general).send(newUserGreeting)

  console.log(newUserGreeting)
})

client.on('message', (receivedMessage) => {
  var replyRequired = false

  // Prevent bot from responding to its own messages
  if (receivedMessage.author == client.user) { return } // catch and release

  // In the catbot channel
  if ((receivedMessage.channel.id == chan_catbot) || (receivedMessage.channel.id == chan_cleverbot)) {
    replyRequired = true

    // get a message from cb
    var cb_input = receivedMessage.content.toLowerCase()
    var cb_msg = catReply(cb_input)
    var cb_output = []

    // incoming message cannot be blank
    if (cb_msg) {
      var outputFlag = false

      // log input message
      console.log(cb_msg)

      // Catbot meows to all mentions of cat in the catbot channel
      if ((cb_input.includes("cat")) || (cb_input.includes("kitt"))) {
        cb_output.push(cb_msg)
        outputFlag = true
        // receivedMessage.channel.send(cb_msg)
       }

      // It's polite to respond to meow
      if ((cb_input.includes("meow")) || (cb_input.includes("nyan"))) {
        cb_output.push(cb_msg)
        outputFlag = true
        // receivedMessage.channel.send(cb_msg)
      }

      // Manual overrides (catbot commands):
      if (cb_input.includes("purr")) {
        outputFlag = true
        cb_output.push("Purrr")
        // receivedMessage.channel.send("Purrr")
      }

      if (cb_input.includes("moo")) {
        outputFlag = true
        cb_output.push("Moooo")
        // receivedMessage.channel.send("Moooo")
      }

      // !commands

      // Treat
      if (cb_input.includes("!treat")) {
        outputFlag = false
        receivedMessage.channel.send(catbot.randomTreatEmoji())
      }

      // Pineapple
      if ((cb_input.includes("!pineapple")) || (cb_input == "🍍")) {
        outputFlag = false
        receivedMessage.channel.send("🍍")
      }

      // Fish
      if (cb_input.includes("!fish")) {
        outputFlag = false
        receivedMessage.channel.send(catbot.randomFishEmoji())
      }

      // Pineapple
      if (cb_input.includes("!purr")) {
        outputFlag = false
        receivedMessage.channel.send("Purrr")
      }

      // Play (anything)
      if (cb_input.includes("!play")) {
        outputFlag = false

        var aPlay = receivedMessage.content.split(" ")
        var tmpPlay = ""
        var playLoc = 0

        // double iteration has got to be a bad idea
        // but if it's stupid and it works it's not stupid
        for (var i = 0; i < aPlay.length; i++) {
          if (aPlay[i] == "!play") {
            playLoc = i+1
          }
        }

        for (var i = playLoc; i < aPlay.length; i++) {
          tmpPlay = tmpPlay + " " + aPlay[i]
        }

        console.log("play: " + tmpPlay)
        catPlay(tmpPlay)
      }

      // Output Message (if any)

console.log(cb_output)

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

          console.log("Meow count: " + meowCount)
          console.log("Not Meow: " + notMeow)

          if (meowCount > 0) {
            console.log("Positive Meow Count")
            // There are meows
            var outputRandom = Math.random()
            // weighted probability of # of meows vs other responses
            if (notMeow.length > 0) {
              console.log("Not meow: " + retString)

              if (outputRandom < (meowCount/10)) {
                // get random other reply
                var ret = Math.floor(Math.random() * notMeow.length)
                retString = notMeow[ret]
              } else {
                retString = "Meow"
              }
            } else {
              //output is meow
              retString = "Meow"
            }

          } else {
            // no meows to balance it out, just pick a reply at random
            console.log("Not Meow")
            if (notMeow.length > 0) {
              var ret = Math.floor(Math.random() * notMeow.length)
              retString = notMeow[ret]
            }
          }

          console.log("Return String: " + retString)
          if (retString) {
            receivedMessage.channel.send(retString)
          }
        }
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

  console.log(receivedMessage.channel.id)
})

client.login(bot_secret_token)
