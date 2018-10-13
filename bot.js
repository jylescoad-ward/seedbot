const Discord = require("discord.js");
const { RichEmbed } = require('discord.js')
const client = new Discord.Client();
const config = require("./config.json");
// const Music = require('discord.js-musicbot-addon');

//DMOJ Modules
const problems = require('./DMOJ-Modules/problem.js')
const contests = require('./DMOJ-Modules/contest.js')
const users = require('./DMOJ-Modules/user.js')

const { Signale } = require('signale');
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
            color: 'purple',
            label: 'OWNER COMMAND',
        }
    }
};
// setTimeout(function(){
//     doSomething();
// }, 3000);
const signal = new Signale(options);
var build = '291';
var ver = '0.2.6';

signal.info("Starting the SeedBot...")
signal.info("Copyright 2018, jyles.pw")
signal.info("Running SeedBot version " + ver + " build " + build)

//----------------------------------------------------------------------------------------------------
//CHANGELOG      //       INFO                                                                       |
//----------------------------------------------------------------------------------------------------
//        28.07.2018 VERISON 0.2.6 [PUBLIC RELEASE]                                                  |
//        BUILD 291                                                                                  |
//----------------------------------------------------------------------------------------------------
//                                                                                                   |
// Music                                              [Awaiting on Addon Developer]       16.06.2018 |
// Custom Rich Presence Commands (Owner Only)         [Added // n&#069;^2d more eyedeers] 20.06.2018 |
// Fix Crash on changing rpc via discord vgui         [Reported // @CheezBiscut, can u fix?]27.7.18  |
//----------------------------------------------------------------------------------------------------
//  JOIN MY discord                                                                                  |
//  gg.jyles.pw                                                                                      |
//  bot.jyles.pw                                                                                     |
//  @Seed#0001                                                                                       |
//----------------------------------------------------------------------------------------------------
//  COLLABORATORS                 |                                                                  |
// ________________________________                                                                  |
// @CheezBiscut#9461                                                                                 |
// @Seed#0001                                                                                        |
//----------------------------------------------------------------------------------------------------
//                                                                                                   |
//                                                                                                   |
// LATEST ADDITIONS                                                                                  |
// Changed s!rp --> s!rpc                             Fixed on 28.7.2018                             |
// >>MODULAR HELP SYSTEM<<                            Added on 28.7.2018                             |
// Added more simple Help COMMANDS                    Added on 27.6.2018                             |
// Added DMOJ problem info compatability              Added on 26.6.2018                             |
// Fixed [ 'Music' is not defined ]                   Fixed on 26.6.2018                             |
// More Logging Stuff (50%)                           Added on 26.6.2018                             |
// More Logging Stuff (30%)                           Added on 25.6.2018                             |
// Created DEV branch on Github                       Added on 25.6.2018                             |
// Added Signale compatability                        Added on 24.6.2018                             |
// Fixed Rich Presence Command                        Added on 21.6.2018                             |
//                                                                                                   |
// LATEST REMOVALS                                                                                   |
// Old confusing non-modular help system              Removed on 28.7.2018                           |
// Removed A User from Owner List                     Removed on 26.6.2018                           |
// Buggy Stuff                                        Removed on 25.6.2018                           |
// Removed random shit that is decrepecated.          Removed on 21.6.2018                           |
//                                                                                                   |
//----------------------------------------------------------------------------------------------------

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === 'help') {
      if (args.length === 0) {

        message.channel.send(help);
      } else {


        if (args[0] === 'problems') {
          message.channel.send(problems)
        } else if (args[0] === 'contests') {
          message.channel.send(contests)
        } else if (args[0] === 'users') {
          message.channel.send(users)
        }
      }
    }
    if (command === 'ping') {
      message.channel.send('I hear you, ' + message.author.username + '!')
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
        var helpcategory = args.slice(0).join(" ");

        //s!help
        if (helpcategory === '') {
            message.channel.send("***SeedBot Command Directory***\nPrefix: ***s!***\n*Usage: s!help.[command group]*\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:diamond_shape_with_a_dot_inside: Moderation Commands: **s!help mod**\n:diamond_shape_with_a_dot_inside: Music Commands: **s!help music**\n:diamond_shape_with_a_dot_inside: Other Commands: **s!help other**\n");
            signal.command("A user executed s!help");
        }

        //s!help mod
        else if (helpcategory === 'mod') {
            message.channel.send("***SeedBot Moderation Commands***\nPrefix: ***s!***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:diamond_shape_with_a_dot_inside: *Kick* // Command Usage: **s!kick **[user]** reason**\nKick a user\n\n:diamond_shape_with_a_dot_inside: *Ban* // Command Usage: **s!ban** [user] **reason**\nDeportes a user from a server (permantley until pardoned from the server settings)\n\n:diamond_shape_with_a_dot_inside: *Purge* // Command Usage: **s!purge**[ammount of messages]\nDelete Message with a command\n\n");
            signal.command("A user executed s!help mod");
        }

        //s!help other
        else if (helpcategory === 'other') {
            message.channel.send("***SeedBot Other Commands***\nPrefix: ***s!***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:diamond_shape_with_a_dot_inside: *Ping* // **s!ping**\n Tests Latency between the bot and the Discord API\n\n:diamond_shape_with_a_dot_inside: *Setup* // **s!setup**\nGives you instructions on how to setup SeedBot\n\n:diamond_shape_with_a_dot_inside: *Discord* // **s!discord** \nGives the end-user the link to the creators discord server\n\n:diamond_shape_with_a_dot_inside: *Invite* // **s!invite** \nGives you the invite link for the discord bot\n\n");
            signal.command("A user executed s!help other")
        }

        //s!help music
        else if (helpcategory === 'music') {
            message.channel.send("***SeedBot Music Commands***\nPrefix: ***s?***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:diamond_shape_with_a_dot_inside: *Play* // Command Usage: **s?play**[song name or youtube URL]\nPlay a song\n\n:diamond_shape_with_a_dot_inside: *Skip* // **s?skip**\nSkip a song, its sort of self explanitory\n\n:diamond_shape_with_a_dot_inside: *Leave* // **s?leave**\nDisconnects the bot from the voice channel\n\n:diamond_shape_with_a_dot_inside: *Queue* // **s?queue**\nShows what songs are currentley queued.\n\n:diamond_shape_with_a_dot_inside: *Volume* // Command Usage: **s?vol** [volume count 0-100]\nChange th volume of the music (server-wide)\n");
            signal.command("A user executed s!help music");
        }

        //s!help dmoj
        else if (helpcategory === 'dmoj') {
          const problems = new RichEmbed()
            .setTitle('**Problems**')
            .setColor(0xf40000)
            .setDescription('Give problem info:\n   `!DMOJ problem <Problem Code> (pass the -l flag for language list)`\nSearch Problems:\n   `!DMOJ search <Problem Code> (pass the -l flag for language list)`\n')

          const contests = new RichEmbed()
            .setTitle('**Contests**')
            .setColor(0x00f400)
            .setDescription('Give contest info:\n   `!DMOJ contest <Contest Code> (pass the -l flag for top 10 leaderboard)`\nSearch Contests:\n   `!DMOJ contest-search <Contest Code>`\n')

          const users = new RichEmbed()
            .setTitle('**Users**')
            .setColor(0x0000f4)
            .setDescription('Give user info:\n   `!DMOJ user <Username> (pass the -l flag for a list of solved problems)`\nSearch Users:\n   `!DMOJ user-search <Username>`')

            message.channel.send(problems)
            message.channel.send(contests)
            message.channel.send(users)
            signal.command("A user executed s!help dmoj");
        }
    }

    //OTHER COMMANDS______________________________________________________________
    if (command === "ping") {
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
        signal.command("A user executed s!ping");
    }
    if (command === "invite") {
        message.reply("Here is the Invite link for SeedBot\n https://goo.gl/pA7oFj");
        signal.command("A user executed s!invite");
    }
    if (command === "discord") {
        message.reply("Here is my creators discord!\n http://gg.jyles.pw");
        signal.command("A user executed s!discord");
    }





    //Moderation commands ___________________________________________________________________________

    //Kick Command
    if (command === "kick") {
        if (!message.member.roles.some(r => ["seedadmin", "seedmod"].includes(r.name)))
            signal.error("A user executed s!kick without appropriate permissions");
        return message.reply("Sorry, you don't have permissions to use this!");
        let member = message.mentions.members.first() || message.guild.members.get(args[0]);
        if (!member)
            signal.error("A user executed s!kick without appropriate member name");
        return message.reply("Please mention a valid member of this server");
        if (!member.kickable)
            signal.error("A user executed s!kick without appropriate bot permissions");
        return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
        if (!reason) reason = "No reason provided";
        await member.kick(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
        message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
        signal.command("A user executed s!kick");
    }

    //Ban Command
    if (command === "ban") {
        if (!message.member.roles.some(r => ["Administrator"].includes(r.name)))
            signal.error("A user executed s!ban without appropriate permissions");
        return message.reply("Sorry, you don't have permissions to use this!");
        let member = message.mentions.members.first();
        if (!member)
            signal.error("A user executed s!ban without appropriate member name");
        return message.reply("Please mention a valid member of this server");
        if (!member.bannable)
            signal.error("A user executed s!ban without appropriate bot permissions");
        return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
        let reason = args.slice(1).join(' ');
        if (!reason) reason = "No reason provided";
        await member.ban(reason)
            .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
        message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
        signal.command("A user executed s!ban");
    }

    //Purge Command
    if (command === "purge") {
        const deleteCount = parseInt(args[0], 10);
        if (!deleteCount || deleteCount < 2 || deleteCount > 100)
            signal.command("A user executed s!purge without appropriate purge scale");
        return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
        const fetched = await message.channel.fetchMessages({ limit: deleteCount });
        message.channel.bulkDelete(fetched)
            .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
        signal.command("A user executed s!purge");
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
            client.channel.get('489303673126780948').sent('***New Request!***\n**Requested by: ' + message.author.toString() + '\n**Request Details: ' + userrequest);
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


    //OWNER ONLY COMMANDS______________________________________________

    //Show Number of servers and List of Servers
    if (command === 'svrs') {
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

    //Changes the Rich Presence
    if (command === 'rpc') {
        var game = args.slice(0).join(" ");

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
            signal.error("A user executed s!rp without appropriate permissions")
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



});

























client.on("ready", () => {
    signal.info(`Bot has started, with ` + client.users.size + ` users, in ` + client.channels.size + ` channels of ` + client.guilds.size + ` guilds.`);
    client.user.setActivity(`s!help // bot.jyles.pw // Serving ` + client.guilds.size + ` servers`);
});
// Music.start(client, {
//     prefix: 's?', // Prefix for the commands.
//     global: true,            // Non-server-specific queues.
//     maxQueueSize: 64,        // Maximum queue size of 25.
//     clearInvoker: true,      // If permissions applicable, allow the bot to delete the messages that invoke it.  helpCmd: 'help',        // Sets the name for the help command.
//     playCmd: 'play',        // Sets the name for the 'play' command.
//     volumeCmd: 'vol',     // Sets the name for the 'volume' command.
//     leaveCmd: 'leave',      // Sets the name for the 'leave' command.
//     enableQueueStat: true,
//     youtubeKey: config.ytapi,
// });
client.login(config.token);
