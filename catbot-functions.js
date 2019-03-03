module.exports = {

  reply: function(msg) {
    var cb_input
    if (msg) { cb_input = msg.toString().toLowerCase() }

    // console.log("Reply message: " + msg)

    // return a random string sometimes, but mostly meow
    var weightedOdds = Math.random()
    var retString = "Meow"
    if (weightedOdds < .25) {
      retString = this.randomMeow()
    }

    // randomly do nothing, .5% chance
    /* disabling because it keeps breaking stuff
    var randomlyDoNothing = Math.random();
    if (randomlyDoNothing < .05) {
      console.log("Randomly did nothing... like a cat")
      retString = ""
    }
    */

    // !commands
    if (cb_input) {

      if (cb_input.includes("!fish")) { retString = this.randomFishEmoji() }
      if (cb_input.includes("!treat")) { retString = this.randomTreatEmoji() }
      if (cb_input.includes("!purr")) { outputFlag = true; retString = "Purrr" }
      if (cb_input.includes("!pineapple")) { outputFlag = true; retString = ":pineapple:" }

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
        retString = this.play(tmpPlay)

        // set discord client "now playing"
        // client.user.setActivity()
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

    // Animals
    if (msg.includes("ant")) { emoji.push("🐜") }
    if (msg.includes("bat")) { emoji.push("🦇") }
    if (msg.includes("bear")) { emoji.push("🐻") }
    if (msg.includes("bee")) { emoji.push("🐝") }
    if (msg.includes("beluga")) { emoji.push("🐋") }
    if (msg.includes("boar")) { emoji.push("🐗") }
    if (msg.includes("bot")) { emoji.push("🤖") }
    if (msg.includes("bun")) { emoji.push("🐇") }
    if (msg.includes("buff")) { emoji.push("🐃") }
    if (msg.includes("bug")) { emoji.push("🐞") }
    if (msg.includes("bull")) { emoji.push("🐂") }
    if (msg.includes("camel")) { emoji.push("🐪") }
    if (msg.includes("cater")) { emoji.push("🐛") }
    if (msg.includes("chick")) { emoji.push("🐓") }
    if (msg.includes("cricket")) { emoji.push("🦗") } // conflict with the english sport
    if (msg.includes("chipmunk")) { emoji.push("🐿") }
    if (msg.includes("cow")) { emoji.push("🐄") }
    if (msg.includes("cheet")) { emoji.push("🐆") }
    if (msg.includes("crab")) { emoji.push("🦀") }
    if (msg.includes("deer")) { emoji.push("🦌") }
    if (msg.includes("dino")) { emoji.push("🦖") }
    if (msg.includes("dove")) { emoji.push("🕊") }
    if (msg.includes("draco")) { emoji.push("🐉") }
    if (msg.includes("draca")) { emoji.push("🐉") }
    if (msg.includes("drago")) { emoji.push("🐉") }
    if (msg.includes("dolph")) { emoji.push("🐬") }
    if (msg.includes("duck")) { emoji.push("🦆") }
    if (msg.includes("eagle")) { emoji.push("🦅") }
    if (msg.includes("egg")) { emoji.push("🥚") }
    if (msg.includes("eleph")) { emoji.push("🐘") }
    if (msg.includes("elk")) { emoji.push("🦌") }
    if (msg.includes("fox")) { emoji.push("🦊") }
    if (msg.includes("gira")) { emoji.push("🦒") }
    if (msg.includes("goat")) { emoji.push("🐐") }
    if (msg.includes("grasshop")) { emoji.push("🦗") }
    if (msg.includes("hedge")) { emoji.push("🦔") }
    if (msg.includes("horse")) { emoji.push("🐴") }
    if (msg.includes("ladybug")) { emoji.push("🐞") }
    if (msg.includes("leop")) { emoji.push("🐆") }
    if (msg.includes("lion")) { emoji.push("🦁") }
    if (msg.includes("liz")) { emoji.push("🦎") }
    if (msg.includes("locus")) { emoji.push("🦗") }
    if (msg.includes("moose")) { emoji.push("🦌") }
    if (msg.includes("mouse")) { emoji.push("🐭") }
    if (msg.includes("octo")) { emoji.push("🐙") }
    if (msg.includes("owl")) { emoji.push("🦉") }
    if (msg.includes("pand")) { emoji.push("🐼") }
    if (msg.includes("pig")) { emoji.push("🐷") }
    if (msg.includes("porc")) { emoji.push("🐷") }
    if (msg.includes("pork")) { emoji.push("🐷") }
    if (msg.includes("rabbit")) { emoji.push("🐰") }
    if (msg.includes("rat")) { emoji.push("🐀") }
    if (msg.includes("rhino")) { emoji.push("🦏") }
    if (msg.includes("raptor")) { emoji.push("raptor") }
    if (msg.includes("ram")) { emoji.push("🐏") }
    if (msg.includes("scorp")) { emoji.push("🦂") }
    if (msg.includes("shark")) { emoji.push("🦈") }
    if (msg.includes("sheep")) { emoji.push("🐏") }
    if (msg.includes("shep")) { emoji.push("🐏") }
    if (msg.includes("shrimp")) { emoji.push("🦐") }
    if (msg.includes("snail")) { emoji.push("🐌") }
    if (msg.includes("snake")) { emoji.push("🐍") }
    if (msg.includes("squid")) { emoji.push("🦑") }
    if (msg.includes("spider")) { emoji.push("🕷") }
    if (msg.includes("squirrel")) { emoji.push("🐿") }
    if (msg.includes("tiger")) { emoji.push("🐅") }
    if (msg.includes("tortoise")) { emoji.push("🐢") }
    if (msg.includes("turtle")) { emoji.push("🐢") }
    if (msg.includes("turk")) { emoji.push("🦃") }
    if (msg.includes("viper")) { emoji.push("🐍") }
    if (msg.includes("whal")) { emoji.push("🐳") }
    if (msg.includes("zebr")) { emoji.push("🦓") }

    // Food
    if (msg.includes("beef")) { emoji.push("🐮") }
    if (msg.includes("salad")) { emoji.push("🥗") }
    if (msg.includes("pinea")) { emoji.push("🍍") }
    if (msg.includes("steak")) { emoji.push("🐮") }
    if (msg.includes("prawn")) { emoji.push("🦐") }
    if (msg.includes("chinese")) { emoji.push("🥡") }
    if (msg.includes("fortune")) { emoji.push("🥠") }
    if (msg.includes("dumpl")) { emoji.push("🥟") }
    if (msg.includes("won")) { emoji.push("🥟") }
    if (msg.includes("bento")) { emoji.push("🍱") }
    if (msg.includes("konmari")) { emoji.push("🍱") }
    if (msg.includes("rice")) { emoji.push("🍙") }
    if (msg.includes("ramen")) { emoji.push("🍜") }
    if (msg.includes("nood")) { emoji.push("🍜") }
    if (msg.includes("spagh")) { emoji.push("🍝") }
    if (msg.includes("yam")) { emoji.push("🍠") }
    if (msg.includes("sushi")) { emoji.push("🍣") }
    if (msg.includes("nigiri")) { emoji.push("🍣") }
    if (msg.includes("sashimi")) { emoji.push("🍣") }
    if (msg.includes("naruto")) { emoji.push("🍥") }
    if (msg.includes("cone")) { emoji.push("🍦") }
    if (msg.includes("icecream")) { emoji.push("🍦") }
    if (msg.includes("coffee")) { emoji.push("☕") }
    if (msg.includes("tea")) { emoji.push("🍵") }
    if (msg.includes("popcorn")) { emoji.push("🍿") }

    // Plants
    if (msg.includes("flower")) { emoji.push("💐") }
    if (msg.includes("rose")) { emoji.push("🌹") }
    if (msg.includes("tulip")) { emoji.push("🌷") }
    if (msg.includes("dais")) { emoji.push("🌼") }
    if (msg.includes("sunf")) { emoji.push("🌻") }
    if (msg.includes("pink")) { emoji.push("🌸") }
    if (msg.includes("cherry")) { emoji.push("🌸") }
    if (msg.includes("brocc")) { emoji.push("🥦") }
    if (msg.includes("cact")) { emoji.push("🌵") }
    if (msg.includes("saguaro")) { emoji.push("🌵") }
    if (msg.includes("palm")) { emoji.push("🌴") }
    if (msg.includes("pine")) { emoji.push("🌲") }
    if (msg.includes("clover")) { emoji.push("🍀") }
    if (msg.includes("leaf")) { emoji.push("🍁") }
    if (msg.includes("leav")) { emoji.push("🍁") }
    if (msg.includes("maple")) { emoji.push("🍁") }
    if (msg.includes("grape")) { emoji.push("🍇") }
    if (msg.includes("melon")) { emoji.push("🍉") }
    if (msg.includes("watermel")) { emoji.push("🍉") }
    if (msg.includes("orang")) { emoji.push("🍊") }
    if (msg.includes("lemon")) { emoji.push("🍋") }
    if (msg.includes("banana")) { emoji.push("🍌") }
    if (msg.includes("apple")) { emoji.push("🍎") }
    if (msg.includes("pear")) { emoji.push("🍐") }
    if (msg.includes("peach")) { emoji.push("🍑") }
    if (msg.includes("strawb")) { emoji.push("🍓") }
    if (msg.includes("cherry")) { emoji.push("🍒") }
    if (msg.includes("tomat")) { emoji.push("🍅") }
    if (msg.includes("coconut")) { emoji.push("🥥") }
    if (msg.includes("avocad")) { emoji.push("🥑") }
    if (msg.includes("avacad")) { emoji.push("🥑") }
    if (msg.includes("avocat")) { emoji.push("🥑") }
    if (msg.includes("eggplant")) { emoji.push("🍆") }
    if (msg.includes("potato")) { emoji.push("🥔") }
    if (msg.includes("carrot")) { emoji.push("🥕") }
    if (msg.includes(" corn")) { emoji.push("🌽") } // not popcorn
    if (msg.includes("maize")) { emoji.push("🌽") }
    if (msg.includes("hot")) { emoji.push("🌶") }
    if (msg.includes("pepper")) { emoji.push("🌶") }
    if (msg.includes("spic")) { emoji.push("🌶") } // spicy, sorry
    if (msg.includes("cucum")) { emoji.push("🥒") }
    if (msg.includes("mushroom")) { emoji.push("🍄") }
    if (msg.includes("peanut")) { emoji.push("🥜") }
    if (msg.includes("pancak")) { emoji.push("🥞") }
    if (msg.includes("chees")) { emoji.push("🧀") }
    if (msg.includes("fries")) { emoji.push("🍟") }
    if (msg.includes("fry")) { emoji.push("🍟") }
    if (msg.includes("pizza")) { emoji.push("🍕") }
    if (msg.includes("sandwich")) { emoji.push("🥪") }
    if (msg.includes("bacon")) { emoji.push("🐽") }
    if (msg.includes("burger")) { emoji.push("🍔") }
    if (msg.includes("hotdog")) { emoji.push("🌭") }
    if (msg.includes("taco")) { emoji.push("🌮") }
    if (msg.includes("burrito")) { emoji.push("🌯") }
    if (msg.includes("purrito")) { emoji.push("🌯") }
    if (msg.includes("croissant")) { emoji.push("🥐") }
    if (msg.includes("crescent")) { emoji.push("🥐") }
    if (msg.includes("baguette")) { emoji.push("🥖") }
    if (msg.includes("bread")) { emoji.push("🥖") }
    if (msg.includes("loaf")) { emoji.push("🍞") }
    if (msg.includes("falaf")) { emoji.push("🥙") }
    if (msg.includes("bowl")) { emoji.push("🥣") }
    if (msg.includes("soup")) { emoji.push("🍲") }
    if (msg.includes("cake")) { emoji.push("🎂") }
    if (msg.includes("cookie")) { emoji.push("🍪") }
    if (msg.includes("donut")) { emoji.push("🍩") }
    if (msg.includes("doughnut")) { emoji.push("🍩") }
    if (msg.includes("donot")) { emoji.push("🍩") }
    if (msg.includes("ice")) { emoji.push("🍦") }
    if (msg.includes("milk")) { emoji.push("🥛") }
    if (msg.includes("glass")) { emoji.push("🥛") }
    if (msg.includes("drink")) { emoji.push("🥤") }
    if (msg.includes("can")) { emoji.push("🥫") } // this one will be fun

    // In-jokes and references
    if (msg.includes("poo")) { emoji.push("💩") }
    if (msg.includes("shit")) { emoji.push("💩") }
    if (msg.includes("crap")) { emoji.push("💩") }
    if (msg.includes("turd")) { emoji.push("💩") }
    if (msg.includes("mail")) { emoji.push("📮") }
    if (msg.includes("male")) { emoji.push("📮") }
    if (msg.includes("post")) { emoji.push("📮") }
    if (msg.includes("yoga")) { emoji.push("🧘") }
    if (msg.includes("ella")) { emoji.push("☂") }
    if (msg.includes("head")) { emoji.push("🗿") }
    if (msg.includes("tiki")) { emoji.push("🗿") }
    if (msg.includes("girl")) { emoji.push("🐿") }
    if (msg.includes("moses")) { emoji.push("🐢") }
    if (msg.includes("fuck")) { emoji.push("🦆") }
    if (msg.includes("hump")) { emoji.push("🐫") }
    if (msg.includes("rino")) { emoji.push("🦏") }
    if (msg.includes("horn")) { emoji.push("🦏") }
    if (msg.includes("sonic")) { emoji.push("🦔") }
    if (msg.includes("australia")) { emoji.push("🐨") }
    if (msg.includes("oz")) { emoji.push("🐨") }
    if (msg.includes("peace")) { emoji.push("🕊") }
    if (msg.includes("merica")) { emoji.push("🦅") }
    if (msg.includes("mercia")) { emoji.push("🦅") }
    if (msg.includes("murica")) { emoji.push("🦅") }
    if (msg.includes("murcia")) { emoji.push("🦅") } // bc murcians cant spell
    if (msg.includes("liberty")) { emoji.push("🗽") }
    if (msg.includes("rattle")) { emoji.push("🐍") }
    if (msg.includes("blowhole")) { emoji.push("🐳") }
    if (msg.includes("spout")) { emoji.push("🐳") }
    if (msg.includes("git")) { emoji.push("🐙") }
    if (msg.includes("cthulu")) { emoji.push("🦑") }
    if (msg.includes("calimari")) { emoji.push("🦑") }
    if (msg.includes("calamari")) { emoji.push("🦑") }
    if (msg.includes("leo")) { emoji.push("🦁") }
    if (msg.includes("cricut")) { emoji.push("🦗") }
    if (msg.includes("seal")) { emoji.push("🌹") }
    if (msg.includes("sticky")) { emoji.push("🌵") }
    if (msg.includes("canad")) { emoji.push("🍁") }
    if (msg.includes("luck")) { emoji.push("🍀") }
    if (msg.includes("facts")) { emoji.push("🦊") }
    if (msg.includes("fax")) { emoji.push("🦊") }
    if (msg.includes("cheat")) { emoji.push("🐆") }
    if (msg.includes("boring")) { emoji.push("🐗") }
    if (msg.includes("gary")) { emoji.push("🐌") }
    if (msg.includes("web")) { emoji.push("🕸") }
    if (msg.includes("stair")) { emoji.push("🍎") }
    if (msg.includes("stair")) { emoji.push("🍐") }
    if (msg.includes("ass")) { emoji.push("🍑") }
    if (msg.includes("butt")) { emoji.push("🍑") }
    if (msg.includes("dick")) { emoji.push("🍆") }
    if (msg.includes("trap")) { emoji.push("🏚") }
    if (msg.includes("crack")) { emoji.push("🏚") }
    if (msg.includes("waa")) { emoji.push("🚑") }
    if (msg.includes("burn")) { emoji.push("🚑") }
    if (msg.includes("wambulance")) { emoji.push("🚑") }
    if (msg.includes("medic")) { emoji.push("🚑") }
    if (msg.includes("fire")) { emoji.push("🚒") }
    if (msg.includes("cop")) { emoji.push("🚔") }
    if (msg.includes("police")) { emoji.push("🚔") }
    if (msg.includes("woop")) { emoji.push("🚔") }
    if (msg.includes("stop")) { emoji.push("🛑") }
    if (msg.includes("arrest")) { emoji.push("🚨") }
    if (msg.includes("oil")) { emoji.push("🛢") }
    if (msg.includes("gay")) { emoji.push("🌈") }
    if (msg.includes("fag")) { emoji.push("🌈") }
    if (msg.includes("lesb")) { emoji.push("🌈") }
    if (msg.includes("lgbt")) { emoji.push("🌈") }
    if (msg.includes("bisex")) { emoji.push("🌈") }
    if (msg.includes("queer")) { emoji.push("🌈") }
    if (msg.includes("nerd")) { emoji.push("👓") }
    if (msg.includes("smart")) { emoji.push("👓") }
    if (msg.includes("intell")) { emoji.push("👓") }
    if (msg.includes("cool")) { emoji.push("🕶") }
    if (msg.includes("sunglass")) { emoji.push("🕶") }
    if (msg.includes("shade")) { emoji.push("🌳") }
    if (msg.includes("baby")) { emoji.push("🍼") }
    // if (msg.includes("pie")) { emoji.push("🥧") }
    // if (msg.includes("3.14")) { emoji.push("🥧") }
    // if (msg.includes("cutie")) { emoji.push("🥧") }
    // if (msg.includes("cute")) { emoji.push("🥧") }
    // if (msg.includes("qt")) { emoji.push("🥧") }
    // if (msg.includes("honey")) { emoji.push("🍯") }
    if (msg.includes("birthday")) { emoji.push("🎂") }
    if (msg.includes("anniversary")) { emoji.push("🎂") }
    if (msg.includes("code")) { emoji.push("🥑") }


    // Transportation
    if (msg.includes("boat")) { emoji.push("🚣") }
    if (msg.includes("ship")) { emoji.push("🚢") }
    if (msg.includes("row")) { emoji.push("🛶") }
    if (msg.includes("paddle")) { emoji.push("🛶") }
    if (msg.includes("oar")) { emoji.push("🛶") }
    if (msg.includes("train")) { emoji.push("🚂") }
    if (msg.includes("bus")) { emoji.push("🚍") }
    if (msg.includes("taxi")) { emoji.push("🚕") }
    if (msg.includes("car")) { emoji.push("🏎") }
    if (msg.includes("truck")) { emoji.push("🚚") }
    if (msg.includes("scoot")) { emoji.push("🛴") }
    if (msg.includes("bike")) { emoji.push("🚲") }
    if (msg.includes("biking")) { emoji.push("🚲") }
    if (msg.includes("bicycl")) { emoji.push("🚲") }
    if (msg.includes("motorcycl")) { emoji.push("🏍") }
    if (msg.includes("ambulance")) { emoji.push("🚑") }
    if (msg.includes("sail")) { emoji.push("⛵") }
    if (msg.includes("anchor")) { emoji.push("⚓") }
    if (msg.includes("ferry")) { emoji.push("⛴") }
    if (msg.includes("plane")) { emoji.push("✈") }
    if (msg.includes("copter")) { emoji.push("🚁") }
    if (msg.includes("chopper")) { emoji.push("🚁") }
    if (msg.includes("rocket")) { emoji.push("🚀") }
    //if (msg.includes("ufo")) { emoji.push("🛸") }
    //if (msg.includes("alien")) { emoji.push("🛸") }
    if (msg.includes("alien")) { emoji.push("👽") }
    if (msg.includes("martia")) { emoji.push("👽") }
    //if (msg.includes("mars")) { emoji.push("🛸") }
    //if (msg.includes("51")) { emoji.push("🛸") }
    //if (msg.includes("saucer")) { emoji.push("🛸") }
    if (msg.includes("satel")) { emoji.push("📡") }
    if (msg.includes("dish")) { emoji.push("📡") }
    if (msg.includes("mountain")) { emoji.push("🏔") }
    if (msg.includes("mtn")) { emoji.push("🏔") }
    if (msg.includes("hill")) { emoji.push("🏔") }
    if (msg.includes("rocky")) { emoji.push("🏔") }
    if (msg.includes("sierra")) { emoji.push("⛰") }
    if (msg.includes("appalach")) { emoji.push("🏔") }
    if (msg.includes("beach")) { emoji.push("🏖") }
    if (msg.includes("camp")) { emoji.push("🏕") }
    if (msg.includes("tent")) { emoji.push("⛺") }
    if (msg.includes("volcan")) { emoji.push("🌋") }
    if (msg.includes("lava")) { emoji.push("🌋") }
    if (msg.includes("magma")) { emoji.push("🌋") }
    if (msg.includes("molten")) { emoji.push("🌋") }
    if (msg.includes("desert")) { emoji.push("🏜") }
    if (msg.includes("park")) { emoji.push("🏞") }
    if (msg.includes("house")) { emoji.push("🏡") }
    if (msg.includes("home")) { emoji.push("🏡") }
    if (msg.includes("church")) { emoji.push("💒") }
    if (msg.includes("mosque")) { emoji.push("🕌") }
    if (msg.includes("temple")) { emoji.push("🕍") }
    if (msg.includes("synagogue")) { emoji.push("🕍") }
    if (msg.includes("castle")) { emoji.push("🗼") }
    if (msg.includes("tower")) { emoji.push("🏰") }

    if (msg.includes("sf")) { emoji.push("🌁") }
    if (msg.includes("francisco")) { emoji.push("🌁") }
    if (msg.includes("cruise")) { emoji.push("🛳") }
    if (msg.includes("earth")) { emoji.push("🌎") }
    if (msg.includes("map")) { emoji.push("🗾") }
    if (msg.includes("pyongyang")) { emoji.push("🏓") }
    if (msg.includes("paris")) { emoji.push("🇫🇷") }
    if (msg.includes("france")) { emoji.push("🇫🇷") }
    if (msg.includes("french")) { emoji.push("🇫🇷") }
    if (msg.includes("uk")) { emoji.push("🇬🇧") }
    if (msg.includes("england")) { emoji.push("🇬🇧") }
    if (msg.includes("german")) { emoji.push("🇩🇪") }
    if (msg.includes("deutsch")) { emoji.push("🇩🇪") }
    if (msg.includes("denmark")) { emoji.push("🇩🇰") }
    if (msg.includes("dane")) { emoji.push("🇩🇰") }
    if (msg.includes("aruba")) { emoji.push("🇦🇼") }
    if (msg.includes("antarctic")) { emoji.push("🇦🇶") }
    if (msg.includes("anarctic")) { emoji.push("🇦🇶") }
    if (msg.includes("antartica")) { emoji.push("🇦🇶") }
    if (msg.includes("belgium")) { emoji.push("🇧🇪") }
    if (msg.includes("belguim")) { emoji.push("🇧🇪") }
    if (msg.includes("chile")) { emoji.push("🇨🇱") }
    if (msg.includes("china")) { emoji.push("🇨🇳") }
    if (msg.includes("chines")) { emoji.push("🇨🇳") }
    if (msg.includes("spain")) { emoji.push("🇪🇸") }
    if (msg.includes("finland")) { emoji.push("🇫🇮") }
    if (msg.includes("georgia")) { emoji.push("🇬🇪") }
    if (msg.includes("greece")) { emoji.push("🇬🇷") }
    if (msg.includes("grease")) { emoji.push("🇬🇷") }
    if (msg.includes("ireland")) { emoji.push("🇮🇪") }
    if (msg.includes("israel")) { emoji.push("🇮🇱") }
    if (msg.includes("iran")) { emoji.push("🇮🇷") }
    if (msg.includes("italy")) { emoji.push("🇮🇹") }
    if (msg.includes("jamaica")) { emoji.push("🇯🇲") }
    if (msg.includes("japan")) { emoji.push("🇯🇵") }
    if (msg.includes("kenya")) { emoji.push("🇰🇪") }
    if (msg.includes("cambodia")) { emoji.push("🇰🇭") }
    if (msg.includes("korea")) { emoji.push("🇰🇷") }
    if (msg.includes("mongolia")) { emoji.push("🇲🇳") }
    if (msg.includes("malta")) { emoji.push("🇲🇹") }
    if (msg.includes("mexic")) { emoji.push("🇲🇽") }
    if (msg.includes("axtec")) { emoji.push("🇲🇽") }
    if (msg.includes("holland")) { emoji.push("🇳🇱") }
    if (msg.includes("netherlands")) { emoji.push("🇳🇱") }
    if (msg.includes("dutch")) { emoji.push("🇳🇱") }
    if (msg.includes("norway")) { emoji.push("🇳🇴") }
    if (msg.includes("norweg")) { emoji.push("🇳🇴") }
    if (msg.includes("nepal")) { emoji.push("🇳🇵") }
    if (msg.includes("zealand")) { emoji.push("🇳🇿") }
    if (msg.includes("peru")) { emoji.push("🇵🇪") }
    if (msg.includes("philippin")) { emoji.push("🇵🇭") }
    if (msg.includes("phillipines")) { emoji.push("🇵🇭") }
    if (msg.includes("philipines")) { emoji.push("🇵🇭") }
    if (msg.includes("filipin")) { emoji.push("🇵🇭") }
    if (msg.includes("fillipin")) { emoji.push("🇵🇭") }
    if (msg.includes("tagalog")) { emoji.push("🇵🇭") }
    if (msg.includes("pakistan")) { emoji.push("🇵🇰") }
    if (msg.includes("poland")) { emoji.push("🇵🇱") }
    if (msg.includes("polish")) { emoji.push("🇵🇱") }
    if (msg.includes("vietnam")) { emoji.push("🇻🇳") }


    // Time
    if (msg.includes("bell")) { emoji.push("🛎") }
    if (msg.includes("watch")) { emoji.push("⌚") }
    if (msg.includes("alarm")) { emoji.push("⏰") }
    if (msg.includes("time")) { emoji.push("🕰") }
    if (msg.includes("clock")) { emoji.push("🕰") }
    if (msg.includes("timer")) { emoji.push("⏲") }
    if (msg.includes("sand")) { emoji.push("⏳") }
    if (msg.includes("hourglass")) { emoji.push("⏳") }
    if (msg.includes("urn")) { emoji.push("🏺") }
    if (msg.includes("remain")) { emoji.push("⚱") }
    if (msg.includes("fountain")) { emoji.push("⛲") }
    if (msg.includes("sun")) { emoji.push("☀") }
    if (msg.includes("moon")) { emoji.push("🌜") }

    // Household
    if (msg.includes("cook")) { emoji.push("🍳") }
    if (msg.includes("bath")) { emoji.push("🛁") }
    if (msg.includes("toilet")) { emoji.push("🚽") }
    if (msg.includes("couch")) { emoji.push("🛋") }
    if (msg.includes("lamp")) { emoji.push("🛋") }
    if (msg.includes("sofa")) { emoji.push("🛋") }
    if (msg.includes("bed")) { emoji.push("🛏") }
    if (msg.includes("door")) { emoji.push("🚪") }
    if (msg.includes("shower")) { emoji.push("🚿") }
    if (msg.includes("hair")) { emoji.push("💈") }
    if (msg.includes("celcius")) { emoji.push("🌡") }
    if (msg.includes("centigrade")) { emoji.push("🌡") }
    if (msg.includes("fahrenheit")) { emoji.push("🌡") }
    if (msg.includes("farenheit")) { emoji.push("🌡") }
    if (msg.includes("thermo")) { emoji.push("🌡") }

    // Weather
    if (msg.includes("cloud")) { emoji.push("☁") }
    if (msg.includes("rain")) { emoji.push("🌧") }
    if (msg.includes("snow")) { emoji.push("🌨") }
    if (msg.includes("flake")) { emoji.push("❄") }
    if (msg.includes("snowman")) { emoji.push("⛄") }
    if (msg.includes("frosty")) { emoji.push("⛄") }
    if (msg.includes("frostie")) { emoji.push("⛄") }
    if (msg.includes("lightning")) { emoji.push("🌩") }
    if (msg.includes("lightening")) { emoji.push("🌩") }
    if (msg.includes("thunder")) { emoji.push("🌩") }
    if (msg.includes("lightening")) { emoji.push("🌩") }
    if (msg.includes("star")) { emoji.push("⭐") }
    if (msg.includes("tornad")) { emoji.push("🌪") }
    if (msg.includes("fog")) { emoji.push("🌁") }
    if (msg.includes("rainbow")) { emoji.push("🌈") }
    if (msg.includes("fire")) { emoji.push("🔥") }
    if (msg.includes("hot")) { emoji.push("🔥") }
    if (msg.includes("heat")) { emoji.push("🔥") }
    if (msg.includes("flam")) { emoji.push("🔥") }
    if (msg.includes("wave")) { emoji.push("🌊") }
    if (msg.includes("droplet")) { emoji.push("💧") }
    if (msg.includes("water")) { emoji.push("💧") }

    // Holidays & Celebration
    if (msg.includes("pumpkin")) { emoji.push("🎃") }
    if (msg.includes("hallow")) { emoji.push("🎃") }
    if (msg.includes("christmas")) { emoji.push("🎄") }
    if (msg.includes("baloon")) { emoji.push("🎈") }
    if (msg.includes("balloon")) { emoji.push("🎈") }
    if (msg.includes("sparkle")) { emoji.push("✨") }
    if (msg.includes("shiny")) { emoji.push("✨") }
    if (msg.includes("yay")) { emoji.push("🎉") }
    if (msg.includes("party")) { emoji.push("🎉") }
    if (msg.includes("party")) { emoji.push("🎊") }
    if (msg.includes("party")) { emoji.push("🎈") }
    if (msg.includes("fun")) { emoji.push("🎉") }
    if (msg.includes("bamboo")) { emoji.push("🎋") } // why unicode?
    if (msg.includes("carp")) { emoji.push("🎏") }
    if (msg.includes("ribbon")) { emoji.push("🎀") }
    if (msg.includes("gift")) { emoji.push("🎁") }
    if (msg.includes("ticket")) { emoji.push("🎟") }
    if (msg.includes("enter")) { emoji.push("🎟") }
    if (msg.includes("entry")) { emoji.push("🎟") }

    // Sports
    if (msg.includes("baseball")) { emoji.push("⚾") }
    if (msg.includes("football")) { emoji.push("⚽") }
    if (msg.includes("basketball")) { emoji.push("🏀") }
    if (msg.includes("b-ball")) { emoji.push("🏀") }
    if (msg.includes("bball")) { emoji.push("🏀") }
    if (msg.includes("ball")) { emoji.push("🏀") }
    if (msg.includes("volley")) { emoji.push("🏐") }
    if (msg.includes("tennis")) { emoji.push("🎾") }
    if (msg.includes("fetch")) { emoji.push("🎾") }
    if (msg.includes("bowling")) { emoji.push("🎳") }
    if (msg.includes("strike")) { emoji.push("🎳") }
    if (msg.includes("cricket")) { emoji.push("🏏") }
    if (msg.includes("hock")) { emoji.push("🏒") }
    if (msg.includes("ping")) { emoji.push("🏓") }
    if (msg.includes("pong")) { emoji.push("🏓") }
    if (msg.includes("shuttlecock")) { emoji.push("🏸") }
    if (msg.includes("badminton")) { emoji.push("🏸") }
    if (msg.includes("badmitton")) { emoji.push("🏸") }
    if (msg.includes("badmitten")) { emoji.push("🏸") }
    if (msg.includes("boxing")) { emoji.push("🥊") }
    if (msg.includes("karate")) { emoji.push("🥋") }
    if (msg.includes("blackbelt")) { emoji.push("🥋") }
    if (msg.includes("kungfu")) { emoji.push("🥋") }
    if (msg.includes("kung-fu")) { emoji.push("🥋") }
    if (msg.includes("golf")) { emoji.push("⛳") }
    if (msg.includes("fore")) { emoji.push("⛳") }
    if (msg.includes("putt")) { emoji.push("⛳") }
    if (msg.includes("green")) { emoji.push("⛳") }
    if (msg.includes("fishing")) { emoji.push("🎣") }
    if (msg.includes("skat")) { emoji.push("⛸") }
    if (msg.includes("sled")) { emoji.push("🛷") }
    if (msg.includes("sleigh")) { emoji.push("🛷") }
    if (msg.includes("curl")) { emoji.push("🥌") }

    // Misc
    if (msg.includes("case")) { emoji.push("💼") }
    if (msg.includes("target")) { emoji.push("🎯") }
    if (msg.includes("bullseye")) { emoji.push("🎯") }
    if (msg.includes("game")) { emoji.push("🎮") }
    if (msg.includes("console")) { emoji.push("🕹") }
    if (msg.includes("8ball")) { emoji.push("🎱") }
    if (msg.includes("slot")) { emoji.push("🎰") }
    if (msg.includes("dice")) { emoji.push("🎲") }
    if (msg.includes("eightball")) { emoji.push("🎱") }
    if (msg.includes("crystal")) { emoji.push("🔮") }
    if (msg.includes("medal")) { emoji.push("🏅") }
    if (msg.includes("first")) { emoji.push("🥇") }
    if (msg.includes("second")) { emoji.push("🥈") }
    if (msg.includes("third")) { emoji.push("🥉") }
    if (msg.includes("gold")) { emoji.push("🥇") }
    if (msg.includes("silver")) { emoji.push("🥈") }
    if (msg.includes("bronze")) { emoji.push("🥉") }
    if (msg.includes("trophy")) { emoji.push("🏆") }
    if (msg.includes("brav")) { emoji.push("🎖") }
    if (msg.includes("buggy")) { emoji.push("🛒") }
    if (msg.includes("pill")) { emoji.push("💊") }
    if (msg.includes("capsule")) { emoji.push("💊") }
    if (msg.includes("medicine")) { emoji.push("💊") }
    if (msg.includes("pharma")) { emoji.push("💊") }
    if (msg.includes("vaccine")) { emoji.push("💉") }
    if (msg.includes("needle")) { emoji.push("💉") }
    if (msg.includes("vax")) { emoji.push("💉") }
    if (msg.includes("micro")) { emoji.push("🔬") }
    if (msg.includes("tele")) { emoji.push("🔭") }
    if (msg.includes("link")) { emoji.push("🔗") }
    if (msg.includes("url")) { emoji.push("🔗") }
    if (msg.includes("chain")) { emoji.push("⛓") }
    if (msg.includes("scale")) { emoji.push("⚖") }
    if (msg.includes("balance")) { emoji.push("⚖") }
    if (msg.includes("libra")) { emoji.push("⚖") }
    if (msg.includes("clamp")) { emoji.push("🗜") }
    if (msg.includes("gear")) { emoji.push("⚙") }
    if (msg.includes("cog")) { emoji.push("⚙") }
    if (msg.includes("sprocket")) { emoji.push("⚙") }
    if (msg.includes("nut")) { emoji.push("🔩") }
    if (msg.includes("bolt")) { emoji.push("🔩") }
    if (msg.includes("wrench")) { emoji.push("🔧") }
    if (msg.includes("shield")) { emoji.push("🛡") }
    if (msg.includes("sheild")) { emoji.push("🛡") }
    if (msg.includes("bow")) { emoji.push("🏹") }
    if (msg.includes("arrow")) { emoji.push("🏹") }
    if (msg.includes("pick")) { emoji.push("⛏") }
    if (msg.includes("sword")) { emoji.push("🗡") }
    if (msg.includes("dagger")) { emoji.push("🗡") }
    if (msg.includes("sharp")) { emoji.push("🗡") }
    if (msg.includes("hammer")) { emoji.push("🔨") }
    if (msg.includes("nail")) { emoji.push("🔨") }
    if (msg.includes("key")) { emoji.push("🗝") }
    if (msg.includes("lock")) { emoji.push("🔒") }
    if (msg.includes("secure")) { emoji.push("🔒") }
    if (msg.includes("trash")) { emoji.push("🗑") }
    if (msg.includes("waste")) { emoji.push("🗑") }
    if (msg.includes("cut")) { emoji.push("✂") }
    if (msg.includes("sciss")) { emoji.push("✂") }
    if (msg.includes("clip")) { emoji.push("📎") }
    if (msg.includes("tack")) { emoji.push("📌") }
    if (msg.includes(" pin")) { emoji.push("📌") }
    if (msg.includes("folder")) { emoji.push("📂") }
    if (msg.includes("pen")) { emoji.push("🖋") }
    if (msg.includes("box")) { emoji.push("📦") }
    if (msg.includes("pack")) { emoji.push("📦") }
    if (msg.includes("envelope")) { emoji.push("✉") }
    if (msg.includes("fork")) { emoji.push("🍴") }
    if (msg.includes("spoo")) { emoji.push("🥄") }
    if (msg.includes("chopst")) { emoji.push("🥢") }
    if (msg.includes("knif")) { emoji.push("🔪") }
    if (msg.includes("kniv")) { emoji.push("🔪") }
    if (msg.includes("ace")) { emoji.push("♠") }
    if (msg.includes("spade")) { emoji.push("♠") }
    if (msg.includes("heart")) { emoji.push("♥") }
    if (msg.includes("diamond")) { emoji.push("♦") }
    if (msg.includes("club")) { emoji.push("♣") }
    if (msg.includes("joker")) { emoji.push("🃏") }
    if (msg.includes("drama")) { emoji.push("🎭") }
    if (msg.includes("paint")) { emoji.push("🎨") }
    if (msg.includes("painting")) { emoji.push("🖼") }
    if (msg.includes("cowboy")) { emoji.push("🤠") }
    if (msg.includes("devil")) { emoji.push("😈") }
    if (msg.includes("satan")) { emoji.push("😈") }
    if (msg.includes("skull")) { emoji.push("💀") }
    if (msg.includes("dead")) { emoji.push("☠") }
    if (msg.includes("jolly")) { emoji.push("☠") }
    if (msg.includes("rodger")) { emoji.push("☠") }
    if (msg.includes("ghost")) { emoji.push("👻") }
    if (msg.includes("invade")) { emoji.push("👾") }
    if (msg.includes("kiss")) { emoji.push("💋") }
    if (msg.includes("broken")) { emoji.push("💔") }
    if (msg.includes("hundred")) { emoji.push("💯") }
    if (msg.includes("100")) { emoji.push("💯") }
    if (msg.includes("bomb")) { emoji.push("💣") }
    if (msg.includes("sleep")) { emoji.push("💤") }
    if (msg.includes("zzz")) { emoji.push("💤") }
    if (msg.includes("thought")) { emoji.push("💭") }
    if (msg.includes("think")) { emoji.push("💭") }
    if (msg.includes("writ")) { emoji.push("✍") }
    if (msg.includes("brain")) { emoji.push("🧠") }
    if (msg.includes("knows")) { emoji.push("👃") }
    if (msg.includes("nose")) { emoji.push("👃") }
    if (msg.includes("taste")) { emoji.push("👅") }
    if (msg.includes("tongue")) { emoji.push("👅") }
    if (msg.includes("mouth")) { emoji.push("👄") }
    if (msg.includes("lips")) { emoji.push("👄") }
    if (msg.includes("hat")) { emoji.push("🎩") } //that
    if (msg.includes("crown")) { emoji.push("👑") }
    if (msg.includes("top")) { emoji.push("🎩") }
    if (msg.includes("chapeau")) { emoji.push("👒") }
    if (msg.includes("graduat")) { emoji.push("🎓") }
    if (msg.includes("universit")) { emoji.push("🎓") }
    if (msg.includes("colleg")) { emoji.push("🎓") }
    if (msg.includes("school")) { emoji.push("🎓") }
    if (msg.includes("gem")) { emoji.push("💎") }
    if (msg.includes("ruby")) { emoji.push("💎") }
    if (msg.includes("boot")) { emoji.push("👢") }
    if (msg.includes("boot")) { emoji.push("👢") }
    if (msg.includes("backpack")) { emoji.push("🎒") }
    if (msg.includes("purse")) { emoji.push("👜") }
    if (msg.includes("pocketbook")) { emoji.push("👜") }
    if (msg.includes("shop")) { emoji.push("🛍") }
    if (msg.includes("shoe")) { emoji.push("👟") }
    if (msg.includes("heel")) { emoji.push("👠") }
    if (msg.includes("heal")) { emoji.push("👠") }
    if (msg.includes("iphone")) { emoji.push("📱") }
    if (msg.includes("droid")) { emoji.push("📟") }
    if (msg.includes("teleph")) { emoji.push("☎") }
    if (msg.includes("call ")) { emoji.push("📞") }
    if (msg.includes("power")) { emoji.push("🔌") }
    if (msg.includes("telev")) { emoji.push("📺") }
    if (msg.includes("tv")) { emoji.push("📺") }
    if (msg.includes("movie")) { emoji.push("🎥") }
    if (msg.includes("film")) { emoji.push("🎞") }
    if (msg.includes("video")) { emoji.push("🎬") }
    if (msg.includes("camera")) { emoji.push("📷") }
    if (msg.includes("project")) { emoji.push("📽") }
    if (msg.includes("pic")) { emoji.push("📸") }
    if (msg.includes("tape")) { emoji.push("📼") }
    if (msg.includes("vhs")) { emoji.push("📼") }
    if (msg.includes("beta")) { emoji.push("📼") }
    if (msg.includes("search")) { emoji.push("🔍") }
    if (msg.includes("find")) { emoji.push("🔎") }
    if (msg.includes("found")) { emoji.push("🔎") }
    if (msg.includes("idea")) { emoji.push("💡") }
    if (msg.includes("bulb")) { emoji.push("💡") }
    if (msg.includes("flash")) { emoji.push("🔦") }
    if (msg.includes("candle")) { emoji.push("🕯") }
    if (msg.includes("lantern")) { emoji.push("🏮") }
    if (msg.includes("note")) { emoji.push("📓") }
    if (msg.includes("book")) { emoji.push("📖") }
    if (msg.includes("scroll")) { emoji.push("📜") }
    if (msg.includes("paper")) { emoji.push("📰") }
    if (msg.includes("tag")) { emoji.push("🏷") }

    // Music
    if (msg.includes("mic")) { emoji.push("🎤") }
    if (msg.includes("phones")) { emoji.push("🎧") }
    if (msg.includes("radio")) { emoji.push("📻") }
    if (msg.includes("sax")) { emoji.push("🎷") }
    if (msg.includes("guitar")) { emoji.push("🎸") }
    if (msg.includes("keyb")) { emoji.push("🎹") }
    if (msg.includes("trump")) { emoji.push("🎺") }
    if (msg.includes("violin")) { emoji.push("🎻") }
    if (msg.includes("viola")) { emoji.push("🎻") }
    if (msg.includes("cello")) { emoji.push("🎻") }
    if (msg.includes("fiddl")) { emoji.push("🎻") }
    if (msg.includes("drum")) { emoji.push("🥁") }
    if (msg.includes("drum")) { emoji.push("🥁") }

    if (msg.includes("meow")) { emoji.push(this.randomCatEmoji()) }
    if (msg.includes("chat")) { emoji.push(this.randomCatEmoji()) }
    if (msg.includes("mew")) { emoji.push(this.randomCatEmoji()) }
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
    treatReaction[1] = "🍦"
    treatReaction[2] = "🍧"
    treatReaction[3] = "🍨"
    treatReaction[4] = "🍩"
    treatReaction[5] = "🍪"
    treatReaction[6] = "🍰"
    treatReaction[7] = "🍫"
    treatReaction[8] = "🍬"
    treatReaction[9] = "🍭"
    treatReaction[10] = "🍮"
    treatReaction[11] = "🍍"
    treatReaction[12] = "🐁"
    treatReaction[13] = "🍡"

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
    catPlaying[24] = "Lasertag"
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
