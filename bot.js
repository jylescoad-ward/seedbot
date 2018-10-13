
//Changelog Moved to changelog.txt

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const Music = require('discord.js-musicbot-addon');
const { Signale } = require('signale');

//DMOJ MODULE
const problems = require('./dmoj/problem.js')
const contests = require('./dmoj/contest.js')
const users = require('./dmoj/user.js')
//END OF DMOJ MODULE

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
var build = '372';
var ver = '0.3';

signal.info("Starting the SeedBot...")
signal.info("Copyright 2018, jyles.pw")
signal.info("Running SeedBot version " + ver + " build " + build)

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


    //>>>REDESIGNED HELP SYSTEM (MODULAR)<<<
    if (command === 'help') {
        var helpcategory = args.slice(0).join(" ");

        //s!help
        if (helpcategory === '') {
            message.channel.send("***SeedBot Command Directory***\nPrefix: ***s!***\n*Usage: s!help.[command group]*\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:radio_button: Moderation Commands: **s!help mod**\n:radio_button: Music Commands: **s!help music**\n:radio_button: Other Commands: **s!help other**\n");
            signal.command("A user executed s!help");
        }

        //s!help mod
        else if (helpcategory === 'mod') {
            message.channel.send("***SeedBot Moderation Commands***\nPrefix: ***s!***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:radio_button: *Kick* // Command Usage: **s!kick **[user]** reason**\nKick a user\n\n:radio_button: *Ban* // Command Usage: **s!ban** [user] **reason**\nDeportes a user from a server (permantley until pardoned from the server settings)\n\n:radio_button: *Purge* // Command Usage: **s!purge**[ammount of messages]\nDelete Message with a command\n\n");
            signal.command("A user executed s!help mod");
        }

        //s!help other
        else if (helpcategory === 'other') {
            message.channel.send("***SeedBot Other Commands***\nPrefix: ***s!***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:radio_button: *Ping* // **s!ping**\n Tests Latency between the bot and the Discord API\n\n:radio_button: *Setup* // **s!setup**\nGives you instructions on how to setup SeedBot\n\n:radio_button: *Discord* // **s!discord** \nGives the end-user the link to the creators discord server\n\n:radio_button: *Invite* // **s!invite** \nGives you the invite link for the discord bot\n\n");
            signal.command("A user executed s!help other")
        }

        //s!help music
        else if (helpcategory === 'music') {
            message.channel.send("***Bot is broken and awaing fixing by the developer***\n\n~~***SeedBot Music Commands***\nPrefix: ***s?***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:radio_button: *Play* // Command Usage: **s?play**[song name or youtube URL]\nPlay a song\n\n:radio_button: *Skip* // **s?skip**\nSkip a song, its sort of self explanitory\n\n:radio_button: *Leave* // **s?leave**\nDisconnects the bot from the voice channel\n\n:radio_button: *Queue* // **s?queue**\nShows what songs are currentley queued.\n\n:radio_button: *Volume* // Command Usage: **s?vol** [volume count 0-100]\nChange th volume of the music (server-wide)\n~~");
            signal.command("A user executed s!help music");
        }

        //s!help dmoj
        else if (helpcategory === 'dmoj') {
            message.channel.send("***SeedBot DMOJ Commands***\nPrefix: ***s!***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n:radio_button: *Problem* // Command Usage: s!dmoj problem info <Problem Code>\n (pass the -l flag for language list)\n:radio_button: *Contests* // Command Usage: s!dmoj contest <Content Code>\n (pass the -l flag for top 10 leaderboard)\n:radio_button: *Users* // Command usage: s!dmoj user <Username>\n (pass the -l flag for a list of solved problems)");
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
        if (!message.member.roles.some(r => ["seedadmin", "seedmod"].includes(r.name)) || !message.author.id === '230485481773596672')
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
        if (!message.member.roles.some(r => ["seedadmin"].includes(r.name)) || !message.author.id === '230485481773596672')
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
        client.users.get(member).send("You have been banned\n reason: " + reason);
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
        var msgcount = number(0);
        signal.owner("An Owner Executed the s!spam command");

        while (msgcount < Number(999999)) {
            message.channel.send(text);
            var msgcount = msgcount + number(1);
        }

    }


    //USER CREATED MODULES ___________________________________________________________________________

    //DMOJ MODULE COMMANDS____________________________________________________________________________


});

























client.on("ready", () => {
    signal.info(`Bot has started, with ` + client.users.size + ` users, in ` + client.channels.size + ` channels of ` + client.guilds.size + ` guilds.`);
    client.user.setActivity(`s!help // v` + ver + ` // ` + client.guilds.size + ` guilds.`);
});
client.login(config.token);
