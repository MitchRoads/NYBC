const Discord = require('discord.js');
const superagent = require("snekfetch");
const client = new Discord.Client();
const config = require('./botconfig.json');
const { prefix, token } = require('./botconfig.json');
const profanities = require('profanities')
const moment = require('moment');
const ms = require("ms");
const moment2 = require('moment-timezone');
require('moment-duration-format');

  client.on("ready", async () => {
  console.log(`${client.user.username} has rode into the online!`);
  client.user.setActivity("National Bike Warfare", {type: "WATCHING"});

let activNum = 0;

setInterval(function() {
 if (activNum === 0) {
  client.user.setActivity("National Bike Warfare", {type: "WATCHING"});
   activNum = 1;
 } else if (activNum === 1) {
  client.user.setActivity("Bikes | n!commamands", {type: "WATCHING"});
   activNum = 0;
 }
}, 20 * 1000);  
});

client.on("message", async (message) => {
if (message.content.toLowerCase().startsWith(`${prefix}test`)) { 
let activNum = 0;

var interval = setInterval (function() {
 if (activNum === 0) {
  let test = message.guild.channels.find(c => c.name === 'test');
	return test.send("Test123")
   activNum = 0;
 }
}, 3 * 1000);  
}
});

client.on("message", async (message, member) => {
  if (message.author.bot) return;	
	const blacklisted = ['Nigga', 'Nigger', 'Tranny', 'Cunt', 'Cumdump', 'Cum Dumpster', 'Bitch', 'Feminazi', 'Retarded', 'Whore', 'Slut', 'Hoe', 'Ghetto', 'Ratchet', 'Cracker', 'Beaner', 'Faggot', 'Fuck', 'Shit', 'Damn', 'Bitch', 'Shitting', 'Fucking', 'Bitching', 'Goddamnit',];
let foundInText = false;
 for (var i in blacklisted) {
  if (message.content.toLowerCase().includes(blacklisted[i].toLowerCase())) foundInText = true;
}


if (foundInText) {
message.channel.send(`${member}, profanity and slurs aren't allowed on this server, the word you used is banned! Read the rules again please. 😤`).then(message => {message.delete(10000)})
message.delete();
}
});

client.on("message", async (message, member) => {
 if (message.content.toLowerCase().startsWith(`${prefix}avatar`)) { 
	   let user = message.mentions.users.first(); 
if(!user) return message.channel.send("You haven't selected/mentioned a user whose avatar you want to see."); 
    let avatarEmbed = new Discord.RichEmbed()
    .setAuthor(`${user.username}'s Profile Picture`)
    .setImage(user.displayAvatarURL)
    .setColor("#2B547E");
    return message.channel.send(avatarEmbed);
}
			if (message.content.toLowerCase().startsWith(`${prefix}clear`)) {
				  if (message.author.bot) return;	
	if(!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("You don't have the permission to manage messages, you will not be able to do this command.");
		let args = message.content.split(/ +/g).slice(1)
	if (isNaN(args[0])) return message.channel.send(`How many messages do you want deleted?`);
if (args[0] > 100) return message.channel.send(`I can only delete 1 to 100 messages at a time.`);
message.channel.bulkDelete(args[0]).then(() => {
message.channel.send(`Successfully cleared **${args[0]} message(s).**`).then(message => message.delete(5000));
message.delete();
});
}
	
	      if (message.content.toLowerCase().startsWith(`${prefix}commands`)) {
  let helpEmbed = new Discord.RichEmbed()
.setTitle("NYBC Commands 🚲")
.setDescription("Down below are the commands for this bot.")
.setColor("#2B547E") 
.addField("Commands:", "avatar, botinfo, serverinfo, report, userinfo, helpful.")
.addField("Prefix/Command Trigger", `n!, example: n!userinfo @Job`)
message.channel.send(helpEmbed);

}
	
	      if (message.content.toLowerCase().startsWith(`${prefix}rules`)) {
  let ruleEmbed = new Discord.RichEmbed()
.setTitle("NYBC CLUB RULES")
.setDescription("Down below are the rules of the server, please respect and follow them. Thank you:")
.setColor(0x2B547E) 
.setImage("https://image.ibb.co/gpXksf/rule.png")
.addField("▫ Rule 1:", "No swearing, especially in forms of denouncement to anyone else.")
.addField("▫ Rule 2:", "Try to respond to @youruser as soon as you can; after joining the chats.")
.addField("▫ Rule 3:", "Respect other’s opinions; be mindful.")
.addField("▫ Rule 4:", "Don’t be afraid to retype your thought if you think it will  come across as incompetent or disrespectful.")
.addField("▫ Rule 5:", "Don't forget to check your e mail frequently.")
.addField("▫ Rule 6:", "Use your leadership skills here.")
.addField("Remember:", "You’re very much appreciated, don’t forget that.")
.setFooter('Rules written by Joshua F. (<@324708944507568130>)', message.guild.iconURL)
.setTimestamp();
message.channel.send(ruleEmbed);

}
	
	
	if (message.content.toLowerCase().startsWith(`${prefix}remind`)) {
			  if (message.author.bot) return;
if (!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("You don't have the permissions to manage messages, you will not be able to do this command.");
let args = message.content.split(/ +/g).slice(1)
let remindtime = args[0]; 
if (!remindtime)
message.channel.send("You didn't put a time!");
setTimeout(function(){ 
let timerChannel =  message.guild.channels.find(c => c.name === 'reminders');
let botmessage = args.slice(1).join(" ");
  let testembed = new Discord.RichEmbed()
  .setColor("#2B547E") 
  .setDescription(`${botmessage}`)
timerChannel.send(testembed).then(message => timerChannel.send(`✉ The timer is done @everyone, look at the reminder above.`))
}, ms(remindtime)); 
}
		if (message.content.toLowerCase().startsWith(`${prefix}directremind`)) {
			  if (message.author.bot) return;
if (!message.member.hasPermission("MANAGE_MESSAGES"))
return message.channel.send("You don't have the permissions to manage messages, you will not be able to do this command.");
let args = message.content.split(/ +/g).slice(1)
let time =  message.guild.channels.find(c => c.name === 'reminder-logs');
//let mentioned = message.content.slice(8);
let remindtime = args[0];  
if (!remindtime) return message.channel.send("You didn't put a time!");
let usertest = message.mentions.users.first();
if (!usertest) return message.channel.send("You didn't mention anyone you want to DM a reminder.") 
//let mentioned = args.slice(25).join(" ");
setTimeout(function(){ 
let membertime = message.author;
let botmessage = args.slice(1).join(" ");
  let testembed = new Discord.RichEmbed()
  .setColor("#2B547E") 
  .setDescription(`${botmessage}`)
usertest.send(testembed).then(message => time.send(`✉ The timer is done ${membertime}, they have received the DM.`))
}, ms(remindtime));  
}

	
 if (message.content.toLowerCase().startsWith(`${prefix}helpful`)) {
  let tepEmbed = new Discord.RichEmbed()
.setTitle("Help Me!!!")
.setDescription("If you need some help with how to use discord, use this channel.")
.setColor("#2B547E") 
.addField("If you want to know more on how you can use discord", "https://www.youtube.com/watch?v=LDVqruRsYtA")
.addField("This is a decent video to start off beginners of discord (on mobile)", "https://www.youtube.com/watch?v=z6AKEpTgHew")
message.channel.send(tepEmbed);
		      }
	
		if (message.content.startsWith(`${prefix}userinfo`)) {
	    let status = {false: "Human", true: "Bot"}
	    let args = message.content.split(/ +/g).slice(1) 
	    let avatarperson = args.join(' ')
            let player = message.mentions.members.first() || message.guild.members.find(mem => mem.user.id === args[0]) || message.guild.members.find(mem => mem.user.tag === avatarperson) || message.guild.members.find(mem => mem.user.username === avatarperson) || message.guild.members.find(mem => mem.nickname === avatarperson) || message.member
            let iicon = player.user.displayAvatarURL;
            let roles = player.roles.filter(r => r.name !== "@everyone").map(r => `<@&${r.id}>`).join(' ').toString() || "None"
	    let user = player.user
	    let rolesize = player.roles.size - 1;
            let highestrole = player.highestRole
            let toprole = (highestrole != "@everyone") ? highestrole : "This user has no roles"
	    let userEmbed = new Discord.RichEmbed()
            .setAuthor(`${user.username}'s Info`, user.displayAvatarURL)
            .setThumbnail(user.displayAvatarURL)
            .setColor(0x374f6b)
            .addField('User ID', user.id, true)
            .addField('Current Tag', user.tag, true)
            .addField('Server Nickname', `${player.nickname || "None"}`, true) 
            .addField('Highest Member Role', toprole, true)
            .addField(`Roles [${rolesize}]`, `${roles}`)
            .addField('Game/Playing', `${(user.presence.game && user.presence.game && user.presence.game.name) || 'None'}`, true)
            .addField('Status', user.presence.status, true)
            .addField('Bot/Human', status[user.bot], true)
            .addField('Joined Server On:', `${moment2(player.joinedAt).format('LLLL')}` + '\n' + `${player.user.tag} joined` + ' ' + moment2(new Date()).diff(player.joinedAt, 'days') + ' days ago')
            .addField('Account Created On:', `${moment2(player.user.createdAt).format('LLLL')}`)
            .setThumbnail(iicon)
            .setTimestamp();
	return message.channel.send(userEmbed);
	
		}	
	
if (message.content.toLowerCase().startsWith(`${prefix}serverinfo`)) {		
    let sicon = message.guild.iconURL;
    let server = message.guild.name;
    let serverembed = new Discord.RichEmbed()
    .setTitle("Server Information")
    .setDescription(`Information on ${server}:`)
    .setColor(0x374f6b)
    .addField('Guild ID', message.guild.id, true)
    .addField('Guild Name', message.guild.name, true)
    .addField('Guild Channel Total', message.guild.channels.size, true)
    .addField('Guild Human Total', message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
    .addField('Guild Bot Total', message.guild.members.filter(m => m.user.bot).size, true)
    .addField('Guild Member Total', message.guild.memberCount, true)
    .addField('Guild Role Total', message.guild.roles.size - 1, true)
    .addField('National Range', "US-West/East", true)
    .addField('Date Of Server Creation', message.guild.createdAt.toLocaleDateString(), true)
    .addField('Guild Owner', message.guild.owner (message.guild.owner.user.tag), true)
    .setFooter(`${server}`, sicon)
    .setThumbnail(sicon) 
    .setTimestamp();
    return message.channel.send(serverembed);
  }
  
   if (message.content.toLowerCase().startsWith(`${prefix}botinfo`)) {
    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setDescription(`Information on ${client.user.username}`)
    .setColor(0x374f6b)
    .setThumbnail(bicon)
    .addField("Bot Name", client.user.username, true)
    .addField("Bot Tag", client.user.tag, true)
    .addField("Last Update", `${moment.duration(client.uptime).format('d[d ]h[h ]m[m ]s[s]')} ago`, true)
    .addField("Date Of Creation", client.user.createdAt.toLocaleString(), true)
    .setFooter("Created By @Dawn.Bots.INC", "https://i.imgur.com/MAB3T3R.png")
    .setTimestamp();
    return message.channel.send(botembed);
  }      
	if (message.content.toLowerCase().startsWith(`${prefix}report`)) {
	
let args = message.content.slice(1).split(" ");
let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser) return message.channel.send("You haven't selected/mentioned a user who you want to report.");
  let reason = args.slice(1).join(" ") || "None";

  let reportEmbed = new Discord.RichEmbed()
  .setDescription("Reports")
  .setColor(0x374f6b)
  .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  .addField("Channel", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", reason)
  .setTimestamp();

  let reportschannel = message.guild.channels.find(c => c.name === 'admin-logs');
  if(!reportschannel) return message.channel.send("I can't find logging channel.");


  message.delete().catch(O_o=>{});
  reportschannel.send(reportEmbed);
return message.channel.send("✅ Report sucessfully submitted!")
}
});

client.on('guildMemberAdd', (member) => {
  let guild = member.guild;
  let server = member.guild.name;
  let role = member.guild.roles.find(r => r.name === "Awaiting Assignment");
member.addRole(role);
  let logging = guild.channels.find(c => c.name === 'welcome-leaves');
  let jembed = new Discord.RichEmbed()
      .setTitle("User Enterance")
      .setColor("#2B547E")
      .setDescription(`Welcome ${member}, to ${server}. You are either someone random or apart of the NYBC (National Youth Bike Council). Either way you are welcomed to stay in this channel until assigned a member or visitor role. To get one of these roles ping the header or the bot developer after reading <#503675095328227344>. Thank you and have a wonderful stay.`)
      .setTimestamp();
  logging.send(jembed);
	      });

client.on('guildMemberRemove', (member) => {
	
  let guild = member.guild;
  let server = member.guild.name;
  let logging = guild.channels.find(c => c.name === 'welcome-leaves');
  let rembed = new Discord.RichEmbed()
      .setTitle("User Departure")
      .setColor("#2B547E")
      .setDescription(`Not sure why ${member} left but, hopefully they will come back if they left on good terms.`)
      .setTimestamp();
  logging.send(rembed);
	      }); 
	
	client.on('messageDelete', async (message) => {
		  if (message.author.bot) return;
    let logging = message.guild.channels.find(c => c.name === 'admin-logs');
    const dembed = new Discord.RichEmbed()
        .setTitle("Message Deleted")
        .setColor("#2B547E")
        .setDescription(`A message sent by ${message.author} was deleted in ${message.channel}`)
        .addField("Message:", `${message.cleanContent}`)
        .setTimestamp();
    logging.send(dembed);
});

client.on("messageUpdate", function (oldMessage, newMessage, channel) {
    if (newMessage.channel.type == 'text' && newMessage.cleanContent != oldMessage.cleanContent) {
        let logging = newMessage.guild.channels.find(c => c.name === 'admin-logs');
        const eembed = new Discord.RichEmbed()
            .setTitle("Message Edited")
            .setColor("#2B547E")
            .setDescription(`A message sent by ${newMessage.author} was edited in ${newMessage.channel}`)
            .addField(`Old message:`, `${oldMessage.cleanContent}`)
            .addField(`New Message:`, `${newMessage.cleanContent}`)
            .setTimestamp();
        logging.send(eembed);
    }
});
	
	client.on("channelCreate", async (channel) => {
  let logging = channel.guild.channels.find(c => c.name === 'admin-logs');
  const cembed = new Discord.RichEmbed()
      .setTitle("Channel Created")
      .setColor("#2B547E")
      .setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just created!`)
      .setTimestamp();
  logging.send(cembed);
});

client.on("channelDelete", async (channel) => {
  let logging = channel.guild.channels.find(c => c.name === 'admin-logs');
  const cembed = new Discord.RichEmbed()
      .setTitle("Channel Remove")
      .setColor("#2B547E")
      .setDescription(`A **${channel.type} channel**, by the name of **${channel.name}**, was just deleted!`)
      .setTimestamp();
  logging.send(cembed);
});


client.login(process.env.BOT_TOKEN); 
