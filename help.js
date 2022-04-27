module.exports = {
  'update': {
    aliases: ['updatelog'],
    description: 'Gives you the update log of that version',
    format: 'update [update-version]'
  },
  'remindme': {
    description: 'remind you of something in a certain amount of time (In Seconds)',
    format: 'remindme <seconds> <Message>',
  },
  'buyadmin': {
    description: 'if you have 10mil you can buy admin lol',
    format: 'buyadmin',
  },
  'plane': {
    description: 'get an image of the plane',
    format: 'plane <name>',
  },
  'link': {
    description: 'get link to inv bot to your server',
    format: 'link',
  },
  'date': {
    aliases: ['sexy','hiton'],
    description: 'Date someone and get access to #dating-channel !',
    format: 'date @person',

  },
  'nuke': {
    description: 'destroys someones pc with pings',
    format: 'nuke @person',
  },
  'date': {
    description: 'Gives you the exact date in UTC+0',
    format: 'date',
  },
  'deez': {
    description: 'Makes you get deez nutsed',
    format: 'deez'
  },
  'help': {
    description: 'Shows the list of commands or help on specified command.',
    format: 'help [command-name]'
  },
  'ping': {
    description: 'Checks connectivity with discord\'s servers.',
    format: 'ping'
  },
  'repeat': {
    description: 'Repeats whatever is said.',
    format: 'say <message>'
  },
  'banme': {
    aliases: ['kill'],
    description: 'bans you',
    format: 'bamne'
  },
  'kickme': {
    aliases: ['kickmee'],
    description: 'kicks you',
    format: 'kickme'
  },
  'killbread': {
    description: 'kill someones dms',
    format: 'killbread @user <message>'  
  },
  'addrole': {
    description: 'add a role to someone (Needs administrator)',
    format: 'addrole @user <roleid>'
  },
  'dmme': {
    description: 'dms you a message',
    format: 'dmme <message>'
  },
  'dm': {
    description: 'dm someone a message',
    format: 'dm @user <message>'
  },
  'bal': {
    description: 'shows your balance (if you have never used the bot before, must use this to register a balance)',
    format: 'bal'
  },
  'addmoney': {
    description: 'add money to account',
    format: 'addmoney @user amount'
  },
  'pay': {
    description: 'pay someone money',
    format: 'pay @user amount'
  },
  'worshipjason': {
    description: 'worship jason and get money',
    format: 'worshipjason'
  },
  'buyrole': {
    description: 'buy a role from the list (do buyrole by itself to see the list)',
    format: 'buyrole <role> OR buyrole (for a list of roles)'
  },
  
  'roulette': {
    description: '1/5 chance to kick yourself, 4/5 to get a special role. If you win, 1/20 chance to get a very special role',
    format: 'rr'
  },
  'nick': {
    description: 'set your own nickname',
    format: 'nick <name>',
  },
  'setnick': {
    description: 'change someone elses nickname',
    format: 'nick <user> <name>',
  },
  'killbread': {
    description: 'nuke someone heavily',
    format: 'killbread <user>',
  },
  'repeatmsg': {
    description: 'repeat a message a certain amount of times',
    format: 'remeatmsg <amount of times> <message>',
  },
  'repeatinf': {
    description: 'repeat a message until stoppe by someone',
    format: 'repeatinf <message>',
  },
  'stoprepeat': {
    description: 'stop a message being inf repeated',
    format: 'stoprepeat',
  },
  'snipe': {
    description: 'gets a deleted message in that channel (if there is one)',
    format: 'snipe',
  },
  'setslowmode': {
    description: 'sets slowmode',
    format: 'setslowmode <seconds>'
  },
  'lottery': {
    description: '100 per ticket, 1/500 chance to get 25000 money',
    format: 'lotter'
  }
}