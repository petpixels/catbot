# How to install CatBot

1. Clone this repo (or fork it if you plan to make changes)

3. Create a bot-secret file in /lib/bot-secret.js by following these steps:

```
nano ./lib/bot_secret.js
```

Creating a bot on Discord or Slack

*  https://discordapp.com/developers/applications/
*  https://api.slack.com/apps

*Optionally install mongodb or create a mongodb atlas account*

* https://www.mongodb.com/cloud/atlas

Copy and paste this into the file, fill in the values from your accounts

```
module.exports = {
  bot_secret_token: "get this from discord and paste it here",
  // slack: "skip this if not using slack",
  // slack_signing_secret: "get this from the slack developer portal",
  // mongo_url: "this is optional but will throw a bunch of warnings if you don’t have it"
}
```

Save this file, then run

```
npm init
npm install
```

#### To run catbot on discord

```
npm start
```

#### To run catbot on slack

```
node slack
```
