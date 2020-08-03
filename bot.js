var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const { Console } = require('winston/lib/winston/transports');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
console.log("running");
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});

bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', function (user, userID, channelID, message, evt) {
    var serverID = bot.channels[channelID].guild_id;
    var roles = bot.servers[serverID].roles;
    var keys = Object.keys(roles);
    var values = Object.values(roles);
    var entries = Object.entries(roles);
    logger.info(user, userID, channelID, evt)
    console.log("User: ", user);
    console.log("UserID: ", userID);
    console.log("channelID: ", channelID);
    console.log("message: ", message);
    console.log("server id: ", serverID);
    console.log("=======================================================================================================")
    if (message[0] == "!") {
        var args = message.substring(1, message.length).split(" ")
        var cmd = args[0];
        var input1 = args[1];
        console.log(message);
        console.log("cmd: ", cmd, " input1: ", input1);
        args = args.splice(1);
        switch (cmd) {
            // !ping
            case 'Does it smell like updog in here?':
                bot.sendMessage({
                    to: channelID,
                    message: "What's up dog?"
                });
                break;
            case 'join':
                switch (input1.toUpperCase()) {
                    case 'APEX':
                        for (var i = 0; i < keys.length; i++) {
                            if (roles[keys[i]].name == "Apex Squad") {
                                bot.addToRole({
                                    serverID: bot.channels[channelID].guild_id,
                                    userID: userID,
                                    roleID: roles[keys[i]].id
                                }, function (err, res) {
                                    if (err) {
                                        console.log("Error: ", err);
                                    }
                                    else {
                                        var sendMessage = "";
                                        sendMessage += user;
                                        sendMessage += ", you have been added to the " + roles[keys[i]].name + " role!";
                                        console.log("Added user ", user, " to Role: ", roles[keys[i]].name);
                                        bot.sendMessage({
                                            to: channelID,
                                            message: sendMessage
                                        })
                                    }
                                });
                                break;
                            }
                        }
                }
                break;
            // Just add any case commands if you want to..
        }
    }
})