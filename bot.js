
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
//END OF DMOJ MODULE
const owner = 230485481773596672

const options = {
    disabled: false,
    interactive: false,
    stream: process.stdout,
    types: {
        command: {
            color: 'green',
            label: 'COMMAND'
        },
        info: {
            color: 'grey',
            label: 'INFO',
        },
        error: {
            color: 'red',
            label: 'ERROR',
        },
        owner: {
            color: 'orange',
            label: 'DEVELOPER COMMAND',
      }
    }
};

const signal = new Signale(options);
var build = '420';
var ver = '0.4.3';


signal.info("Starting the SeedBot...")
signal.info("Copyright 2018, jyles.pw")
signal.info("Running SeedBot version " + ver + " build " + build)

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'problem') {
        refreshPage();
      if (args.length === 2 && args[1] === '-l') {
        problems.get(args[0], true, message)
      } else {
        problems.get(args[0], false, message)
      }
    }
    if (command === 'contest') {
        refreshPage();
      if (args.length === 2 && args[1] === '-l') {
        contests.get(args[0], true, message)
      } else {
        contests.get(args[0], false, message)
      }
    }

    if (command === 'user') {
        refreshPage();
      if (args.length === 2 && args[1] === '-l') {
        users.get(args[0], true, message)
      } else {
        users.get(args[0], false, message)
      }
    }

    if (command === 'search') {
        refreshPage();
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
        refreshPage();
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
        refreshPage();
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
        var helpcategoryold = args.slice(0).join(" ");

        message.reply('http://bot.jyles.pw/#help');

        //s!help
        if (helpcategory === '') {
            refreshPage();
            message.channel.send("***SeedBot Command Directory***\nPrefix: ***s!***\n*Usage: s!help.[command group]*\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:radio_button: Moderation Commands: **s!help mod**\n:radio_button: Music Commands: **s!help music**\n:radio_button: Other Commands: **s!help other**\n");
            signal.command("A user executed s!help");
        }

        //s!help mod
        else if (helpcategory === 'mod') {
            refreshPage();
            message.channel.send("***SeedBot Moderation Commands***\nPrefix: ***s!***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:radio_button: *Kick* // Command Usage: **s!kick **[user]** reason**\nKick a user\n\n:radio_button: *Ban* // Command Usage: **s!ban** [user] **reason**\nDeportes a user from a server (permantley until pardoned from the server settings)\n\n:radio_button: *Purge* // Command Usage: **s!purge**[ammount of messages]\nDelete Message with a command\n\n");
            signal.command("A user executed s!help mod");
        }

        //s!help other
        else if (helpcategory === 'other') {
            refreshPage();
            message.channel.send("***SeedBot Other Commands***\nPrefix: ***s!***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:radio_button: *Ping* // **s!ping**\n Tests Latency between the bot and the Discord API\n\n:radio_button: *Setup* // **s!setup**\nGives you instructions on how to setup SeedBot\n\n:radio_button: *Discord* // **s!discord** \nGives the end-user the link to the creators discord server\n\n:radio_button: *Invite* // **s!invite** \nGives you the invite link for the discord bot\n\n");
            signal.command("A user executed s!help other")
        }

        //s!help music
        else if (helpcategory === 'music') {
            refreshPage();
            message.channel.send("***Bot is broken and awaing fixing by the developer***\n\n~~***SeedBot Music Commands***\nPrefix: ***s?***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:radio_button: *Play* // Command Usage: **s?play**[song name or youtube URL]\nPlay a song\n\n:radio_button: *Skip* // **s?skip**\nSkip a song, its sort of self explanitory\n\n:radio_button: *Leave* // **s?leave**\nDisconnects the bot from the voice channel\n\n:radio_button: *Queue* // **s?queue**\nShows what songs are currentley queued.\n\n:radio_button: *Volume* // Command Usage: **s?vol** [volume count 0-100]\nChange th volume of the music (server-wide)\n~~");
            signal.command("A user executed s!help music");
        }

        //s!help dmoj
        else if (helpcategory === 'dmoj') {
            refreshPage();
            message.channel.send("***SeedBot DMOJ Commands***\nPrefix: ***s!***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:radio_button: *Problem* // Command Usage: s!problem info <Problem Code>\n (pass the -l flag for language list)\n:radio_button: *Contests* // Command Usage: s!contest <Content Code>\n (pass the -l flag for top 10 leaderboard)\n:radio_button: *Users* // Command usage: s!user <Username>\n (pass the -l flag for a list of solved problems)");
            signal.command("A user executed s!help dmoj");
        }
    }

    //OTHER COMMANDS______________________________________________________________
    if (command === "ping") {
        refreshPage();
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
        signal.command("A user executed s!ping");
    }
    if (command === "invite") {
        refreshPage();
        message.reply("Here is the Invite link for SeedBot\n https://goo.gl/pA7oFj");
        signal.command("A user executed s!invite");
    }
    if (command === "discord") {
        refreshPage();
        message.reply("Here is my creators discord!\n http://gg.jyles.pw");
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
        refreshPage();
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
        refreshPage();
        message.reply("To Setup SeedBot You need to Create ***Two Roles***\n One Role with the name of ``SeedModerator``\n and the other role with the name of ``SeedAdmin``\n And You should be set to use the Moderation Commands!");
        signal.command("A user executed s!setup");
    }


    //OWNER ONLY COMMANDS______________________________________________

    //Show Number of servers and List of Servers
    if (command === 'svrs') {
        refreshPage();
        if (message.author.id === '230485481773596672') {
            message.author.send("Number of Available Servers: " + client.guilds.size);
            var list = client.guilds.array().sort();
            message.author.send("Available Servers: " + list);
            signal.owner("An Owner executed s!srvrs");
        }
        else {
            message.reply('Unable to perform action - you do not have the appropriate role');
            signal.error("A user executed s!srvrs without appropriate permissions");
        }
    }

    //Shows Number of accesable channels
    if (command === 'chnls') {
        refreshPage();
        if (message.author.id === '230485481773596672') {
            message.author.send("Number of Available Channels: " + client.channels.size);
            var list = client.channels.array().sort();
            message.author.send("Available Channels: " + list);
            signal.owner("An Owner executed s!chnls");
        }
        else {
            message.reply('Unable to perform action - you do not have the appropriate role');
            signal.error("A user executed s!chnls without appropriate permissions");
        }
    }
    if (command === 'exec') {
      if (message.author.id === owner) {
      childProcess.exec(args.join(' '), {},
        (err, stdout, stderr) => {
            if (err) return message.channel.sendCode('', err.message);
            message.channel.sendCode('', stdout);
        });
      }
    }

    //Changes the Rich Presence
    if (command === 'rpc') {
        var game = args.slice(0).join(" ");
        refreshPage();

        // only @Seed#0001 and @CheezBiscuit can access this command

        //Checking if the sender is a certian user
        if (message.author.id === '230485481773596672' || message.author.id === '317250979311386627') {

            //reset command
            if (game === 'reset') {
                client.user.setActivity('s!help // bot.jyles.pw // Serving ' + client.guilds.size + ' servers');
                message.author.send('Rich Presence Has Been Reset!');
                signal.owner("A Owner executed s!rp reset");
            }
            else {
                client.user.setActivity(game + ' // bot.jyles.pw // Serving ${client.guilds.size} servers');
                message.author.send('Rich Presence Status Updated To: ' + game);
                signal.owner("A Owner executed s!rp " + game + ", game set to " + game);
            }
        }
        else {
            message.reply('you do not have permissions to use this command,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***');
            signal.error("A user eSxecuted s!rp without appropriate permissions")
        }
    }
    if (command === 'spam') {
        var text = args.slice(0).join(" ");
        var messagecount = number(0);
        signal.owner("An Owner Executed the s!spam command");

        while (messagecount < Number(999999)) {
            message.channel.send(text);
            var messagecount = messagecount + number(1);
        }

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


});

























client.on("ready", () => {
    signal.info(`Bot has started, with ` + client.users.size + ` users, in ` + client.channels.size + ` channels of ` + client.guilds.size + ` guilds.`);

    client.user.setActivity(`s!help // v` + ver + ` // ` + client.guilds.size + ` guilds.`);
});
client.login(config.token);
