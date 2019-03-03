module.exports = {

  reply: function(msg) {
    var cb_input
    if (msg) { cb_input = msg.toLowerCase() }

    console.log(msg)

    // return a random string sometimes, but mostly meow
    var weightedOdds = Math.random()
    var retString = "Meow"
    if (weightedOdds < .25) {
      retString = this.randomMeow()
    }

    // randomly do nothing, .5% chance
    var randomlyDoNothing = Math.random();
    if (randomlyDoNothing < .05) {
      console.log("Randomly did nothing... like a cat")
      retString = ""
    }

    // !commands
    if (cb_input) {
      // Treat
      if (cb_input.includes("!treat")) {
        retString = this.randomTreatEmoji()
      }

      // Pineapple
      if ((cb_input.includes("!pineapple")) || (cb_input == "🍍")) {
        retString = "🍍"
      }

      // Fish
      if (cb_input.includes("!fish")) {
        retString = this.randomFishEmoji()
      }

      // Purr
      if (cb_input.includes("!purr")) {
        retString = "Purrr"
      }

      // Play (anything)
      if (cb_input.includes("!play")) {
        outputFlag = false

        var aPlay = msg.split(" ") // because it's not lowercase
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

        // set discord client "now playing"
        client.user.setActivity(this.play(tmpPlay))
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

    console.log(nowPlaying)
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
    if (msg.includes("fish")) { emoji.push(this.randomFishEmoji()) }
    if (msg.includes("treat")) { emoji.push(this.randomTreatEmoji()) }
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
    treatReaction[1] = "🐟"
    treatReaction[2] = "🐟"
    treatReaction[3] = "🐟"

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

    var randomCatPlaying = Math.floor(Math.random() * catPlaying.length)
    var retString = catPlaying[randomCatPlaying]

    return retString
  }
}
