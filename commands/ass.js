const { get } = require('snekfetch');

exports.run = async function(client, message, args) {
  if (!message.channel.nsfw) return message.channel.send('🔞 Cannot display NSFW content in a SFW channel.');
  const msg = await message.channel.send(`<a:typing:492332824091688960> **${message.member.displayName}** is looking at butts...`);
  const { body } = await get('https://nekobot.xyz/api/image?type=ass');
  await msg.edit({
    embed: {
      'title': 'Click here if the image failed to load.',
      'url': body.message,
      'color': 6192321,
      'image': {
        'url': body.message
      },
      'footer': {
        'icon_url': message.author.displayAvatarURL,
        'text': `Requested by ${message.author.tag}`
      }
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['butts', 'rear'],
  permLevel: 'User',
};

exports.help = {
  name: 'ass',
  category: 'NSFW',
  description: 'Ass man. Just ass.',
  usage: 'ass'
};
