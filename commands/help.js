const Discord = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    if (message.author.bot) return;
    let prefix = config.prefix;
    if(!message.content.startsWith(prefix)) return;

    let help = new Discord.MessageEmbed()
      .setAuthor("Çekiliş Botu")
      .setTitle("Komut Listesi & Bot Kullanım Rehberi")
      .setDescription("Aşağıda bulunan komutlar yardımıyla botu kullanabilirsiniz.")
      .addField("🎁 Çekiliş 🎁","start [kanal-adı] [süre] [kazanan-sayısı] [ödül]\nreroll [ödül]\nend [ödül]")
      .addField("Örnek Kullanımlar:", "x!start #sohbet 25m 1 Test\nx!end Test\nx!reroll Test")
      .addField("Diğer:", "ping", true)
      .addField("Destek Olun!", "[Geliştiricinin Web Sitesi](https://muhendisherif.com/)")
      .setTimestamp()
      .setFooter(`${message.author.tag} tarafından komut isteği`, client.user.displayAvatarURL());
    message.channel.send("**Komutlar Mesaj Olarak Gönderildi! 💌, DM Kutunu Kontrol Et!\nCreated by www.muhendisherif.com**");

    return message.author.send(help);
}

module.exports.help = {
  name: "help"
}
