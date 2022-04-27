'use strict';
function between(min, max) {
  return Math.floor(
    Math.random() * (max-min) + min
  )
}
const mathClass = require("./randMathClass.js");
const randPlanes = require('./randplane.js');
global.maxKey = 0;
global.maxValue = 0;
global.secondMaxKey = 0;
global.secondMaxValue = 0;
global.thirdMaxKey = 0,
global.thirdMaxValue = 0;
const talkedRecently = new Set();
const { Client, MessageEmbed } = require('discord.js');
const config = require('./config');
const commands = require('./help');
const censorClass = require('./censor.js');
const updates = require('./updatelog');
const planes = require('./planefacts.js');
const fs = require('fs');
let rawData = fs.readFileSync('daily.json');
let newDict = JSON.parse(rawData);
var cooldownDict = newDict;
const censorDict = censorClass.cenDict;
const scc = require('./socialcred.json');
const rroles = ["935822911955169320","935822847253835896"];
const snipeClass = require('./snipe');
const moneyDictclass = require('./moneclass');
const shopDict = {
  "platinum": {
    "price": 100000,
    "id": "943572065619939348"
  },
  "goldrr": {
    "price": 100000,
    "id": "943572646862397501"
  },
  "fakenigel": {
    "price": 150000,
    "id": "911636966959894558"
  },
  "dnsweat": {
    "price": 1000000,
    "id": "943573005513150484"
  }
  
}
let bot = new Client({
  presence: {
    status: 'playing',
    activity: {
      name: `${config.prefix}help`,
      type: 'LISTENING'
    }
  }
});
bot.on('ready', () => console.log(`Logged in as ${bot.user.tag}.`));
function embed_template(title, desc, colour='GREEN', footer='') {
  let embed = new MessageEmbed()
    .setTitle(title)
    .setColour(colour)
    .setDescription(desc)
    .setFooter(footer);
  return embed;
};
bot.on("messageDelete", async message => {
  if (message.author.bot) {
    return;
  }
  let name = message.author.username;
  snipeClass.writeDict(`**${name}**: ${message.content}`,message.channel.id);
})
bot.on('message', async message => {
  if (message.author.bot) {return;}
  if(message.content.includes("+")||message.content.includes("*")||message.content.includes("-")||message.content.includes("/")||message.content.includes("%")) {
  try{message.channel.send(eval(message.content))}
  catch{let e = 0;}}
  if (message.channel.type == "dm") {return;}
  if (message.channel.type != "dm") {
    roles = message.guild.roles.cache.map((role) => role);
  }
  if (message.content.startsWith(config.prefix)) {
    let args = message.content.slice(config.prefix.length).split(' ');
    let command = args.shift().toLowerCase();
    censorDict.forEach(function (item, index) {
      if(message.includes(item)) {
        message.delete();
        message.channel.send(`<@!${message.author.id}> you have said a censored word so it has been deleted`);
        break;
      }
    });
    if (talkedRecently.has(message.author.id)) {
            message.channel.send(`Wait 2 seconds before using another command <@!${message.author.id}>`);
      try {message.member.user.send("Wait 2 seconds after each command");} catch {var e = 1;}
    } else {
    switch (command) {
      case 'eq':
      case 'equation':
        const newEq = mathClass.getEquation();
        message.channel.send("Solve this equation within 5 seconds for money!");
        message.channel.send(newEq);
        const filter = m => m.author.id ===  message.author.id;
        message.channel.awaitMessages(filter, {
          max: 1, // leave this the same
          time: 5000, // time in MS. there are 1000 MS in a second
             }).then(async(collected) => {
          console.log("Collected math");
              if(collected.first().content == eval(equation)) {
                let rndAmount = between(100,200);
                message.channel.send(`Well done, You are correct. have ${rndAmount} money.`);
                moneyDictclass.changeMoney(message.author.id,0);
                moneyDict[message.author.id] += rndAmount;
                moneyDictclass.writeMoney();
                  } else {message.channel.send("Incorrect noob");}
                  }
          ).catch(() => {
              // what to do if a user takes too long goes here 
          message.reply('You took too long L no money for you'); 
          });
        break;
      case 'addcensor':
        if(message.author.permissions.has('ADMINISTRATOR')) {
          objectToPush = args.join(' ');
          objectToPush2 = objectToPush.replace("%addcensor","");
          censorClass.cenDict.push(objectToPush2);
          censorClass.saveDict();
          message.channel.send("Successfully added censor word");
        } else {message.channel.send("You cant do this");}
      case 'gp':
      case 'guessplane':
        message.channel.send("Guess the plane to make money!");
        const randPlaneInt = between(1,66); 
        message.channel.send(`Here is a photo of the plane, Type your answer below! You have 20 seconds.`);
        message.channel.send(randPlanes[randPlaneInt]["image"]);
        const filter2 = m => m.author.id ===  message.author.id;
        message.channel.awaitMessages(filter2, {
          max: 1, // leave this the same
          time: 20000, // time in MS. there are 1000 MS in a second
             }).then(async(collected) => {
              if(collected.first().content == randPlanes[randPlaneInt]["plane"]) {
                let rndAmount = between(50,120);
                message.channel.send(`Well done, You are correct. have ${rndAmount} money.`);
                moneyDictclass.changeMoney(message.author.id,0);
                moneyDict[message.author.id] += rndAmount;
                moneyDictclass.writeMoney();
              } else {
                message.channel.awaitMessages(filter, {
                  max:1,
                  time: 10000, }).then(async(collected) => {
                  if(collected.first().content == randPlanes[randPlaneInt]["plane"]) {
                let rndAmount = between(50,120);
                message.channel.send(`Well done, You are correct. have ${rndAmount} money.`); 
                moneyDictclass.changeMoney(message.author.id,0);
                moneyDict[message.author.id] += rndAmount;
                moneyDictclass.writeMoney();                    
                  } else {message.channel.send("Incorrect nub");}
                  })
                }
              }
          ).catch(() => {
              // what to do if a user takes too long goes here 
          message.reply('You took too long L no money for you'); 
          });
        break;
      case 'math':
        
        break;
      case 'link':
        message.channel.send("Heres the link to invite me to your server: https://discord.com/api/oauth2/authorize?client_id=918439450491633705&permissions=8&scope=applications.commands%20bot");
        break;
      case 'resetbal':
        if(message.author.id == 602858465064386561) {
        let usrid7 = args[0].replace("<@!","");
        let usrid8 = usrid7.replace(">","");
        moneyDict[usrid8] = 0;
        moneyDictclass.writeMoney();
        message.channel.send("Reset. L for that person");}
        break;
      case 'setslowmode':
        message.channel.setRateLimitPerUser(args[0],"command");
        message.channel.send("Done.");
        break;
      case 'steal':
        if(moneyDict[message.author.id] > 250) {
        const msg11 = args[0].replace("<@!","");
        const msg2 = msg11.replace(">","");
        const robRandom = Math.random();
        if(msg2 == 602858465064386561 || msg2 == 396753014985195560) {
          message.channel.send("You cant rob me or jason, you have to pay us now lol");
          const amountToPay = Math.floor(moneyDict[message.author.id] / 10);
          moneyDict[message.author.id] -= amountToPay;
          moneyDict[msg2] += amountToPay;
          message.channel.send(`you payed ${amountToPay}`);
        } else {
          if(robRandom <= 0.12) {
            const amountRObbed = Math.floor(moneyDict[msg2] * Math.random()) 
            message.channel.send(`Robbing Worked! You gained ${amountRObbed}!`);
            moneyDict[msg2] -= amountRObbed;
            moneyDict[message.author.id] += amountRObbed;
          } else {
            const amountLost = Math.floor(moneyDict[message.author.id] / 10);
            message.channel.send(`robbing failed, you have to pay them ${amountLost}`);
            moneyDict[msg2] += amountLost;
            moneyDict[message.author.id] -= amountLost;
          }}} else {message.channel.send("you need 250 to rob someone");}
        break;
      case 'lottery':
        message.channel.send("A ticket costs 100, You have a 1/500 chance to get 25000 money.");
        moneyDictclass.changeMoney(message.author.id,0);
        if(moneyDict[message.author.id] >= 100) {
          message.channel.send("You have enough for a ticket, Rolling the lottery...");
          moneyDict[message.author.id] -= 100;
          const lotEmbed = new MessageEmbed()
            .setTitle(`Lottery!'`)
            .setColor("PURPLE")
            .setDescription("Rolling.");
          const lotEmbed2 = new MessageEmbed()
            .setTitle(`Lottery!'`)
            .setColor("PURPLE")
            .setDescription("Rolling..");
          const lotNumber = Math.random();
          message.channel.send({ embed: lotEmbed }).then((msg) => {
            setTimeout(function () {
                msg.edit(lotEmbed2);
            }, 1000)
            setTimeout(function () {
              if(lotNumber <= 0.002) {
                  const lotEmbed4 = new MessageEmbed()
                  .setTitle("You Won 25000!")
                  .setColor("GREEN")
                  .setDescription("Congrats, You just won 25000!");
                  moneyDict[message.author.id] += 25000;
                  msg.edit(lotEmbed4);
                } else {
                  const lotEmbed5 = new MessageEmbed()
                  .setTitle("You lost L")
                  .setColor("RED")
                  .setDescription("Better luck next time");
                  msg.edit(lotEmbed5);
                }                
            }, 1000)

        })
        } else {message.channel.send("You dont have enough for a lottery ticket.");}
        moneyDictclass.writeMoney();        
        break;
      case 'daily':
        if(cooldownDict[message.author.id] === undefined) {
          cooldownDict[message.author.id] = new Date().getDate();
          message.channel.send("Here are your daily 250 coins.");
          moneyDict[message.author.id] += 250;
          moneyDictclass.writeMoney();
        } else {
          if(cooldownDict[message.author.id] > new Date().getDate() || cooldownDict[message.author.id] && new Date().getDate() == 1) {
            cooldownDict[message.author.id] = new Date().getDate();
            message.channel.send("Here are your daily 250 coins.");
            moneyDict[message.author.id] += 250;
            moneyDictclass.writeMoney();
          } else {message.channel.send("Wait another day to get your daily bonus.");}
        }
        let newData = JSON.stringify(cooldownDict);
        fs.writeFileSync('daily.json',newData);
        break;
      case 'snipe':
        const currentString = snipeClass.fetchDict(message.channel.id);
        const embed = new MessageEmbed()
        .setTitle("Snipe")
        .setDescription(currentString)
        .setColor("BLUE")
        .setFooter(`Requested by ${message.author.username}`);
        try {
        if (typeof currentString == undefined || currentString == "undefined") {message.channel.send("There is nothing to snipe!");} else {
        message.channel.send(embed);}} catch{"There is nothing to snipe!";}
        break;
      case 'remindme':
        let timeout = parseInt(args[0]);
        let msg1 = args.join(" ");
        let msg = msg1.replace(timeout,"");
        console.log("recieved");
        message.channel.send(`Will remind you in ${timeout} seconds.`)
        await new Promise(r => setTimeout(r, timeout*1000));
        if (message.channel.type == 'dm') {
          message.channel.send(`Your reminder set ${timeout} seconds ago: ${msg}`);
        } 
        if (message.channel.type != 'dm') {
          const user = message.guild.members.cache.get(message.author.id);
          user.user.send(`Your reminder set ${timeout} seconds ago: ${msg}`);
        }
        break;
      case 'repeatmsg':
        let newI = args[0];
        let msgcontent = args.join(" ");
        let msgcontent2 = msgcontent.replace(newI,"");
        console.log(msgcontent2);
        console.log(newI);
        for (let i = 0; i < Number(newI); i++) {
          await new Promise(r => setTimeout(r, 1000));
          message.channel.send(msgcontent2);
          console.log(i);
        }
        break;
      case 'unban':
        try {message.guild.members.unban(args[0])}
        catch{message.channel.send("cant do that")}
      case 'modmailtest':
        const hannel = bot.channels.cache.get("826482726584451102");
        const newembed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Mod Mail")
        .setDescription(args.join(' '))
        hannel.send(newembed);
        break;
      case 'addrole':
        if (message.member.permissions.has("ADMINISTRATOR")) {
          if (args[1]) {
            const us2I = args[0].replace("<@!",'');
            const us2ID = us2I.replace(">","");
            const uSER = message.guild.members.cache.get(us2ID);
            uSER.roles.add(args[1])
          } else {message.member.roles.add(args[0]);}
          message.channel.send("Role succesfully added")
        } else {
          message.channel.send("you do not have permission to do this")
        }
        break;
      case 'delrole':
        if (message.member.permissions.has("ADMINISTRATOR")) {
          if (args[1]) {
            const us2I = args[0].replace("<@!",'');
            const us2ID = us2I.replace(">","");
            const uSER = message.guild.members.cache.get(us2ID);
            uSER.roles.remove(args[1])
          } else {message.member.roles.remove(args[0]);}
          message.channel.send("Role succesfully removed")
        } else {
          message.channel.send("you do not have permission to do this")
        }
        break;
      case 'dmme':
        try {message.member.user.send(args.join(' '));} catch {message.channel.send("You have dms turned off")}
        break;
      case 'setnick':
        const newusrID5 = args[0].replace("<@!","");
        const newusrID6 = newusrID5.replace(">","");
        const currentUSER = message.guild.members.cache.get(newusrID6);
        currentNICKNAME = args.join(" ");
        newNickname = currentNICKNAME.replace(args[0],"");
        if (message.member.roles.highest.position > currentUSER.roles.highest.position) {
          currentUSER.setNickname(newNickname);
          message.reply("Set!");
        } else {message.channel.send("You dont have a high enough role to do this")}
        break;
      case 'nick':
        message.member.setNickname(args.join(" "));
        message.reply("set");
        break;
      case 'dm':
        try{
        const usI = args[0].replace("<@!",'');
        const usID = usI.replace(">","");
        const user = message.guild.members.cache.get(usID);
        user.user.send(args.join(' '));
        message.channel.send("Sent successfully")} 
        catch{message.channel.send("They have dms turned off")}
        break;
      case 'bal':
        const usr = message.author.id;
        moneyDictclass.changeMoney(usr,0);
        if(moneyDict[usr] === NaN || moneyDict[usr] === undefined) {
          moneyDict[usr] = 0;
        }
        if (args.length > 0) {
          const msgusrid = args[0].replace("<@!","");
          const curmsgid = msgusrid.replace(">","");
        if(moneyDict[curmsgid] === NaN || moneyDict[curmsgid] === undefined) {
          moneyDict[usr] = 0;
        }
    moneyDictclass.changeMoney(curmsgid,0);
          if(typeof moneyDict[curmsgid] == "string") {
          moneyDict[usr] = 0;
        }
          try{
            await message.channel.send(moneyDict[curmsgid]);
          } catch {
            moneyDict[curmsgid] = 0;
           await message.channel.send(moneyDict[curmsgid]);
           }
        } else {
        try {
          await message.channel.send(moneyDict[usr])
        } catch {
          moneyDict[usr] = 0;
          await message.channel.send(moneyDict[usr])
        }
        moneyDictclass.writeMoney();}
        break;
      case 'beg':
        const begAmount = Math.random();
        moneyDictclass.changeMoney(message.author.id, 0);
        if (begAmount > 0.4) {
          const amount = Math.round(Math.random() * 15);
          moneyDict[message.author.id] += amount;
          message.channel.send(`looks like begging worked, you got ${amount}`)
        } else {message.channel.send("No one gave your poor ass money, get a job smh")}
        moneyDictclass.writeMoney();
        break;
      case 'buyrole':
        if(args.length > 0) {
          if(args[0] == "platinum" || args[0] == "goldrr" || args[0] == "dnsweat" || args[0] == "fakenigel") {
            message.channel.send(`You need ${shopDict[args[0]]["price"]} to buy this role.`)
            if(moneyDict[message.author.id] >= shopDict[args[0]]["price"]) {
              moneyDict[message.author.id] -= shopDict[args[0]]["price"];
              message.member.roles.add(shopDict[args[0]]["id"]);
              message.channel.send("Enjoy the role!");
            } else {
              message.channel.send("You dont have enough to buy this role.");
            }
          } else {message.channel.send("This role does not exist.");}
        } else {
          message.channel.send("You can buy these roles: platinum, goldrr, dnsweat, fakenigel");
        }
      break;
      case 'addmoney':
        if (message.author.id == 602858465064386561 || message.author.id == 396753014985195560){
          let newusr = args[0]
          let money = parseInt(args[1])
          let usr1 = newusr.replace("<@!","")
          let usrID = usr1.replace(">","")
          if(money == "Infinity") {message.channel.send("YOu cant get infinite money bruh");} else {
          moneyDict[usrID] += money
          await message.channel.send(`Money added to ${usrID} in the amount of ${money}`)
          }} else {
          await message.channel.send(" you cant do this sus ")
        }
        moneyDictclass.writeMoney();
        break;
      case 'uwu':
        message.reply("UwU");
      case 'pay':
        moneyDictclass.changeMoney(message.author.id,0);
        let newusrpay = args[0]
        let moneypay = parseInt(args[1])
        let usr1pay = newusrpay.replace("<@!","")
        let usrIDpay = usr1pay.replace(">","")
        if (message.content.includes('-') == false) {
          if (moneyDict[message.author.id] >= moneypay) {
            moneyDict[usrIDpay] += + moneypay;              
            moneyDict[message.author.id] -= moneypay
            message.channel.send(`Successfully paid ${moneypay} to <@!${usrIDpay}>`)
          } else {
            message.channel.send("Youre too poor go beg for some money dumb child")
          }
        } else {message.channel.send("You cant pay negative money bruh")}
        moneyDictclass.writeMoney();
        break;
      case 'updatelog':
      case 'update':
        let requiredUpdate = args
        let planeUpdate = updates[requiredUpdate]
        try {
          let embed =  new MessageEmbed()
          .setTitle('Update Log')
          .setColor('PURPLE')
          .setDescription(planeUpdate)
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL());
          let msg = await message.channel.send(embed)
        } catch {
          let msg = await message.channel.send("Something went wrong trying to get the update.")
        };
        break;
      case 'plane':
        let theplane = args.join(' ')
        let gottenUpdate = planes[theplane]
        try{
          await message.channel.send(gottenUpdate)}
        catch{
          await message.channel.send("that plane isnt in our library")}
        break;
      case 'sexy':
      case 'hiton':
      case 'date':
        if (args.length == 0) {
          let ts = Date.now();
          let date_ob = new Date(ts);
          let date = date_ob.getDate();
          let month = date_ob.getMonth() + 1;
          let year = date_ob.getFullYear();
          let hours = date_ob.getHours();
          let minutes = date_ob.getMinutes();
          let seconds = date_ob.getSeconds();
          try {let embed =  new MessageEmbed()
            .setTitle('Current Date (UTC)')
            .setColor('BLACK')
            .setDescription(`The date is: ${(year + "-" + month + "-" + date)}. Current time is: ${hours + ':'+ minutes + ':' + seconds}`)
            .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL());
            let msg = await message.channel.send(embed)}
          catch {message.channel.send("Something went wrong")}
          break
        }
        if (args.length > 0) {
          if (message.content.includes('<@!')) {
            let user = args[0];
            let newMessage = await message.channel.send(`${user}, <@!${message.author.id}> wants to date you, react with :heart: if you want to date them!`)
            newMessage.react('❤️');
            userId = user.replace('<@!','')
            userId2 = userId.replace('>','')
            let filter = (reaction,user) => 
            reaction.emoji.name === '❤️' && user.id == userId2
            newMessage.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
              .then(collected => {
                const reaction = collected.first();
                if (reaction.emoji.name == '❤️') {
                  message.reply(`${user} Accepted your date request! get a room or something smh`)
                  if (message.guild.id == 823238500274536478) {
                    const user = message.guild.members.cache.get(userId2);
                    const role = message.guild.roles.cache.get('933050689406529547');
                    message.author.roles.add(role);
                    member.user.roles.add(role);
                    }
                }
              })
              .catch(collected => {
                message.reply("times up")
              })} else {
                message.reply("You have to mention someone dumbass")
              }
          
          break;
        }
      case 'deez':
      try{let msg = await message.channel.send('Deez Nutz lol');} catch{await message.channel.send('broke')}
        break
      case 'embedtest':
        await message.channel.send(embed_template("hello", "test", "GREEN", "e"))
      case 'ping':
        msg = await message.channel.send('Pinging...');
        await msg.edit(`PONG! Message took ${Date.now() - msg.createdTimestamp}ms.`)
        break;
      case 'repeat':
        try{
          if (message.content.length < 40) {
            await message.channel.send(args.join(' '));
          } 
          if (message.content.length > 40) {
            await message.channel.send("Message to long");
          }
          if (args.length == 0) {
            await message.channel.send("you need to add a message bruh")
          }
        } catch {await message.channel.send("Something went wrong")}
        break;
      case 'wj':
      case 'worshipjason':
        if(Math.random() >= 0.90) {
          message.channel.send("Jason has deemed you onworthy and has reset your streak. You get 0.");
          moneyDictclass.worshipDict[message.author.id] =0;
        } else {
        moneyDictclass.changeShip(message.author.id,0);
        moneyDictclass.worshipDict[message.author.id] += 1;
        moneyDict[message.author.id] += moneyDictclass.worshipDict[message.author.id];
        message.channel.send(`You get ${moneyDictclass.worshipDict[message.author.id]} money for worshipping jason ${moneyDictclass.worshipDict[message.author.id]} times.`);
        moneyDictclass.writeMoney();}
        break;
      case 'rr':
        message.channel.send("Playing russian roulette, 1/6 chance you get kicked, 5/6 chance you get a special role");
        const rrandom = (Math.random())
        console.log(rrandom)
        if (rrandom < 0.85) {
          message.channel.send("GG you won, enjoy the role and money")
          const chosenrole = Math.random();
          try {
            moneyDictclass.changeMoney(message.author.id, 0);
            moneyDict[message.author.id] = moneyDict[message.author.id] + 500;
          } catch {message.channel.send("Could not add money, try registering")}
          if (chosenrole > 0.95) {
            message.member.roles.add(rroles[0]);
          } else {
            message.member.roles.add(rroles[1])
          }
        }
        if (rrandom > 0.8499999999999999) {
          if (message.author.id == 602858465064386561) {
            message.channel.send("im not kicking myself again")
          } else {
          message.channel.send("L you get kicked")
          message.member.user.send("You got kicked cause you failed russian roulette lol, heres an invite back. Cant guarantee your roles though.... https://discord.gg/R4GaHBnx6j")
          try {
          const userToBan = message.guild.members.cache.get(message.author.id);
          userToBan.kick();
          message.channel.send("he got kicked");
          }
          catch {message.channel.send("I do not have permissions")}}}
        moneyDictclass.writeMoney()
        break;
      case 'richest':
        maxValue = 0;
        maxKey = 0;
        secondMaxValue = 0;
        secondMaxKey = 0;
        thirdMaxValue = 0;
        thirdMaxKey = 0;        
        for(let i = 0; i < 3; i++) {
        for(const [key, value] of Object.entries(moneyDict)) {
          if(value > maxValue) {
            maxValue = value;
            maxKey = key;
          }
          if(value < maxValue && value > secondMaxValue) {
            secondMaxValue = value;
            secondMaxKey = key;
          }
          if(value < secondMaxValue && value > thirdMaxValue) {
            thirdMaxValue = value;
            thirdMaxKey = key;
          }
        }}
        const richEmbed = new MessageEmbed()
        .setTitle("Richest People")
        .setColor("GREEN")
        .addField(`1st: <@${maxKey}>`,`With ${maxValue}.`)
        .addField(`2nd: <@${secondMaxKey}>`,`With ${secondMaxValue}`)
        .addField(`3rd: <@${thirdMaxKey}>`,`With ${thirdMaxValue}.`);
        message.channel.send(richEmbed);
        break;
      case 'sudorr':
      if (message.author.id == 602858465064386561 || message.author.id == 396753014985195560) {
        const newARG = args[0]
        const uSr1pay = newARG.replace("<@!","");
        const uSrIDpay = uSr1pay.replace(">","");
        const newUSER = message.guild.members.cache.get(uSrIDpay);
        if (uSrIDpay == 602858465064386561) {
          message.channel.send("you cant sudorr me bitch");
        } else {
        newUSER.kick();
        newUSER.user.send("You got kicked cause you failed russian roulette lol, heres an invite back. Cant guarantee your roles though.... https://discord.gg/R4GaHBnx6j");
        message.channel.send("rred him")}
        break;
      }
      break;
      case 'banme':
      case 'kill':
        message.reply('Banning you. . .');
        try {
        await message.member.ban();
        let embed =  new MessageEmbed()
          .setTitle('Ban Success')
          .setColor('GREEN')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}. Brought to you by i am the curE`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL());
        await message.channel.send(embed);
        } catch {
          let embed = new MessageEmbed()
          .setTitle('Ban Fail!')
          .setColor('RED')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}. Brought to you by eye am the curE.`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL())
          .setDescription('We were unable to ban you.');
        await message.channel.send(embed);
        };
        break
      //check if the command name is kickme or kick then run the code under kick
      case 'kickme':
      case 'kickmee':
        message.reply('Kicking you. . .');
        try {
        await message.member.kick();
        let embed =  new MessageEmbed()
          .setTitle('Kick Success')
          .setColor('GREEN')
          .setDescription('Successfully kicked.')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}. Brought to you by i am the curE`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL());
        await message.channel.send(embed);
        } catch {
          let embed = new MessageEmbed()
          .setTitle('Kick Fail!')
          .setColor('RED')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}. Brought to you by i am the curE`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL())
          .setDescription('We were unable to kick you.');
        await message.channel.send(embed);
        };
        break

      case 'help':
        var helpembed =  new MessageEmbed()
          .setTitle('Help Menu')
          .setColor('GREEN')
          .setFooter(`Requested by: ${message.member ? message.member.displayName : message.author.username}`, message.author.displayAvatarURL())
          .setThumbnail(bot.user.displayAvatarURL());
        if (!args[0])
          helpembed.setDescription(Object.keys(commands).map(command => `\`${command.padEnd(Object.keys(commands).reduce((a, b) => b.length > a.length ? b : a, '').length)}\` :: ${commands[command].description}`).join('\n'));
        else {
          if (Object.keys(commands).includes(args[0].toLowerCase()) || Object.keys(commands).map(c => commands[c].aliases || []).flat().includes(args[0].toLowerCase())) {
            let command = Object.keys(commands).includes(args[0].toLowerCase())? args[0].toLowerCase() : Object.keys(commands).find(c => commands[c].aliases && commands[c].aliases.includes(args[0].toLowerCase()));
            helpembed.setTitle(`Command - ${command}`)

            if (commands[command].aliases)
              helpembed.addField('Command aliases', `\`${commands[command].aliases.join('`, `')}\``);
              helpembed.addField('Description', commands[command].description)
              helpembed.addField('Format', `\`\`\`${config.prefix}${commands[command].format}\`\`\``);
          } else {
            helpembed.setColor('RED')
            helpembed.setDescription('This command does not exist. Please use the help command without specifying any commands to list them all.');
          }
        }
        message.channel.send(helpembed);
        break;
    }
  }         if(message.author.id != 602858465064386561) {talkedRecently.add(message.author.id);
        setTimeout(() => {
          talkedRecently.delete(message.author.id);
        }, 2000);
    }}
  });
require('./server')
bot.login(config.token);