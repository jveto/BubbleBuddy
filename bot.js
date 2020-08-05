var auth = require('./auth.json');
const Discord = require('discord.js');
const client = new Discord.Client();
//const guild = new Discord.Guild(client, null);
var guild = client.guilds.cache;
var curGuild; 

let max;
let rng;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    //console.log(guild)
    curGuild = guild.find(name => name.name == 'Bubbles');
    //console.log(curGuild.id);
    // var roles = curGuild.roles.cache.forEach(x => {
    //     console.log(x);
    // })
    // guild.forEach(x => {
    //     //console.log(x.roles);
    // })
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
                    case "LEAGUE":
                        AddGameRole("LEAGUE", msg.author.id, msg, "Legends of League");
                        break;
                    case "LEAGUE OF LEGENDS":
                        AddGameRole("LEAGUE OF LEGENDS", msg.author.id, msg, "Legends of League");
                        break;
                    case "FALL GUYS":
                        AddGameRole("FALL GUYS", msg.author.id, msg, "Fallers");
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
                    case "LEAGUE":
                        RemoveGameRole("LEAGUE", msg.author.id, msg, "Legends of League");
                        break;
                    case "LEAGUE OF LEGENDS":
                        RemoveGameRole("LEAGUE OF LEGENDS", msg.author.id, msg, "Legends of League");
                        break;
                    case "FALL GUYS":
                        RemoveGameRole("FALL GUYS", msg.author.id, msg, "Fallers");
                        break;
                }
                break;
            case "JOKE":
                if(args.length > 1){
                    switch(args[1].toUpperCase()){
                        case "DAD":
                            max = DadJokes.length;
                            rng = Math.floor(Math.random() * max);
                            console.log("Telling joke: ", DadJokes[rng]);
                            msg.channel.send(DadJokes[rng]);
                            break;
                        case "NSFW":
                            max = NsfwJokes.length;
                            rng = Math.floor(Math.random() * max);
                            console.log("Telling joke: ", NsfwJokes[rng]);
                            msg.channel.send(NsfwJokes[rng]);
                            break;
                    }
                }
                else{
                    var AllJokes = NsfwJokes.concat(DadJokes);
                    max = AllJokes.length;
                    rng = Math.floor(Math.random() * max);
                    console.log("Telling joke: ", AllJokes[rng]);
                    msg.channel.send(AllJokes[rng]);
                    AllJokes = [];
                }
                
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

var DadJokes = [
    "What did the drummer call his twin daughters? Anna one, Anna two!",
    "How did Darth Vader know what Luke got him for Christmas? He felt his presents!",
    "Did you hear about the chameleon who couldn't change color? He had a reptile dysfunction.",
    "I wanted to go on a diet, but I feel like I have way too much on my plate right now.",
    "Want to hear a joke about construction? I'm still working on it.",
    "What’s Forrest Gump’s password? 1forrest1",
    "What sound does a witches car make? Broom Broom",
    "To whoever stole my copy of Microsoft Office, I will find you. You have my Word!",
    "What does a zombie vegetarian eat? “GRRRAAAIINS!”",
    "This graveyard looks overcrowded. People must be dying to get in there.",
    "What does a nosey pepper do? It gets jalapeno business!",
    "I tell dad jokes, but I don't have any kids. I'm a faux pa.",
    "Whenever the cashier at the grocery store asks my dad if he would like the milk in a bag he replies, 'No, just leave it in the carton!'",
    "Two goldfish are in a tank. One says to the other, 'do you know how to drive this thing?'",
    "What’s that Nevada city where all the dentists visit? Floss Vegas.",
    "Atheism is a non-prophet organization.",
    "You’re American when you go into the bathroom, and you’re American when you come out, but do you know what you are while you’re in there? European.",
    "Why did the picture go to jail? Because it was framed.",
    "What do you call a bear without any teeth? A gummy bear!",
    "What do you call a hippie's wife? Mississippi.",
    "The shovel was a ground-breaking invention.",
    "Dad, can you put the cat out? I didn't know it was on fire.",
    "Does anyone need an ark? I Noah guy!",
    "How do you make holy water? You boil the hell out of it.",
    "5/4 of people admit that they’re bad with fractions.",
    "What do you call a man with a rubber toe? Roberto.",
    "I would avoid the sushi if I was you. It’s a little fishy.",
    "To the man in the wheelchair that stole my camouflage jacket... You can hide but you can't run.",
    "What do you call a fish with two knees? A two-knee fish!",
    "I bought some shoes from a drug dealer. I don't know what he laced them with, but I was tripping all day!",
    "The rotation of earth really makes my day.",
    "I thought about going on an all-almond diet. But that's just nuts.",
    "Did you know the first French fries weren't actually cooked in France? They were cooked in Greece.",
    "I’ve never gone to a gun range before. I decided to give it a shot!",
    "What's black and white and goes around and around? A penguin in a revolving door.",
    "Why do you never see elephants hiding in trees? Because they're so good at it.",
    "My son screeched, 'Daaaaaad, you haven't listened to one word I've said, have you!?' What a strange way to start a conversation with me...",
    "Did you hear about the kidnapping at school? It's fine, he woke up.",
    "What did the caretaker say when they jumped out of the store cupboard? “Supplies!”",
    "If a child refuses to sleep during nap time, are they guilty of resisting a rest?",
    "A furniture store keeps calling me. All I wanted was one night stand.",
    "I used to work in a shoe recycling shop. It was sole destroying.",
    "Did I tell you the time I fell in love during a backflip? I was heels over head.",
    "My wife is really mad at the fact that I have no sense of direction. So I packed up my stuff and right.",
    "Did you hear about the restaurant on the moon? Great food, no atmosphere.",
    "When does a joke become a dad joke? When it becomes apparent!",
    "What do you call a fake noodle? An Impasta.",
    "My friend keeps saying 'cheer up man it could be worse, you could be stuck underground in a hole full of water.' I know he means well.",
    "What time did the man go to the dentist? Tooth hurt-y!",
    "I just watched a program about beavers. It was the best dam program I've ever seen.",
    "Why did the coffee file a police report? It got mugged.",
    "I ordered a chicken and an egg from Amazon. I’ll let you know.",
    "How does a penguin build it's house? Igloos it together.",
    "What did the fried rice say to the shrimp? Don't wok away from me.",
    "Dad, did you get a haircut? No, I got them all cut.",
    "The secret service isn't allowed to yell 'Get down!' anymore when the president is about to be attacked. Now they have to yell 'Donald Duck!'",
    "Two cannibals are eating a clown. One says to the other: “Does this taste funny to you?”",
    "Why did the scarecrow win an award? Because he was outstanding in his field.",
    "What do you call a man who can’t stand? Neil.",
    "I’m thinking about removing my spine. I feel like it’s only holding me back.",
    "Why don't skeletons ever go trick or treating? Because they have no body to go with.",
    "How do you make a tissue dance? You put a little boogie in it.",
    "What do you call an elephant that doesn't matter? An irrelephant.",
    "What do you call cheese that isn't yours? Nacho Cheese.",
    "Why couldn't the bicycle stand up by itself? It was two tired.",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "What did the grape do when he got stepped on? He let out a little wine.",
    "I wouldn't buy anything with velcro. It's a total rip-off.",
    "Why are cats bad storytellers? Because they only have one tale.",
    "Why was the belt sent to jail? For holding up a pair of pants!",
    "What do you call a baby monkey? A chimp off the old block.",
    "What’s an astronaut’s favorite part of a computer? The space bar.",
    "Do you think glass coffins will be a success? Remains to be seen.",
    "What lies at the bottom of the ocean and twitches? A nervous wreck.",
    "What happens when a frogs car dies? He needs a jump. If that doesn't work he has to get it toad.",
    "Did you hear about the scientist who was lab partners with a pot of boiling water? He had a very esteemed colleague.",
    "How do you catch a unique rabbit? You 'neak up on it!",
    "How do you catch a tame rabbit? You do the tame thing!",
    "What rock group has four men that don't sing? Mount Rushmore.",
    "When I was a kid, my mother told me I could be anyone I wanted to be. Turns out, identity theft is a crime.",
    "A guy goes to his doctor because he can see into the future. The doctor asks him, 'How long have you suffered from that condition?' The guy tells him, 'Since next Monday.'",
    "What do sprinters eat before a race? Nothing, they fast!",
    "What concert costs just 45 cents? 50 Cent featuring Nickelback!",
    "What do you call a mac 'n' cheese that gets all up in your face? Too close for comfort food!",
    "Why couldn't the bicycle stand up by itself? It was two tired!",
    "Did you hear about the restaurant on the moon? Great food, no atmosphere!",
    "Why do melons have weddings? Because they cantaloupe!",
    "What happens when you go to the bathroom in France? European.",
    "What's the difference between a poorly dressed man on a tricycle and a well-dressed man on a bicycle? Attire!",
    "How many apples grow on a tree? All of them!",
    "Did you hear the rumor about butter? Well, I'm not going to spread it!",
    "Did you hear about the guy who invented Lifesavers? They say he made a mint!",
    "Last night I had a dream that I weighed less than a thousandth of a gram. I was like, 0mg.",
    "A cheese factory exploded in France. Da brie is everywhere!",
    "Why did the old man fall in the well? Because he couldn't see that well!",
    "What do you call a factory that sells passable products? A satisfactory!",
    "Why did the invisible man turn down the job offer? He couldn't see himself doing it!",
    "Want to hear a joke about construction? I'm still working on it!",
    "I was really angry at my friend Mark for stealing my dictionary. I told him, 'Mark, my words!'",
    "How does Moses make his coffee? Hebrews it.",
    "I'm starting a new dating service in Prague. It's called Czech-Mate.",
    "I was just reminiscing about the beautiful herb garden I had when I was growing up. Good thymes.",
    "Do you know the last thing my grandfather said to me before he kicked the bucket? 'Grandson, watch how far I can kick this bucket.'",
    "I like telling Dad jokes. Sometimes he laughs!",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "What do you call a fish with two knees? A two-knee fish!",
    "Why do you never see elephants hiding in trees? Because they're so good at it!",
    "How does a penguin build its house? Igloos it together!",
    "Why don't skeletons ever go trick or treating? Because they have no body to go with!",
    "This graveyard looks overcrowded. People must be dying to get in there!",
    "What's ET short for? Because he's only got tiny legs!",
    "What's brown and sticky? A stick!",
    "Can February march? No, but April may!",
    "What's orange and sounds like a parrot? A carrot!",
    "How do you make a Kleenex dance? Put some boogie in it!",
    "Why is Peter Pan always flying? He neverlands!",
    "What's a ninja's favorite type of shoes? Sneakers!",
    "What do Santa's elves listen to ask they work? Wrap music!",
    "Did you hear about the bacon cheeseburger who couldn't stop telling jokes? It was on a roll.",
    "Student: 'Can I go to the bathroom?' Teacher: 'It's 'may.' Student: 'No, it's January.'",
    "Why was the coach yelling at a vending machine? He wanted his quarter back.",
    "Why do vampires seem sick? They're always coffin.",
    "Within minutes, the detectives knew what the murder weapon was. It was a brief case.",
    "To whoever stole my copy of Microsoft Office, I will find you. You have my Word!",
    "I used to work in a shoe-recycling shop. It was sole destroying!",
    "My boss told me to have a good day, so I went home!",
    "I'm so good at sleeping I can do it with my eyes closed!",
    "Spring is here! I got so excited I wet my plants!",
    "I thought about going on an all-almond diet… But that's just nuts!",
    "My friend says to me, 'What rhymes with orange?'And I told him, 'No it doesn't!'",
    "My wife told me I had to stop acting like a flamingo. So I had to put my foot down!",
    "I told my girlfriend she drew her eyebrows too high. She seemed surprised!",
    "I tell dad jokes but I have no kids…I'm a faux pa!",
    "So a vowel saves another vowel's life. The other vowel says, 'Aye E! I owe you!'",
    "Did I tell you the time I fell in love during a backflip? I was heels over head!",
    "My uncle named his dogs Rolex and Timex. They're his watch dogs!",
    "If you see a robbery at an Apple Store does that make you an iWitness?!",
    "I would avoid the sushi if I were you. It's a little fishy!",
    "Five out of four people admit they're bad with fractions!",
    "Two goldfish are in a tank. One says to the other, 'Do you know how to drive this thing?'",
    "I'll call you later. Don't call me later, call me Dad!",
    "Did you hear about the Italian chef who died? He pasta way!",
    "When the grocery store clerk asks me if I want the milk in a bag, I always tell him, 'No, I'd rather drink it out of the carton!'",
    "The difference between a numerator and a denominator is a short line. Only a fraction of people will understand this!",
    "I don't play soccer because I enjoy the sport. I'm just doing it for kicks!",
    "I invented a new word today: Plagiarism!",
    "What do you call a donkey with only three legs? A wonkey!",
    "After dinner, my wife asked if I could clear the table. I needed a running start, but I made it!",
    "This morning, Siri said, 'Don't call me Shirley.' I accidentally left my phone in Airplane mode!",
    "A woman is on trial for beating her husband to death with his guitar collection. The judge asks her, 'First offender?' She says, 'No, first a Gibson! Then a Fender!'",
    "I know a lot of jokes about retired people but none of them work!",
    "What do you call a guy with a rubber toe? Roberto!",
    "What rhymes with boo and stinks? You!",
    "I accidentally dropped my pillow on the floor. I think it has a concushion.",
    "Someone complimented my parking today! They left a sweet note on my windshield that said 'parking fine.'",
    "St. Francis worked at Krispy Kreme. He was a deep friar.",
    "In America, using the metric system can get you in legal trouble. In fact, if you sneer at any other method of measuring liquids, you may be held in contempt of quart.",
    "I found a wooden shoe in my toilet today. It was clogged.",
    "Some people can't distinguish between etymology and entomology. They bug me in ways I can't put into words.",
    "My hotel tried to charge me ten dollars extra for air conditioning. That wasn't cool.",
    "If an English teacher is convicted of a crime and doesn't complete the sentence, is that a fragment?",
    "I think my wife is putting glue on my antique weapons collection. She denies it but I'm sticking to my guns!",
    "Which U.S. state is famous for its extra-small soft drinks? Minnesota!",
    "I got a hen to regularly count her own eggs. She's a real mathamachicken!",
    "What did the Ranch say when someone opened the refrigerator door? 'Close the door, I'm dressing!'",
    "Why do trees seem suspicious on sunny days? They just seem a little shady!",
    "What did the policeman say to his belly button? You're under a vest!",
    "What do you call a fake noodle? An Impasta!",
    "I've been bored recently so I've decided to take up fencing. The neighbors said they will call the police unless I put it back.",
    "Why did the math book look so sad? Because of all of its problems!",
    "I don't really call for funerals that start before noon. I guess I'm just not a mourning person!",
    "If two vegans get in a fight, is it still considered a beef?",
    "One of my favorite memories as a kid was when my brothers used to put me inside a tire and roll me down a hill. They were Goodyears!",
    "I'm addicted to collecting vintage Beatles albums. I need Help!",
    "What does the cell say to his sister when she steps on his toe? 'Oh my toe sis!'",
    "I never buy pre-shredded cheese. Because doing it yourself is grate.",
    "I was playing chess with my friend and he said, 'Let's make this interesting.' So we stopped playing chess.",
    "How do you tell the difference between a bull and a milk cow? It is either one or the utter.",
    "I have a great joke about nepotism. But I'll only tell it to my kids.",
    "What do scholars eat when they're hungry? Academia nuts.",
    "What do you call an ant that has been shunned by his community? A socially dissed ant.",
    "A Vicks VapoRub truck overturned on the highway this morning. Amazingly, there was no congestion for eight hours!",
    "When does a joke become a dad joke? When it becomes apparent.",
    "Dad, did you get a haircut? No, I got them all cut!",
    "My wife is really mad at the fact that I have no sense of direction. So I packed up my stuff and right!",
    "How do you get a squirrel to like you? Act like a nut.",
    "Why don't eggs tell jokes? They'd crack each other up.",
    "I don't trust stairs. They're always up to something.",
    "What do you call someone with no body and no nose? Nobody knows.",
    "Did you hear the rumor about butter? Well, I'm not going to spread it!",
    "Why couldn't the bicycle stand up by itself? It was two tired.",
    "Dad, can you put my shoes on? No, I don't think they'll fit me.",
    "Why can't a nose be 12 inches long? Because then it would be a foot.",
    "This graveyard looks overcrowded. People must be dying to get in.",
    "Dad, can you put the cat out? I didn't know it was on fire.",
    "What time did the man go to the dentist? Tooth hurt-y.",
    "How many tickles does it take to make an octopus laugh? Ten tickles.",
    "What concert costs just 45 cents? 50 Cent featuring Nickelback!",
    "How do you make a tissue dance? You put a little boogie in it.",
    "Why did the math book look so sad? Because of all of its problems!",
    "What do you call cheese that isn't yours? Nacho cheese.",
    "What kind of shoes do ninjas wear? Sneakers!",
    "How does a penguin build its house? Igloos it together.",
    "I'm on a seafood diet. I see food and I eat it.",
    "Why did the scarecrow win an award? Because he was outstanding in his field.",
    "I made a pencil with two erasers. It was pointless.",
    "How do you make a Kleenex dance? Put a little boogie in it!",
    "I'm reading a book about anti-gravity. It's impossible to put down!",
    "Did you hear about the guy who invented the knock-knock joke? He won the 'no-bell' prize.",
    "I've got a great joke about construction, but I'm still working on it.",
    "I used to hate facial hair...but then it grew on me.",
    "I decided to sell my vacuum cleaner—it was just gathering dust!",
    "I had a neck brace fitted years ago and I've never looked back since.",
    "You know, people say they pick their nose, but I feel like I was just born with mine.",
    "What's brown and sticky? A stick.",
    "Why can't you hear a psychiatrist using the bathroom? Because the 'P' is silent.",
    "What do you call an elephant that doesn't matter? An irrelephant.",
    "What do you get from a pampered cow? Spoiled milk.",
    "I like telling Dad jokes. Sometimes he laughs!",
    "Did I tell you the time I fell in love during a backflip? I was heels over head!",
    "If a child refuses to sleep during nap time, are they guilty of resisting a rest?",
    "I ordered a chicken and an egg online. I’ll let you know.",
    "It takes guts to be an organ donor.",
    "If you see a crime at an Apple Store, does that make you an iWitness?",
    "I'm so good at sleeping, I can do it with my eyes closed!",
    "I was going to tell a time-traveling joke, but you guys didn't like it.",
    "It's inappropriate to make a 'dad joke' if you're not a dad. It's a faux pa.",
    "Did you hear about the circus fire? It was in tents.",
    "Can February March? No, but April May!",
    "How do lawyers say goodbye? We'll be suing ya!",
    "Wanna hear a joke about paper? Never mind—it's tearable.",
    "What's the best way to watch a fly fishing tournament? Live stream.",
    "Spring is here! I got so excited I wet my plants.",
    "I could tell a joke about pizza, but it's a little cheesy.",
    "Don't trust atoms. They make up everything!",
    "When does a joke become a dad joke? When it becomes apparent.",
    "I wouldn't buy anything with velcro. It's a total rip-off.",
    "What’s an astronaut’s favorite part of a computer? The space bar.",
    "I don't play soccer because I enjoy the sport. I'm just doing it for kicks!",
    "Why are elevator jokes so classic and good? They work on many levels.",
    "Why do bees have sticky hair? Because they use a honeycomb.",
    "What do you call a fake noodle? An impasta.",
    "Which state has the most streets? Rhode Island.",
    "What did the coffee report to the police? A mugging.",
    "What did the fish say when he hit the wall? Dam.",
    "Is this pool safe for diving? It deep ends."
];
var NsfwJokes = [
    "What do you call Annie after first blood? A woman.",
    "Look in the mirror"
]