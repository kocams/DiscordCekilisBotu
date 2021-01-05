const ms = require('ms');

exports.run = async (client, message, args) => {

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: You need to have the manage messages permissions to start giveaways.');
    }

    // Giveaway channel
    let giveawayChannel = message.mentions.channels.first();
    // If no channel is mentionned
    if(!giveawayChannel){
        return message.channel.send(':x: Geçerli bir kanal adı girmelisin!');
    }

    // Giveaway duration
    let giveawayDuration = args[1];
    // If the duration isn't valid
    if(!giveawayDuration || isNaN(ms(giveawayDuration))){
        return message.channel.send(':x: Çekiliş süresini belirtmelisin!');
    }

    // Number of winners
    let giveawayNumberWinners = args[2];
    // If the specified number of winners is not a number
    if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)){
        return message.channel.send(':x: Kazanan sayısını belirtmelisin!');
    }

    // Giveaway prize
    let giveawayPrize = args.slice(3).join(' ');
    // If no prize is specified
    if(!giveawayPrize){
        return message.channel.send(':x: Hediyeyi belirtmelisin!');
    }

    // Start the giveaway
    client.giveawaysManager.start(giveawayChannel, {
        // The giveaway duration
        time: ms(giveawayDuration),
        // The giveaway prize
        prize: giveawayPrize,
        // The giveaway winner count
        winnerCount: giveawayNumberWinners,
        // Who hosts this giveaway
        hostedBy: client.config.hostedBy ? message.author : null,
        // Messages
        messages: {
            giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **ÇEKİLİŞ** 🎉🎉",
            giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **ÇEKİLİŞ SONUCU** 🎉🎉",
            timeRemaining: "Kalan Süre: **{duration}**!",
            inviteToParticipate: "Çekilişe katılmak için aşağıdaki emojiye (🎉) basın!",
            winMessage: "Tebrikler, {winners}! **{prize}** çekilişini kazandınız!",
            embedFooter: "çekiliş",
            noWinner: "Çekiliş iptal edildi.",
            hostedBy: "Çekilişi Düzenleyen: {user}",
            winners: "talihli",
            endedAt: "bitiş: ",
            units: {
                seconds: "saniye",
                minutes: "dakika",
                hours: "saat",
                days: "gün",
                pluralS: false // Not needed, because units end with a S so it will automatically removed if the unit value is lower than 2
            }
        }
    });

    message.channel.send(`${giveawayChannel} kanalında çekiliş başladı!`);

};