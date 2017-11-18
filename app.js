var Discord = require('discord.js');
var bot = new Discord.Client();
var fs = require('fs');
var profanities = require('profanities')

 var userData = JSON.parse(fs.readFileSync('Storage/userdata.json', 'utf8'));
 var commandsList = fs.readFileSync('Storage/commands.txt', 'utf8'); 
 
 function userInfo(user) {
   var finalString = '';

   finalString += '**' + user.username + '**, with the **DNA** of **' + 'a human' + '**';
   var userCreated = user.createdAt.toString().split(' ')
   finalString += ', was **created on ' + userCreated[1] + ' ' + userCreated[2] + ', ' + userCreated[3] + '**.'

   finalString += ' Since then, they have **sent ' + userData[user.id].messagesSent + ' messages** to this discord server.'

   return finalString;
 }

bot.on('message', message => {

  var sender = message.author;
  var msg = message.content.toLowerCase();
  var prefix = '-'
  
  for (x = 0; x < profanities.length; x++) {
    if (message.content.toUpperCase() == profanities[x].toUpperCase()) {
      message.channel.send('Hey! That word is forbidden!')
      message.delete();
      return;
    }

  }

  if (sender.id === '379184816069017601') {
      return;
  }

  if (msg === prefix + 'help' || msg === prefix + 'commands') {
  
    message.channel.send(commandsList)
  }

  if (msg === prefix + 'dertsz')
  
  message.channel.send({embed:{
    title:"dertsz",
    description:"A command for dertsz, a person who loves kurwaballs.",
    url:"https://cdn.discordapp.com/attachments/380021090304524298/380044113870979102/Baslksz15-1.png",
    color: 0x00f4ff
  }})

  if (msg === prefix + 'ping') {
  
    message.channel.send({embed:{
        title:"Ping!",
        description:"Pong!",
        color:0x00f4ff
    }})
    }
    
    if (msg === prefix + 'info') {
    
        message.channel.send({embed:{
        title:"Midnight",
        description:"Information about me",
        color: 0x00f4ff,
        fields:[
          {
              name:"About me",
              value:"Hello. I'll introduce myself to people who do not know who I am. I am Midnight. I have been created to serve discord servers. You could say I am your butler. I can help you moderate your discord server to keep it troll-free.",
              inline:false
          },
          {
              name:"Announcement",
              value:"This bot is under development. Please report any errors to me.",
              inline:false
          },
          {
            name:"Usage",
            value:"You can do '-info' for all the commands you can use.",
            inline:false
          },
          {
            name:"Information",
            value:"- Developed by MaC#8311",
            inline:false
          },

        ],
        timestamp: new Date(),
        footer: {
          test:'This is a test.'

        }
    }})

    }

  if (message.channel.id === '379193076163411978') {
    if (isNaN(message.content)) {
      message.delete()
      message.author.send('Please only post the number, and not any other text in this channel, thank you!')

    }

  }

  if (msg.includes("lettuce")) {
      message.delete();
      message.author.send('The word **lettuce** is banned, please do not use it.')

  }

  if (msg.startsWith(prefix + 'userinfo')) {
  
    if (msg === prefix + 'userinfo') {
      message.channel.send(userInfo(sender));
    }

  }

    if (!userData[sender.id]) userData[sender.id] = {
      messagesSent: 0
    }

    userData[sender.id].messagesSent++; // This adds one to 'messagesSent', under the user
    
    fs.writeFile('Storage/userData.json', JSON.stringify(userData), (err) => {
      if (err) console.error(err);
    });

});

 bot.on('ready', () => {
   console.log('Bot launched.')

   bot.user.setStatus('online')

   bot.user.setGame('-info')

 });

 bot.on('guildMemberAdd', member => {
   console.log('Player ' + member.username + ' has joined the server!')
   
 var role = member.guild.roles.find('name', 'Player');

 member.addRole(role)

 member.guild.channels.get('379274106325172246').send('**' + member.user.username + '** has joined the server! We hope you enjoy your stay.'); // The first part gets the channel, the second sends a message to the channel



});

 bot.on('guildMemberRemove', member => {

   member.guild.channels.get('379274106325172246').send('**' + member.user.username + '** has left the server.  Bye bye.');

 })

 client.login('process.env.Mzc5MTg0ODE2MDY5MDE3NjAx.DPHjWg.lPbOG2Tk9QbDIhTnsCEZUfqSHfE');
