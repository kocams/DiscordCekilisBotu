const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
  if(message.author.bot) return;
  
  let prefix = config.prefix;
  
  if(!message.content.startsWith(prefix)) return;
  
  const m = await message.channel.send("Gecikme Süreleri")
  
  let pong = new Discord.MessageEmbed()
  .setTitle("🏓 Pong!")
  .setColor('RANDOM')
  .setTimestamp()
  .addField("Ping", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
  .addField("API Ping", `${Math.round(client.ws.ping)}ms`, true)
  .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

  m.edit(pong)
}

module.exports.help = {
  name: "ping"
}