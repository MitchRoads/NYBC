const Discord = require('discord.js');
const superagent = require("snekfetch");
const client = new Discord.Client();
const config = require('./botconfig.json');
const { prefix, token } = require('./botconfig.json');

  client.on("ready", async () => {
  console.log(`${client.user.username} has rode into the online!`);
  client.user.setActivity("National Bike Warfare");
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
    .setColor("#ea9b67")
    .setTimestamp(new Date());
    message.channel.send(avatarEmbed);
}

 if (message.content.startsWith(`${prefix}purge`)) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You aren't allowed to use this command.")
  if(!args[0]) return message.send("You need to set a number of messages to purge/delete.");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared about ${args[0]} messages!`).then(msg => msg.delete(5000));
}
}
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
            .setColor('#c2c5ea')
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
            .setTimestamp(new Date());
            message.channel.send(userEmbed)
	}

	if (message.content.startsWith(`${prefix}info`)) {

    let bicon = client.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor("#dcc2ea")
    .setThumbnail(bicon)
    .addField("Bot Name", client.user.username)
    .addField("Bot Tag", client.user.tag)
    .addField("Date Of Creation", client.user.createdAt.toLocaleString())
    .addField("Guilds", client.guilds.size)
    .addField("Users", client.users.size)
    .setTimestamp(new Date());
    return message.channel.send(botembed);
  }

	
	if (message.content.startsWith(`${prefix}serverinfo`)) {
		
    let sicon = message.guild.iconURL;
    let server = message.guild.name;
    let serverembed = new Discord.RichEmbed()
    .setTitle("Server Information")
    .setDescription(`Infomration on ${server}:`)
    .setThumbnail() 
    .setColor("#c2dbea")
    .addField('Guild ID', message.guild.id, true)
    .addField('Guild Name', message.guild.name, true)
    .addField('Guild Channel Total', message.guild.channels.size, true)
    .addField('Guild Member Total', message.guild.memberCount, true)
    .addField('Guild Role Total', message.guild.roles.size, true)
    .addField('Guild Region', message.guild.region, true)
    .addField('Date Of Server Creation', message.guild.createdAt.toLocaleDateString(), true)
    .addField('Guild Owner', message.guild.owner, true)
    .setThumbnail(sicon) 
    .setTimestamp(new Date());
    message.channel.send(serverembed);
  }
});

client.login(process.env.BOT_TOKEN); 
