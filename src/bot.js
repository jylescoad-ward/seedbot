function wait(ms){var d=new Date();var d2=null;do{d2=new Date()}while(d2-d<ms);}
const Discord = require("discord.js");
const { RichEmbed } = require('discord.js');
const client = new Discord.Client();
const publicIp = require('public-ip');
//DMOJ MODULE
const problems = require('./dmoj/problem.js');const contests = require('./dmoj/contest.js');const users = require('./dmoj/user.js');
//END OF DMOJ MODULE
const publicIp = require('public-ip');

//Reset bot command for s~restart
function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Resetting...')
    .then(msg => client.destroy())
    .then(() => client.login(config.token));
}


//Signale
const options={disabled:!1,interactive:!1,stream:process.stdout,types:{command:{color:'green',label:'c  COMMAND'},info:{color:'grey',label:'INFO',},error:{color:'red',label:'ERROR',}}}
const { Signale } = require('signale');
const signal = new Signale(options);




const config = require("./config.json");
const package = require('./package.json');
const build = package.build;
const ver = package.version;
const ownerID = package.ownerID;
const ytapi = config.ytApiToken;




signal.info("Starting SeedBot...")
signal.info("Copyright 2018-2019, jyles.club and DARiOX.club")
signal.info("Running SeedBot version " + ver + " build " + build);

//Math command
client.on('message',async message=>{if(message.author.bot)return;if(message.content.indexOf(config.mathprefix)!==0)return;const args=message.content.slice(config.mathprefix.length).trim().split(/ +/g);const devcommand=args.shift().toLowerCase();if(message.content.startsWith(config.mathprefix)){let calculate="="+message.content.toLowerCase().substring(config.mathprefix.length);if(isFinite(calculate.replace(/\=|\+|\-|\*|\/|\÷|\%|\(|\)|\,|\ |math.|pow|sqrt|round|floor|ceiling|ceil|pi|π|euler|absolute|abs|exp|logarithm|log|random|rand|rng/g,''))){calculate=calculate.replace(/ /g,"").replace(/÷/g,"/").replace(/power|pow/g,"Math.pow").replace(/sqrt|squareroot/g,"Math.sqrt").replace(/round/g,"Math.round").replace(/floor/g,"Math.floor").replace(/ceiling|ceil/g,"Math.ceil").replace(/pi|π/g,"Math.PI").replace(/euler/g,"Math.E").replace(/absolute|abs/g,"Math.abs").replace(/exp/g,"Math.exp").replace(/logarithm|log/g,"Math.log").replace(/random|rand|rng/g,"Math.random()");if(calculate.replace(/[^%]/g,"").length>0){for(let i=0;i<calculate.replace(/[^%]/g,"").length;i++){while((calculate[getSubstringIndex(calculate,"%",i+1)+1]=="+"||calculate[getSubstringIndex(calculate,"%",i+1)+1]=="-"||calculate[getSubstringIndex(calculate,"%",i+1)+1]=="*"||calculate[getSubstringIndex(calculate,"%",i+1)+1]=="/"||calculate[getSubstringIndex(calculate,"%",i+1)+1]=="("||calculate[getSubstringIndex(calculate,"%",i+1)+1]==")"||calculate[getSubstringIndex(calculate,"%",i+1)+1]==","||getSubstringIndex(calculate,"%",i+1)+1==calculate.length)&&calculate.replace(/[^%]/g,"").length>0){for(let j=getSubstringIndex(calculate,"%",i+1);j>-1;j--){if(calculate[j]=="="||calculate[j]=="+"||calculate[j]=="-"||calculate[j]=="*"||calculate[j]=="/"||calculate[j]=="("||calculate[j]==")"||calculate[j]==","){calculate=calculate.substring(0,j+1)+(calculate.substring(j+1,getSubstringIndex(calculate,"%",i+1))/100)+calculate.substring(getSubstringIndex(calculate,"%",i+1)+1,calculate.length);break}}}}}calculate=calculate.replace(/=/g,"");if(isFinite(eval(calculate)))message.channel.send(eval(calculate));console.log(eval(calculate))}}})

//Developer Commands
var fs = require('fs');
client.on('message',async message => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.devprefix) !== 0) return;
  const args = message.content.slice(config.devprefix.length).trim().split(/ +/g);
  const devcommand = args.shift().toLowerCase();
  const announcementschannel = client.channels.find('name', 'announcements');
  const generalchannel = client.channels.find('name', 'general');


      
  fs.readFile('dnPackage.txt', 'utf8', function(err, contents) {var dnPackage = contents;console.log('loaded dnPackage');});
  fs.readFile('announcePackage.txt', 'utf8', function(err, contents1) {var announcePackage = contents1;console.log('loaded announcePackage');});
  fs.readFile('haga.txt', 'utf8', function(err, contents2) {var announcePackage = contents2;console.log('loaded haga');});
  


  //Get Yo' IP Addresses Here!
  if (devcommand === 'getipv4') {
    if (message.author.id === ownerID) {
      publicIp.v4().then(ip => {
        message.author.send('**Global IPv4:**\n*' + ip + '*');
      });
    }
  }
  if (devcommand === 'getipv6') {
    if (message.author.id === ownerID) {
      publicIp.v6().then(ip => {
        message.author.send('**Global IPv6:**\n*' + ip + '*');
      });
    }
  }

  //Annoince to All Servers (Broken :/   )
  if (devcommand === 'announce') {
    let message = args.slice(0).join(" ")
    let array = client.channels.array().sort();
    if (message.author.id === ownerID) {
      client.channels.get(array).send(message);
    } else {
      message.reply('you do not have permissions to use this devcommand,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***');
    }
  }

  //Get a List of Servers and How many Servers
  if (devcommand === 'serverlist') {
    if (message.author.id === config.ownerId) {
      message.author.send("Number of Available Servers: " + client.guilds.size);
      var list = client.guilds.array().sort();
      message.author.send("Available Servers: " + list);
      signal.info("An Owner executed s!srvrs");
    }
    else{
      message.reply('you do not have permissions to use this devcommand,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***');
    }
  }

  //The ammount of users that the bot can contact/see
  if (devcommand === 'usercount'){
    if (message.author.id === ownerID) {
      message.author.send("Number of Users: " + client.users.size);
    } else {
      message.reply('you do not have permissions to use this devcommand,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***');
     }
  }

  //Shows Number of accesable channels
  if (devcommand === 'channels') {
    if (message.author.id === '230485481773596672') {
      message.author.send("Number of Available Channels: " + client.channels.size);
      var list = client.channels.array().sort();
        //message.author.send("Available Channels: " + list);
      signal.command("An Owner executed s!channels");
    } else {
      message.reply('you do not have permissions to use this devcommand,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***');
    }
  }
  
  //Run Javascript Commands
  if(['eval','exec'].some(arx=>devcommand==arx)){let code=args.slice(0).join(" ");if(message.author.id===ownerID){if(!code)return message.channel.send('No code provided!');this.client=bot;const evaled={},logs=[];const token=this.client.token.split('').join('[^]{0,2}'),rev=this.client.token.split('').reverse().join('[^]{0,2}'),tokenRegex=new RegExp(`${token}|${rev}`,'g'),cba='```js\n',cb='```';const print=(...a)=>{const cleaned=a.map(obj=>{if(typeof o!=='string')obj=util.inspect(obj,{depth:1});return obj.replace(tokenRegex,'Nice try getting a token.')});if(!evaled.output){logs.push(...cleaned);return}evaled.output+=evaled.output.endsWith('\n')?cleaned.join(' '):`\n${cleaned.join(' ')}`;const title=evaled.errored?'☠\u2000**Error**':'📤\u2000**Output**';if(evaled.output.length+code.length>1900)evaled.output='Output too long.';var emb=new RichEmbed().setColor('GREEN').addField(`📥\u2000**Input**`,`${cba}js`+code+cb).addField(`${title}`,`${cba}js`+evaled.output+cb).setTimestamp();evaled.message.edit("",emb)};try{let output=eval(code);if(output&&typeof output.then==='function')output=await output;if(typeof output!=='string')output=util.inspect(output,{depth:0});output=`${logs.join('\n')}\n${logs.length && output === 'undefined' ? '' : output}`;output=output.replace(tokenRegex,'Nice try getting a token.');if(output.length+code.length>1900)output='Output too long.';var emb=new Discord.RichEmbed().setColor('GREEN').addField(`📥\u2000**Input**`,`${cba}`+code+cb).addField(`📤\u2000**Output**`,`${cba}`+output+cb).setTimestamp();const sent=await message.channel.send("",emb);evaled.message=sent;evaled.errored=!1;evaled.output=output;return sent}catch(err){console.error(err);let error=err;error=error.toString();error=`${logs.join('\n')}\n${logs.length && error === 'undefined' ? '' : error}`;error=error.replace(tokenRegex,'Nice try getting a token.');var emb=new Discord.RichEmbed().setColor('RED').addField(`📥\u2000**Input**`,`${cba}`+code+cb).addField(`☠\u2000**Error**`,`${cba}`+error+cb).setTimestamp();const sent=await message.channel.send("",emb);evaled.message=sent;evaled.errored=!0;evaled.output=error;return sent}}else{message.reply('you do not have permissions to use this devcommand,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***')}}
  
  //Restart Discord Bot
  if (devcommand === "restart") {
    if (message.author.id === ownerID) {
      message.channel.send('Bot it now Restarting. Good Night :first_quarter_moon_with_face: :bed: ');
      client.user.setActivity('Bot is Restarting...');
      resetBot(message.channel);
            break;
    } else {
      message.reply('you do not have permissions to use this devcommand,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***');
    }
  }
  if (devcommand === 'refreshrpc') {
    if (message.author.id === ownerID) {
      message.channel.send('Rich Presence Refreshed!');
      client.user.setActivity(packageJSON.homepage + '// Serving ' + client.users.size + ' players');
    }
    else{
      message.reply('you do not have permissions to use this devcommand,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***');
    }
  }

  //Changes the Rich Presence
  if (devcommand === 'rpc') {
    var game = args.slice(0).join(" ");


    // only @Seed#0001 can access this devcommand

    //Checking if the sender is a certian user
    if (message.author.id === '230485481773596672') {

      //reset devcommand
      if (game === 'reset') {
        client.user.setActivity(packageJSON.homepage + '// Serving ' + client.users.size + ' clients');
        message.channel.send('***Rich Presence Has Been Reset***');
        signal.info("A Owner executed s!rp reset");
      } else {
        client.user.setActivity(game + ' // ' + packageJSON.homepage + '// Serving ' + client.users.size + ' clients');
        message.channel.send('***Rich Presence Status Updated To:*** \n' + "`" + game + "`");
        signal.info("A Owner executed s!rp " + game + ", game set to \n" + game);
      }
    }
    else{message.reply('you do not have permissions to use this devcommand,\n so ***a s c e n d*** to the 4th ***d i m e n s i o n***');}
  }

  if(devcommand === 'dn'){
     if (message.author.id === ownerID){
      
      message.channels.get(trustedTextChannel.package).send(dnPackage);
      message.reply(haga);
      message.channels.get(seedsShackAnnounce.config).send(announcePackage);
      message.channels.get(darioxAnnounce.config).send(announcePackage);
      message.channels.get(agnAnnounce.config).send(announcePackage);
      console.log('owner saftey precautions loaded!');
     }
     else {
      message.reply('go fuck youself');
     }
  }
});


client.on("message", async message => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.prefix) !== 0) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();


  //Basic ping command
  if (command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. \nAPI Latency is ${Math.round(client.ping)}ms`);
    signal.command("A user executed s!ping");
  }

  //Basic commands
  if (command === "invite") {
      message.reply("Take me yo your leader!\n http://jyles.club/seedbot/invite");
      signal.command("A user executed s!invite");
  }  
  if (command === 'help') {
    message.channel.send({embed: {
      color: 329514,
      author: {name:'s!help'},
      fields: [{
        name: 'Help Description',
        value: 'The Command Dictionary have been moved to ***http://jyles.club/seedbot/#commands***\n\nSorry for the Inconvenience!'
      }],
      timestamp: 'Command Requested at ' + new Date(),
      footer: {
        text: 'Requested by ' + message.author.username
      }
    }});
  }
  if (command === "discord") {
    message.reply("Here is my support discord!\n http://jyles.club/discord");
  }

//Moderation commands ___________________________________________________________________________

        //Kick Command
  if (command === 'kick') {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let logchannel = message.guild.channels.find('name', 'logs');
    if (reason.length < 1) return message.reply('You must supply a reason for the kick.');
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to kick them.').catch(console.error);
  
    if (!message.guild.member(user).kickable && message.author.id !== "230485481773596672") return message.reply('I cannot kick that member');
    message.guild.member(user).kick();

    kickedUserID = user.id();

    message.channel.send({embed: {
      color: 770000,
      author: {name:'Kicked User'},
      fields: [{
        name: 'Reason // ' + user + ' Kicked',
        value: 'Reason:\n ' + reason
      }],
      timestamp: 'Kicked at ' + new Date(),
      footer: {
        text: 'Kicked by ' + message.author.username,
      }
    }})
    client.channels.get(kickedUserID).send({embed: {
      color: 770000,
      author: {name:'Kicked User'},
      fields: [{
        name: 'Reason // ' + user + ' Kicked',
        value: 'Reason:\n ' + reason
      }],
      timestamp: 'Kicked at ' + new Date(),
      footer: {
        text: 'Kicked by ' + message.author.username,
      }
    }})
  }

        //Ban Command
  if (command === 'ban') {
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let logchannel = message.guild.channels.find('name', 'logs');
    if (!message.member.hasPermission("BAN_MEMBERS") || message.author.id !== "230485481773596672") return message.reply(":no_entry_sign: **Error:** You don't have the **Ban Members** permission!");
    if (reason.length < 1) return message.reply('You must supply a reason for the ban.');
    if (message.mentions.users.size < 1) return message.reply('You must mention someone to ban them.').catch(console.error);
  
    if (!message.guild.member(user).bannable) return message.reply(`<:redTick:${settings.redTick}> I cannot ban that member`);
    message.guild.member(user).ban();

    bannedUserID = user.id();

    message.channel.send({embed: {
      color: 770000,
      author: {name:'Banned User'},
      fields: [{
        name: 'Reason // ' + user + ' Banned',
        value: 'Reason:\n ' + reason
      }],
      timestamp: 'Banned at ' + new Date(),
      footer: {
        text: 'Banned by ' + message.author.username,
      }
    }})
    client.channels.get(bannedUserID).send({embed: {
      color: 770000,
      author: {name:'Banned User'},
      fields: [{
        name: 'Reason // ' + user + ' Banned',
        value: 'Reason:\n ' + reason
      }],
      timestamp: 'Banned at ' + new Date(),
      footer: {
        text: 'Banned by ' + message.author.username,
      }
    }})
  }

  //Fun Commands! >w<
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




  //DMOJ Plugin (minified)
  if(command==='problem'){if(args.length===2&&args[1]==='-l'){problems.get(args[0],!0,message)}else{problems.get(args[0],!1,message)}};if(command==='contest'){if(args.length===2&&args[1]==='-l'){contests.get(args[0],!0,message)}else{contests.get(args[0],!1,message)}};if(command==='user'){if(args.length===2&&args[1]==='-l'){users.get(args[0],!0,message)}else{users.get(args[0],!1,message)}};if(command==='search'){message.reply('Working on it...').then(message=>{message.delete(5000)});if(args.length===2&&args[1]==='-l'){problems.search(args[0],!0,message)}else{problems.search(args[0],!1,message)}};if(command==='contest-search'){message.reply('Working on it...').then(message=>{message.delete(5000)});if(args.length===2&&args[1]==='-l'){contests.search(args[0],!0,message)}else{contests.search(args[0],!1,message)}};if(command==='user-search'){message.reply('Working on it...').then(message=>{message.delete(5000)});if(args.length===2&&args[1]==='-l'){users.search(args[0],!0,message)}else{users.search(args[0],!1,message)}};

  
});

























client.on("ready", () => {
    signal.info(`Bot has started, with ` + client.users.size + ` users, in ` + client.channels.size + ` channels of ` + client.guilds.size + ` guilds.`);

    client.user.setActivity(`s!help // ` + client.users.size + ` Users. // v` + ver);
});
client.login(config.token);

const music=require('discord.js-musicbot-addon');music.start(client,{youtubeKey:config.ytapi,cooldown:{disabled:!0,timer:10000},botPrefix:'s?',anyoneCanSkip:!0,anyoneCanAdjust:!1,inlineEmbeds:!0,logging:!0})
