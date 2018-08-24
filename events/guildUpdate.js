const Discord = require("discord.js");

module.exports = async (client, oldGuild, newGuild) => {

    const settings = client.getGuildSettings(oldGuild.guild);

    if (settings.guildUpdateBanAddRemove !== "true") return;

    const logs = oldGuild.channels.find(channel => channel.name === settings.logs_channel);
    if(!logs) return;

    const entry = await oldGuild.fetchAuditLogs({type: 'GUILD_UPDATE'}).then(audit => audit.entries.first())
    let userExec = entry.executor


    if(oldGuild.name !== newGuild.name && (oldGuild.region !== newGuild.region)) {

      var guildUpdated = new Discord.RichEmbed()
      .setColor('0xD353EF')
      .setAuthor(`Guild Updated`,`${newGuild.iconURL}`)
      .addField("Name",`**❯ Before:** ${oldGuild.name}\n**❯ After:** ${newGuild.name}`)
      .addField("Region",`**❯ Before:** ${oldGuild.region}\n**❯ After:** ${newGuild.region}`)
      .setFooter(`By ${userExec.username}#${userExec.discriminator}`, userExec.avatarURL)
      .setTimestamp()
      return logs.send(guildUpdated);

    } else  if(oldGuild.name !== newGuild.name) {

      var guildUpdated = new Discord.RichEmbed()
      .setColor('0xD353EF')
      .setAuthor(`Guild Updated`,`${newGuild.iconURL}`)
      .setTitle('Name')
      .setDescription(`**❯ Before:** ${oldGuild.name}\n**❯ After:** ${newGuild.name}`)
      .setFooter(`By ${userExec.username}#${userExec.discriminator}`, userExec.avatarURL)
      .setTimestamp()
      return logs.send(guildUpdated);

    } else if(oldGuild.icon !== newGuild.icon) {

      var guildUpdated = new Discord.RichEmbed()
      .setColor('0xD353EF')
      .setAuthor(`Guild Updated`,`${newGuild.iconURL}`)
      .setTitle('Icon')
      .setThumbnail(newGuild.iconURL)
      .setFooter(`By ${userExec.username}#${userExec.discriminator}`, userExec.avatarURL)
      .setTimestamp()
      return logs.send(guildUpdated);

    } else if(oldGuild.region !== newGuild.region) {

      var guildUpdated = new Discord.RichEmbed()
      .setColor('0xD353EF')
      .setAuthor(`Guild Updated`,`${newGuild.iconURL}`)
      .setTitle('Region')
      .setDescription(`**❯ Before:** ${oldGuild.region}\n**❯ After:** ${newGuild.region}`)
      .setFooter(`By ${userExec.username}#${userExec.discriminator}`, userExec.avatarURL)
      .setTimestamp()
      return logs.send(guildUpdated);

    } else {
      var guildUpdated = new Discord.RichEmbed()
      .setColor('0xD353EF')
      .setAuthor(`Guild Updated`,`${newGuild.iconURL}`)
      .setFooter(`By ${userExec.username}#${userExec.discriminator}`, userExec.avatarURL)
      .setTimestamp()
      return logs.send(guildUpdated);
    }


};