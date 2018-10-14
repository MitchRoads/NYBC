const Discord = require('discord.js');
const superagent = require("snekfetch");
const client = new Discord.Client();
const config = require('./botconfig.json');
const { prefix, token } = require('./botconfig.json');

  client.on("ready", async () => {
  console.log(`${client.user.username} has rode into the online!`);
  client.user.setActivity("National Bike Warfare", {type: "WATCHING"});
});

client.on("message", async message => {
const profanities = require(`profanities`)

for (x = 0; x < profanities.length; x++) {
 if (message.content.toUpperCase() == profanities[x].toUpperCase()) {
  message.channel.send(`You aren't allowed to say that word, please don't use it again. 😤`)
  message.delete();
  return;
 }
}

 if (message.content.startsWith(`${prefix}avatar`)) { 
	   let user = message.mentions.users.first(); 
if(!user) return message.channel.send("You haven't selected/mentioned a user whose avatar you want to see."); 
    let avatarEmbed = new Discord.RichEmbed()
    .setAuthor(`${user.username}'s Profile Picture`)
    .setImage(user.displayAvatarURL)
    .setColor("#2B547E")
    .setTimestamp(new Date());
    message.channel.send(avatarEmbed);
}

 if (message.content.startsWith(`${prefix}purge`)) {
	 let args = message.content.slice(1).split(" ");
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You aren't allowed to use this command.")
  if(!args[0]) return message.send("You need to set a number of messages to purge/delete.");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared about ${args[0]} messages!`).then(msg => msg.delete(5000));
});
}
});

client.on('guildMemberAdd', (member) => {
	
  let guild = member.guild;
  let server = member.guild.name;
member.addRole(`500510515680903188`);
  let logging = guild.channels.find(c => c.name === 'welcome-leaves');
  let gembed = new Discord.RichEmbed()
      .setTitle("User Enterance")
      .setColor("#2B547E")
      .setDescription(`Welcome ${member}, to ${server}. You are either someone random or apart of the NYBC (National Youth Bike Council). Either way you are welcomed to stay in this channel until assigned a member or visitor role. To get one of these roles ping the preident or the bot developer.`)
      .setTimestamp();
  logging.send(gembed);
	      });

client.on('guildMemberRemove', (member) => {
	
  let guild = member.guild;
  let server = member.guild.name;
  let logging = guild.channels.find(c => c.name === 'welcome-leaves');
  let gembed = new Discord.RichEmbed()
      .setTitle("User Departure")
      .setColor("#2B547E")
      .setDescription(`Not sure why {member} left but, hopefully they will come back if they left on good terms.`)
      .setTimestamp();
  logging.send(gembed);
	      });


client.on('message', async (message) => {
	
	if (message.content.startsWith(`${prefix}userinfo`)) {

 let member = message.mentions.users.first() || message.author
            let player = message.mentions.members.first() || message.member
            let user = message.mentions.users.first();
            let iicon = player.user.displayAvatarURL;
            let roles = message.mentions.members.first().roles.map(role => role).join(" ");
        if(!user) return message.channel.send("You haven't selected/mentioned a user whose info you want to see.");
            let userEmbed = new Discord.RichEmbed()
            .setAuthor(`${user.username}'s Info`, user.displayAvatarURL)
            .setThumbnail(user.displayAvatarURL)
            .setColor('#2B547E')
            .addField('User ID', user.id, true)
            .addField('Current Tag', user.tag, true)
            .addField('Server Nickname', `${player.displayName}`, true) 
            .addField('Highest Member Role', `${player.highestRole.name}`, true)
            .addField('Roles', `${roles}`)
            .addField('Game/Playing', `${(user.presence.game && user.presence.game && user.presence.game.name) || 'None'}`, true)
            .addField('Status', user.presence.status, true)
            .addField('Bot', user.bot, true)
            .addField('Joined At:', `${player.joinedAt}`)
            .addField('Account Created On:', `${player.user.createdAt}`)
            .setThumbnail(iicon)
            .setTimestamp();
            message.channel.send(userEmbed)
	}

	if (message.content.startsWith(`${prefix}info`)) {

    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor("#2B547E")
    .setThumbnail(bicon)
    .addField("Bot Name", client.user.username)
    .addField("Bot Tag", client.user.tag)
    .addField("Date Of Creation", client.user.createdAt.toLocaleString())
    .addField("Guilds", client.guilds.size)
    .addField("Users", client.users.size)
    .setTimestamp();
    return message.channel.send(botembed);
  }

	
	if (message.content.startsWith(`${prefix}serverinfo`)) {
		
    let sicon = message.guild.iconURL;
    let server = message.guild.name;
    let serverembed = new Discord.RichEmbed()
    .setTitle("Server Information")
    .setDescription(`Infomration on ${server}:`)
    .setThumbnail() 
    .setColor("#2B547E")
    .addField('Guild ID', message.guild.id, true)
    .addField('Guild Name', message.guild.name, true)
    .addField('Guild Channel Total', message.guild.channels.size, true)
    .addField('Guild Member Total', message.guild.memberCount, true)
    .addField('Guild Role Total', message.guild.roles.size, true)
    .addField('Guild Region', message.guild.region, true)
    .addField('Date Of Server Creation', message.guild.createdAt.toLocaleDateString(), true)
    .addField('Guild Owner', message.guild.owner, true)
    .setThumbnail(sicon) 
    .setTimestamp();
    message.channel.send(serverembed);
  }
});

client.login(process.env.BOT_TOKEN); 
