module.exports = {
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

// private functions below this
