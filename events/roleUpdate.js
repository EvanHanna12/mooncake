const Discord = require('discord.js');

module.exports = async (client, oldRole, newRole) => {

  const settings = client.getGuildSettings(newRole.guild);

  const logs = newRole.guild.channels.find(channel => channel.name === settings.logs_channel);
  if (!logs) return;

  if (oldRole.name === newRole.name) return;

  const entry = await oldRole.guild.fetchAuditLogs({type: 'ROLE_UPDATE'}).then(audit => audit.entries.first());
  const user = entry.executor;

  var roleUpdated = new Discord.RichEmbed()
    .setAuthor(`${newRole.guild.name}`, newRole.guild.iconURL)
    .setColor(newRole.color)
    .setTitle('Role Updated')
    .setDescription(`❯ **Old Name:** ${oldRole.name}\n❯ **New Name:** ${newRole.name}\n❯ **ID:** ${newRole.id}`)
    .setFooter(`By ${user.username}#${user.discriminator}`, user.avatarURL)
    .setTimestamp();

  if (settings.log_everything === 'true') {
    return logs.send(roleUpdated);
  } else if (settings.roleCreateDeleteUpdate === 'true') {
    return logs.send(roleUpdated);
  } else {
    return;
  }
};
