const Discord = require("discord.js");
const Music = require('discord.js-musicbot-addon');
console.log('copyright 2018, jyles.pw\n\n\n\n');
const client = new Discord.Client();
const config = require("./config.json");




/////////////////////////////////////////////////////////////////////////////////////
//CHANGELOG
/////////////////////////////////////////////////////////////////////////////////////
//16.06.2018 VERISON 0.1 [PUBLIC RELEASE]
//+Mod Commands
//~Developing Music
//[TBA]DMOJ Plugin (Suguested by @CheezBiscut#9461)
/////////////////////////////////////////////////////////////////////////////////////
//  JOIN MY DISCORD
//  gg.jyles.pw
//  @Seed#0001
//  bot.jyles.pw
/////////////////////////////////////////////////////////////////////////////////////




client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  



  //HELP SCRIPTS_____________________________________________________________
  if (command === "help") {
    message.channel.send("***SeedBot Command Directory***\nPrefix: ***s!***\n*Usage: s!help.[command group]*\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n•Moderation Commands: **s!help.mod**\n•Music Commands: **s!help.music**\n•Other Commands: **s!help.other**\n");

  }
  if (command === "help.mod") {

    message.channel.send("***SeedBot Moderation Commands***\nPrefix: ***s!***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n•*Kick* // Command Usage: **s!kick **[user]** reason**\nKick a user\n\n•*Ban* // Command Usage: **s!ban** [user] **reason**\nDeportes a user from a server (permantley until pardoned from the server settings)\n\n•*Purge* // Command Usage: **s!purge**[ammount of messages]\nDelete Message with a command\n\n");
  }
  if (command === "help.other") {
    message.channel.send("***SeedBot Other Commands***\nPrefix: ***s!***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n•*Ping* // **s!ping**\n Tests Latency between the bot and the Discord API\n\n•*Setup* // **s!setup**\nGives you instructions on how to setup SeedBot\n\n•*Discord* // s!discord \nGives the end-user the link to the creators discord server\n\n•*Invite* // s!invite \nGives you the invite link for the discord bot\n\n");
  }
  if (command === "help.music") {
    message.channel.send("***SeedBot Music Commands***\nPrefix: ***s?***\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n•*Play* // Command Usage: **s?play**[song name or youtube URL]\nPlay a song\n\n•*Skip* // **s?skip**\nSkip a song, its sort of self explanitory\n\n•*Leave* // **s?leave**\nDisconnects the bot from the voice channel\n\n•*Queue* // **s?queue**\nShows what songs are currentley queued.\n\n•*Volume* // Command Usage: **s?vol** [volume count 0-100]\nChange th volume of the music (server-wide)\n");
  }


  //OTHER COMMANDS______________________________________________________________
  if (command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  if (command === "invite") {
    message.reply("Here is the Invite link for SeedBot\n https://goo.gl/pA7oFj");
  }
  if (command === "discord") {
    message.reply("Here is my creators discord!\n http://gg.jyles.pw");
  }





  //Moderation commands ___________________________________________________________________________
  if(command === "kick") {
    if(!message.member.roles.some(r=>["seedadmin", "seedmod"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    if(!reason) reason = "No reason provided";
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);
  }

  if(command === "ban") {
    if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");
    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if(command === "purge") {
    const deleteCount = parseInt(args[0], 10);
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }






  //INIT COMMANDS __________________________________________________
  if (command === "setup") {
    message.reply("To Setup SeedBot You need to Create ***Two Roles***\n One Role with the name of ``SeedModerator``\n and the other role with the name of ``SeedAdmin``\n And You should be set to use the Moderation Commands!");
  }

  //SERVER SIDE COMMANDS___________________________________________________________
  if (command === 'ad-servers') {
    console.log("Number of Available Servers: " + client.guilds.size);
    var list = client.guilds.array().sort();
    console.log("Available Servers: " + list);
  }
  if (command === 'ad-channels') {
    console.log("Number of Available Channels: " + client.channels.size);
    var list = client.channels.array().sort();
    console.log("Available Channels: " + list);
  }



});

























client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`s!help // bot.jyles.pw // Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`s!help // bot.jyles.pw // Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`s!help // bot.jyles.pw // Serving ${client.guilds.size} servers`);
});
Music.start(client, {
  prefix: 's?', // Prefix for the commands.
  global: true,            // Non-server-specific queues.
  maxQueueSize: 64,        // Maximum queue size of 25.
  clearInvoker: true,      // If permissions applicable, allow the bot to delete the messages that invoke it.  helpCmd: 'help',        // Sets the name for the help command.
  playCmd: 'play',        // Sets the name for the 'play' command.
  volumeCmd: 'vol',     // Sets the name for the 'volume' command.
  leaveCmd: 'leave',      // Sets the name for the 'leave' command.
  enableQueueStat: true,
  youtubeKey: config.ytapi,
});
client.login(config.token);