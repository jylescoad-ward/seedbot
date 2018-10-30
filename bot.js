
//Changelog Moved to changelog.txt

const Discord = require("discord.js");
const { RichEmbed } = require('discord.js')
const client = new Discord.Client();
const config = require("./config.json");
// const Music = require('discord.js-musicbot-addon');

const { Signale } = require('signale');

//DMOJ MODULE
const problems = require('./dmoj/problem.js')
const contests = require('./dmoj/contest.js')
const users = require('./dmoj/user.js')
const package = require('./package.json')
//END OF DMOJ MODULE

const options = {
    disabled: false,
    interactive: false,
    stream: process.stdout,
    types: {
        command: {
            color: 'green',
            label: 'c  COMMAND'
        },
        info: {
            color: 'grey',
            label: 'INFO',
        },
        error: {
            color: 'red',
            label: 'ERROR',
        }
    }
};

const signal = new Signale(options);
const build = package.build;
const ver = package.version;
const ownerID = package.ownerID;



signal.info("Starting the SeedBot...")
signal.info("Copyright 2018, jyles.pw")
signal.info("Running SeedBot version " + ver + " build " + build)
client.on('message',async message => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.devprefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const devcommand = args.shift().toLowerCase();

  if (devcommand === 'svrs') {

      if (message.author.id === '230485481773596672') {
          message.author.send("Number of Available Servers: " + client.guilds.size);
          var list = client.guilds.array().sort();
          message.author.send("Available Servers: " + list);
          signal.info("An Owner executed s!srvrs");
      }
      else {
          message.reply('Unable to perform action - you do not have the appropriate role');
          signal.error("A user executed s!srvrs without appropriate permissions");
      }
  }

  //Shows Number of accesable channels
  if (devcommand === 'chnls') {

      if (message.author.id === '230485481773596672') {
          message.author.send("Number of Available Channels: " + client.channels.size);
          var list = client.channels.array().sort();
          message.author.send("Available Channels: " + list);
          signal.command("An Owner executed s!chnls");
      }
      else {
          message.reply('Unable to perform action - you are not a creator or developer');
          signal.error("A user executed s!chnls without appropriate permissions");
      }
  }
  if (devcommand === 'exec') {
    let code = args.slice(0).join(" ");
    if (message.author.id === ownerID) {
      let exec = eval(code);
      message.channel.send('**Input:**\n`' + code + '`\n\n**Output**:\n`' + output);
    }
  }
  if (devcommand === "killmepls") {
    if (message.author.id === ownerID) {
      client.user.setActivity('Bot is shutting down...');
      message.channel.send('Bot it now shutting down. Good Night :first_quarter_moon_with_face: :bed: ');
      killBot();
    }
  }

  //Changes the Rich Presence
  if (devcommand === 'rpc') {
      var game = args.slice(0).join(" ");


      // only @Seed#0001 and @CheezBiscuit can access this devcommand

      //Checking if the sender is a certian user
      if (message.author.id === '230485481773596672' || message.author.id === '317250979311386627') {

          //reset devcommand
          if (game === 'reset') {
              client.user.setActivity('s!help // bot.jyles.pw // Serving ' + client.guilds.size + ' servers');
              message.author.send('Rich Presence Has Been Reset!');
              signal.info("A Owner executed s!rp reset");
          }
          else {
              client.user.setActivity(game + ' // bot.jyles.pw // Serving ${client.guilds.size} servers');
              message.author.send('Rich Presence Status Updated To: ' + game);
              signal.info("A Owner executed s!rp " + game + ", game set to " + game);
          }
      }
      else {
          message.reply('you do not have permissions to use this devcommand,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***');
          signal.error("A user eSxecuted s!rp without appropriate permissions")
      }
  }
  if (devcommand === 'spam') {
    let i;
    let text = args.slice(1).join(" ");
    let msgcount = args.slice(2).join(" ");
    message.channel.send(msgcount + '\n' + text);
    if (message.author.id === ownerID) {
      signal.command("An Owner Executed the s!spam devcommand");

      for(let i = 0; i < 5; i++) {message.channel.send(message.content.split(" ").splice(2).join(" "));}
    }

  }

});
client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    function killBot(){
      process.exit();
    }

    if (command === 'problem') {

      if (args.length === 2 && args[1] === '-l') {
        problems.get(args[0], true, message)
      } else {
        problems.get(args[0], false, message)
      }
    }
    if (command === 'contest') {

      if (args.length === 2 && args[1] === '-l') {
        contests.get(args[0], true, message)
      } else {
        contests.get(args[0], false, message)
      }
    }

    if (command === 'user') {

      if (args.length === 2 && args[1] === '-l') {
        users.get(args[0], true, message)
      } else {
        users.get(args[0], false, message)
      }
    }

    if (command === 'search') {

      message.reply('Working on it...')
        .then(message => {
          message.delete(5000)
        })
      if (args.length === 2 && args[1] === '-l') {
        problems.search(args[0], true, message)
      } else {
        problems.search(args[0], false, message)
      }
    }

    if (command === 'contest-search') {

      message.reply('Working on it...')
        .then(message => {
          message.delete(5000)
        })
      if (args.length === 2 && args[1] === '-l') {
        contests.search(args[0], true, message)
      } else {
        contests.search(args[0], false, message)
      }
    }

    if (command === 'user-search') {

      message.reply('Working on it...')
        .then(message => {
          message.delete(5000)
        })
      if (args.length === 2 && args[1] === '-l') {
        users.search(args[0], true, message)
      } else {
        users.search(args[0], false, message)
      }
    }


    //>>>REDESIGNED HELP SYSTEM (MODULAR)<<<
    if (command === 'help') {
        message.reply('http://bot.jyles.pw/');
    }

    //OTHER COMMANDS______________________________________________________________
    if (command === "ping") {

        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. \nAPI Latency is ${Math.round(client.ping)}ms`);
        signal.command("A user executed s!ping");
    }
    if (command === "invite") {

        message.reply("Take me yo your leader!\n https://goo.gl/LqfdtJ");
        signal.command("A user executed s!invite");
    }
    if (command === "discord") {

        message.reply("Here is my support discord!\n http://gg.jyles.pw");
        signal.command("A user executed s!discord");
    }





    //Moderation commands ___________________________________________________________________________

    //Kick Command
    if (command === "kick") {
      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first();
      let logchannel = message.guild.channels.find('name', 'logs');
      if (!logchannel) return message.reply('I cannot find a logs channel');
      if (reason.length < 1) return message.reply('You must supply a reason for the kick.');
      if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);

      if (!message.guild.member(user).kickable) return message.reply('I cannot kick that member');
      message.guild.member(user).kick();

      message.channel.send('User: ' + + ' has been kicked');
    }

    //Ban Command
    if (command === "ban") {
      let reason = args.slice(1).join(' ');
      let user = message.mentions.users.first();
      let logchannel = message.guild.channels.find('name', 'logs');
      if (!logchannel) return message.reply('I cannot find a logs channel');
      if (!message.member.hasPermission("BAN_MEMBERS")) return message.reply(":no_entry_sign: **Error:** You don't have the **Ban Members** permission!");
      if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
      if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);

      if (!message.guild.member(user).bannable) return message.reply(`<:redTick:${settings.redTick}> I cannot ban that member`);
      message.guild.member(user).ban();

      message.channel.send('User: ' + user + ' has been banned');
    }

    //Purge Command
    if (command === "purge") {
      let messagecount = parseInt(args.join(' '));
      message.channel.fetchMessages({
        limit: 100
      }).then(messages => message.channel.bulkDelete(messages));
    }


    //StrafeCode.com Server Commands (Staff)
    if (command === 'request'){

        var userrequest = args.slice(0).join(" ");
        console.log(userrequest);
        if(message.channel.id === '489269312645758976'){
            client.users.get("230485481773596672").send(":grey_exclamation: **User: " + message.author.toString() + " Sent a Request**:grey_exclamation: \n:anger: *Request Details* :anger:\n" + userrequest);

            message.reply('Request Sent to CEO');
            setTimeout();
            message.channel.send('?purge 2');
            client.channel.get('489303673126780948').send('***New Request!***\n**Requested by: ' + message.author.toString() + '\n**Request Details: ' + userrequest);
        }
        else{
            message.reply('Incorrect Channel, Piss off.')
        }
    }






    //INIT COMMANDS __________________________________________________
    if (command === "setup") {

        message.reply("To Setup SeedBot You need to Create ***Two Roles***\n One Role with the name of ``SeedModerator``\n and the other role with the name of ``SeedAdmin``\n And You should be set to use the Moderation Commands!");
        signal.command("A user executed s!setup");
    }


    //FUN COMMANDS______________________________________________________________

    if (command === 'rps') {
      let choice = args.join(" ").toLowerCase();
      if (choice === '') return message.reply("Please specify either rock, paper or scissors.");
      if (choice !== "rock" && choice !== "paper" && choice !== "scissors") return message.reply(`Please specify either rock, paper or scissors. ${choice} isn't one of those :P`);
      message.reply(random());
    }
    if (command === 'punch') {
      let user = message.mentions.users.first()
      if(user.id != owner){
          message.reply('You have punched <@' + user.id + '>')
      } else {
          message.reply("you can't hurt him you pleblord.")
      }
    }
    if (command === 'avatar') {
      let avatar = message.mentions.users.size ? message.mentions.users.first().avatarURL : message.author.avatarURL;
      if (message.mentions.users.size > 0) {
          message.channel.send(`Avatar for, **${message.mentions.users.first().username}:**\n${avatar}`);
      } else {
        message.channel.send(`Avatar for, **${message.author.username}:**\n${avatar}`);
      }
    }
    if (command === 'hammer') {
      let user = message.mentions.users.first();
      if (message.mentions.users.first() < 1){ return message.reply('You can\'t throw a hammer at thin air, pick someone fool.')}
      message.channel.send(`${message.author.username} threw a hammer at ${message.mentions.users.first().username}. <:hammmer:${settings.hammer}>`)
    }


    if (message.content.startsWith(config.mathprefix)) {
      let calculate = "=" + message.content.toLowerCase().substring(config.mathprefix.length);
      if (isFinite(calculate.replace(/\=|\+|\-|\*|\/|\÷|\%|\(|\)|\,|\ |math.|pow|sqrt|round|floor|ceiling|ceil|pi|π|euler|absolute|abs|exp|logarithm|log|random|rand|rng/g,''))) {
        calculate = calculate.replace(/ /g, "").replace(/÷/g, "/").replace(/power|pow/g, "Math.pow").replace(/sqrt|squareroot/g, "Math.sqrt").replace(/round/g, "Math.round").replace(/floor/g, "Math.floor").replace(/ceiling|ceil/g, "Math.ceil").replace(/pi|π/g, "Math.PI").replace(/euler/g, "Math.E").replace(/absolute|abs/g, "Math.abs").replace(/exp/g, "Math.exp").replace(/logarithm|log/g, "Math.log").replace(/random|rand|rng/g, "Math.random()");/*.replace(/acos|arccosine/g, "Math.acos").replace(/asin|arcsine/g, "Math.asin").replace(/atan|arctangent|atan1|arctangent1/g, "Math.atan").replace(/atan2|arctangent2/g, "Math.atan2").replace(/cos|cosine/g, "Math.cos").replace(/sin|sine/g, "Math.sin").replace(/tan|tangent/g, "Math.tan")*/;
        if (calculate.replace(/[^%]/g, "").length > 0) {
          for (let i = 0; i < calculate.replace(/[^%]/g, "").length; i++) {
            while ((calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "+" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "-" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "*" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "/" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "(" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == ")" || calculate[getSubstringIndex(calculate, "%", i+1) + 1] == "," || getSubstringIndex(calculate, "%", i+1) + 1 == calculate.length) && calculate.replace(/[^%]/g, "").length > 0) {
              for (let j = getSubstringIndex(calculate, "%", i+1); j > -1; j--) {
                if (calculate[j] == "=" || calculate[j] == "+" || calculate[j] == "-" || calculate[j] == "*" || calculate[j] == "/" || calculate[j] == "(" || calculate[j] == ")" || calculate[j] == ",") {
                  calculate = calculate.substring(0, j+1) + (calculate.substring(j+1, getSubstringIndex(calculate, "%", i+1))/100) + calculate.substring(getSubstringIndex(calculate, "%", i+1)+1, calculate.length);
                  break;
                }
              }
            }
          }
        }
        calculate =  calculate.replace(/=/g, "");
        if (isFinite(eval(calculate))) message.channel.send(eval(calculate));
        console.log(eval(calculate));
      }
    }



});

























client.on("ready", () => {
    signal.info(`Bot has started, with ` + client.users.size + ` users, in ` + client.channels.size + ` channels of ` + client.guilds.size + ` guilds.`);

    client.user.setActivity(`s!help // v` + ver + ` // ` + client.guilds.size + ` guilds.`);
});
client.login(config.token);
