if (process.version.slice(1).split('.')[0] < 8) throw new Error('Node 8.0.0 or higher is required. Update Node on your system.');

const Sentry = require('@sentry/node');
Sentry.init({ dsn: 'https://8370fbe78f8642ec8a22888d341ad3c2@sentry.io/1334486' });

const { Client, Collection } = require('discord.js');
const Discord = require('discord.js');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');

const client = new Discord.Client();

client.config = require('./config.js');

client.logger = require('./util/Logger'); // logger

require('./modules/functions.js')(client);

client.playlists = new Enmap();
client.commands = new Enmap();
client.aliases = new Enmap();
client.commands = new Collection();
client.aliases = new Collection();
client.invspam = new Enmap();
client.blacklist = new Enmap({name: 'blacklist', persistent: true});

// client.gblacklist = new Enmap({name: "gblacklist", persistent: true });
client.settings = new Enmap({name: 'settings'});

const init = async () => {

  const cmdFiles = await readdir('./commands/');
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith('.js')) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  const evtFiles = await readdir('./events/');
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split('.')[0];
    const event = require(`./events/${file}`);
    client.on(eventName, event.bind(null, client));
    const mod = require.cache[require.resolve(`./events/${file}`)];
    delete require.cache[require.resolve(`./events/${file}`)];
    for (let i = 0; i < mod.parent.children.length; i++) {
      if (mod.parent.children[i] === mod) {
        mod.parent.children.splice(i, 1);
        break;
      }
    }
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  client.login(client.config.token);

};


exports.statistics = function() {
  const memoryUsage = process.memoryUsage();
  let totalSeconds = (client.uptime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  console.log('ram.rss', (memoryUsage.rss / 1048576).toFixed());
  console.log('ram.heapUsed', (memoryUsage.heapUsed / 1048576).toFixed());
  console.log('total.guilds', client.guilds.size);
  console.log('total.users', client.users.size);
  console.log('current.vcs', client.voiceConnections.size);
  console.log(`current.uptime ${hours}h, ${minutes}m & ${seconds.toFixed()}s`);
};

init();
