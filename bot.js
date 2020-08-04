var auth = require('./auth.json');
const Discord = require('discord.js');
const client = new Discord.Client();
//const guild = new Discord.Guild(client, null);
var guild = client.guilds.cache;
var curGuild; 


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    console.log(guild)
    curGuild = guild.find(name => name.name == 'Bubbles');
    console.log(curGuild.id);
    var roles = curGuild.roles.cache.forEach(x => {
        console.log(x);
    })
    guild.forEach(x => {
        //console.log(x.roles);
    })
})


client.on('message', msg =>{
    if(msg.author.username == "BubbleBuddy") return;
    //console.log(msg);
    if(msg.content[0] == '!'){
        var args = msg.content.substring(1, msg.content.length).split(" ");
        console.log("args: ", args);
        switch (args[0].toUpperCase()){
            case "JOIN":
                if(args.length < 2) return;
                args.splice(0,1);
                args = args.join(" ");
                console.log(args);
                switch(args.toUpperCase()){
                    case "APEX":
                        AddGameRole("APEX", msg.author.id, msg, "Apex Squad");
                        break;
                    case "PUMMEL PARTY":
                        AddGameRole("PUMMEL PARTY", msg.author.id, msg, "Pummel Party Crew");
                        break;
                    case "VALORANT":
                        AddGameRole("VALORANT", msg.author.id, msg, "Valorant Gang");
                        break;
                }
                break;
            case "LEAVE":
                if(args.length < 2) return;
                args.splice(0,1);
                args = args.join(" ");
                console.log(args);
                switch(args.toUpperCase()){
                    case "APEX":
                        RemoveGameRole("APEX", msg.author.id, msg, "Apex Squad");
                        break;
                    case "PUMMEL PARTY":
                        RemoveGameRole("PUMMEL PARTY", msg.author.id, msg, "Pummel Party Crew");
                        break;
                    case "VALORANT":
                        RemoveGameRole("VALORANT", msg.author.id, msg, "Valorant Gang");
                        break;
                }
                break;
        }
    }
})
function RemoveGameRole(gameName, userId, bot, roleName){
    console.log("Attempting to remove");
    var role = curGuild.roles.cache.find(role => role.name == roleName);             
    const promise = curGuild.members.fetch(userId);;
    promise.then(suc, err);
    function suc(user){
        attemptToRemoveRole(user, role);
    }
    function err(err){
        console.log("err: ", err);
    }

    function attemptToRemoveRole(user, role){
        if(user._roles.includes(role.id)){
            user.roles.remove(role);
            console.log("Removed");
            bot.channel.send(`You have sucessfully left <@&${role.id}>!`);
        }
        else{
            console.log("NonMember");
            bot.channel.send(`You don't even go here!`);
        }
    };
}

function AddGameRole(gameName, userId, bot, roleName){
    var role = curGuild.roles.cache.find(role => role.name == roleName);             
    const promise = curGuild.members.fetch(userId);;
    promise.then(suc, err);
    function suc(user){
        attemptToAddRole(user, role);
    }
    function err(err){
        console.log("err: ", err);
    }


    function attemptToAddRole(user, role){
        if(user._roles.includes(role.id)){
            console.log("AlreadyMember");
            bot.channel.send("You are already a member of this group you dork!");
        }
        else{
            user.roles.add(role);
            console.log("Added");
            bot.channel.send(`Another member has joined <@&${role.id}>`);
        }
    };
}


client.login(auth.token);









// var Discord = require('discord.io');
// var logger = require('winston');
// var auth = require('./auth.json');
// const { Console } = require('winston/lib/winston/transports');

// logger.remove(logger.transports.Console);
// logger.add(new logger.transports.Console, {
//     colorize: true
// });
// logger.level = 'debug';
// console.log("running");
// var bot = new Discord.Client({
//     token: auth.token,
//     autorun: true
// });
// console.log("bit", bot.connected);
// console.log("bot again", bot);
// bot.on('ready', function (evt) {
//     console.log("bot.on");
//     logger.info('Connected');
//     logger.info('Logged in as: ');
//     logger.info(bot.username + ' - (' + bot.id + ')');
// });
// bot.on('error', function(evt, ab){
//     console.log("evt", evt)
//     console.log("ab", ab);
// })
// bot.on('message', function (user, userID, channelID, message, evt) {
//     var serverID = bot.channels[channelID].guild_id;
//     var roles = bot.servers[serverID].roles;
//     var keys = Object.keys(roles);
//     var values = Object.values(roles);
//     var entries = Object.entries(roles);
//     logger.info(user, userID, channelID, evt)
//     console.log("User: ", user);
//     console.log("UserID: ", userID);
//     console.log("channelID: ", channelID);
//     console.log("message: ", message);
//     console.log("server id: ", serverID);
//     console.log("=======================================================================================================")
//     if (message[0] == "!") {
//         var args = message.substring(1, message.length).split(" ")
//         var cmd = args[0];
//         var input1 = args[1];
//         console.log(message);
//         console.log("cmd: ", cmd, " input1: ", input1);
//         args = args.splice(1);
//         switch (cmd) {
//             // !ping
//             case 'Does it smell like updog in here?':
//                 bot.sendMessage({
//                     to: channelID,
//                     message: "What's up dog?"
//                 });
//                 break;
//             case 'join':
//                 switch (input1.toUpperCase()) {
//                     case 'APEX':
//                         for (var i = 0; i < keys.length; i++) {
//                             if (roles[keys[i]].name == "Apex Squad") {
//                                 bot.addToRole({
//                                     serverID: bot.channels[channelID].guild_id,
//                                     userID: userID,
//                                     roleID: roles[keys[i]].id
//                                 }, function (err, res) {
//                                     if (err) {
//                                         console.log("Error: ", err);
//                                     }
//                                     else {
//                                         var sendMessage = "";
//                                         sendMessage += user;
//                                         sendMessage += ", you have been added to the " + roles[keys[i]].name + " role!";
//                                         console.log("Added user ", user, " to Role: ", roles[keys[i]].name);
//                                         bot.sendMessage({
//                                             to: channelID,
//                                             message: sendMessage
//                                         })
//                                     }
//                                 });
//                                 break;
//                             }
//                         }
//                 }
//                 break;
//             // Just add any case commands if you want to..
//         }
//     }
// })
// console.log("end");