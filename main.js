/* 

 ______     ______   __         __  __     ______     ______   ______     ______   ______     __  __    
/\  ___\   /\  == \ /\ \       /\ \/\ \   /\  ___\   /\  == \ /\  __ \   /\__  _\ /\  ___\   /\ \_\ \   
\ \ \____  \ \  _-/ \ \ \____  \ \ \_\ \  \ \___  \  \ \  _-/ \ \  __ \  \/_/\ \/ \ \ \____  \ \  __ \  
 \ \_____\  \ \_\    \ \_____\  \ \_____\  \/\_____\  \ \_\    \ \_\ \_\    \ \_\  \ \_____\  \ \_\ \_\ 
  \/_____/   \/_/     \/_____/   \/_____/   \/_____/   \/_/     \/_/\/_/     \/_/   \/_____/   \/_/\/_/ 
                                                                                                        
 ______     ______   __  __     _____     __     ______     ______                                      
/\  ___\   /\__  _\ /\ \/\ \   /\  __-.  /\ \   /\  __ \   /\  ___\                                     
\ \___  \  \/_/\ \/ \ \ \_\ \  \ \ \/\ \ \ \ \  \ \ \/\ \  \ \___  \                                    
 \/\_____\    \ \_\  \ \_____\  \ \____-  \ \_\  \ \_____\  \/\_____\                                   
  \/_____/     \/_/   \/_____/   \/____/   \/_/   \/_____/   \/_____/                                   

	@ Deez-nutting people since 2016
	@ Bot coded by @CPlusPatch
	@ License: MIT License
	@ Feel free to fork this
	@ Contact me at contact@cpluspatch.com or by Discord: CPlusPatch#9373
*/

// Base libraries
const { Client, Intents, MessageEmbed, Constants } = require("discord.js");
const config = require("./config.json");
const chatTrigger = require("./commands/chatTrigger").default;
const reactToMentions = require("./commands/reactToMentions").default;
const getRandomFromSubreddit = require("./commands/reddit").default;
const ms = require("ms");
const mute = require("./commands/mute").default;

// Spawn Client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS] });

client.once("ready", () => {
	console.log(String.raw`
	 ______     ______   __         __  __     ______     ______   ______     ______   ______     __  __    
	/\  ___\   /\  == \ /\ \       /\ \/\ \   /\  ___\   /\  == \ /\  __ \   /\__  _\ /\  ___\   /\ \_\ \   
	\ \ \____  \ \  _-/ \ \ \____  \ \ \_\ \  \ \___  \  \ \  _-/ \ \  __ \  \/_/\ \/ \ \ \____  \ \  __ \  
	 \ \_____\  \ \_\    \ \_____\  \ \_____\  \/\_____\  \ \_\    \ \_\ \_\    \ \_\  \ \_____\  \ \_\ \_\ 
	  \/_____/   \/_/     \/_____/   \/_____/   \/_____/   \/_/     \/_/\/_/     \/_/   \/_____/   \/_/\/_/ 
																											
	 ______     ______   __  __     _____     __     ______     ______         								
	/\  ___\   /\__  _\ /\ \/\ \   /\  __-.  /\ \   /\  __ \   /\  ___\                                     
	\ \___  \  \/_/\ \/ \ \ \_\ \  \ \ \/\ \ \ \ \  \ \ \/\ \  \ \___  \                                    
	 \/\_____\    \ \_\  \ \_____\  \ \____-  \ \_\  \ \_____\  \/\_____\                                   
	  \/_____/     \/_/   \/_____/   \/____/   \/_/   \/_____/   \/_____/                                   
	`);
	console.log("\n[+] CPlusPatch is online! ＼(￣▽￣)／");
	client.user.setActivity("cpluspatch.com", {type: "WATCHING"});
	console.log("[+] Set activity to \"watching cpluspatch.com\"");

	const guild = client.guilds.cache.get(config.guildId);

	if (guild) {
		commands = guild.commands;
	} else {
		commands = client.application.commands;
	}

	commands.create({
		name: "ping",
		description: "Replies with pong",
	});
	commands.create({
		name: "mute",
		description: "Mutes a user",
		options: [
			{
				name: "user",
				description: "The user to mute",
				required: true,
				type: Constants.ApplicationCommandOptionTypes.USER
			},
			{
				name: "length",
				description: "Length of mute",
				required: false,
				type: Constants.ApplicationCommandOptionTypes.STRING
			},
			{
				name: "reason",
				description: "Reason for mute",
				required: false,
				type: Constants.ApplicationCommandOptionTypes.STRING
			}
		]
	});
});

client.on('messageCreate', async (message) => {
	var msg = message.content;

	var triggerChance = 1;
	
	// We don't want to respond to ourselves do we?
	if (message.author.bot) return;

	chatTrigger(message, triggerChance);

	if (message.mentions.has(client.user)) {
		reactToMentions(message)
	}

	if (msg.toLowerCase().includes("meme")) {
		message.channel.sendTyping();
		
		getRandomFromSubreddit("meme").then((meme) => {
			const embed = new MessageEmbed()
				.setColor("RANDOM")
				.setImage(meme.url)
				.setTitle(meme.title)
				.setURL(`https://reddit.com/r/${meme.subreddit}`)
			
			message.channel.send({embeds: [embed]});
		});
	}

	if (msg.toLowerCase().includes("cringe")) {
		message.channel.sendTyping();
		
		getRandomFromSubreddit("cringe").then((cringe) => {
			const embed = new MessageEmbed()
				.setColor("RANDOM")
				.setImage(cringe.url)
				.setTitle(cringe.title)
				.setURL(`https://reddit.com/r/${cringe.subreddit}`)
			
			message.channel.send({embeds: [embed]});
		});
	}
 });

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return;

	const { commandName, options } = interaction;

	if (commandName === "ping") {
		interaction.reply({
			content: "Pong!",
			ephemeral: true
		});
	} else if (commandName === "mute") {
		mute(interaction, options)
	}
});

// Last line: login to the client
client.login(config.token);

/*
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWMMMMMWXKK00KKNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWWMMMWNNWWXNKxxxkkkkxdddxO0000KXNWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWXkdOXWXxc;:cccccccclccclc:::lodxxOKNWMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWkc;,,:lc:,..........,cc:ccccccllollloxk0XWMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNx,,,'.................,cccccclllllllodxxxkkOXWMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMO,,:'.................''':llllllllllllloodO0OkOXWMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM0::l:'...............'::.':lllllllllloolllldO00k0NMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMWO:,;'.....................'clllllllllooollllox0KO0WMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXd:;coc::,',;c:;;:cc:;',,'...,cllllllllllllllllldO0k0WMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMNo,,lKNXXNXK0KXNNNNNNNKOxdc;,,',cllllllllllllllllloOOONMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMNd'.,kNNNNNNNNNNNNNNNNNNNNXKxc;,';lclllllllllllllolloxk0WMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMWk'..;ONNNNNNNNNNNNNNNNNNNNNNKOdl,':cllllllllllllllolloxkKMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMK:..'xKKKXNNNNNNNNNNNNNNNNNNNXK0xc,,ccllllllllllllllllldxkNMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMk'..;do:;ckNNNNNNNNNNNNNNNNNNNXXKko;;ccllllllllllllllllokx0MMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMNl...c0K0k:,dXNNNNNNNNNNNNNNNNNNXXK0o;:cllllllllllllllllokxkNMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMO;...lKKKK0xldXNNNNNNNNNNNNNNNNNXXXXOc;ccllllllllllllllllxkd0MMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMNo....lOxoodxxoONNNXKKKXXNNNNNNNNNXXXKd;::cllllllllllllllloOdkWMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMM0;....',;cllcloxXNNXKOdl:::ccccccldOKXOc;:cllllllllllllllllkxxXMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMk'.....lxkOkkxdd0NNNXKOo;;,,,;ldxOKXXXKd;:ccllllllllllllllldkd0MMMMMMMMMMM
MMMMMWWNNXXK0KNMMMMMMMMMMWo.....,OOxKOkK0x0NNNXKxoodoclc;;lOKXXXKk:;::cllllllllllllllokdOMMMMMMMMMMM
MMNxc:::::;;,;OMMMMMMMMMMXc.....'xXxk0xkOx0NNNNW0xk0KkONXx:'ckXXX0l,::clllllllllllllllxxOWMMMMMMMMMM
lkXd''..::.,;:kWMMMMMMMMM0:.....'dX0xxdooOKNNNNWXkox0OkKWMNx,'cx0Kx;;::clllllllllllcccdkOWMMMMMMMMMM
'.,oxkl.,;'xKXWMMMMMMMMMMO,.....:kkOKKKOkKXNNNNNNKOxxOx0MWMWXkk0KK0c';::clllllccccc:ccoxkNMMMMMMMMMM
',..kMk.,,;KMMMMMMMMMMMMM0;.....dK00OKNNXNNNNNNNNNNX0OOXMMMWKk0KKK0Ol;:::cllcc::;;;::clloKMMMMMMMMMM
;.;.cNx.,,;KMMMMMMMMMMMMMXc.....cXNNNXXNNNNNNNNNNNNNNWWWWNX0OOKKKK0kkl;:::cllcc:::::looolOMMMMMMMMMM
'.,.oWx.,,;KMMMMMMMMMMMMMWk,.....cKNNNNNNK0KXNNNNNNNNNNNNXKKXXXXKOdxx:';c::cccccoxkkkOOOdOMMMMMMMMMM
''.cXMx.,,;KMMMMMMMMMMMMMMXo,,'...:xKNNNKxoddx0NNNNNNNNNNNNNXNXOxolc,..':;;;::;:ccoooodockMMMMMMMMMM
,:xNMMO;lloXMMMMMMMMMMMMMMMNx:;;,,'';lx0NNK0OO0XNNNNNNNNNNNKOxxol:'.....,;;;;;;;;;;::cdclKMMMMMMMMMM
KWMMMMWWWWWMMMMMMMMMMMMMMMMMW0o;;:c:;,',coxk0KKXXXXXXKK0Oxxddxdc,.....,'';;;;;;;;;;;:olc0MMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMWMWWWKxl;;;;;,''',;:ccclloxkkkkkO0kl:,'...',,.';;;;;;;;,,,codKMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMWN0xdl:,..........'',;;:codxkO0Oo;,'''',,,'..,;,,,'.,cdxOKNWWMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMNOo;'......................'''',:;,;;''''''..'........':kNMMMMWMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMXd,...............................'cdc;'''''''.......'''..,xXMMMMMMMMMMMMMMW
MMMMMMMMMMMMMMMMMMMMMMMMXl''.......'.'.....'...'...........cx:::..''.'''''...''.....:kNWWMMMMMMMMWWW
MMMMMMMMMMMMMMMMMMMMMMMMXc''.....''..........'....'.........;;,;,'.'...'''''..;lxl...'cxKWMMMMMMMWXX
MMMMMMMMMMMMMMMMMMMMMMMMK:',,,..'''''..........'.............'cddc'...''.''..':x0k,...',cx0WMMMMMMWK
MMMMMMMMMMMMMMMMMMMMMMMMO:,,,,..'''.................'.''...'..'lOOd,.'''.......'cd;....',:cdKWMMMMMW
MMMMMMMMMMMMMMMMMMMMMMMM0:,,,'..''............. ....,clll:;,....:c:;.''''....'.'okc... ..';::kWMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMNl',,'..'''......... ....''.;OXOolc,.......''..''..'....':,... ...';;:OMMMMM
MMMMMMMMMMMMMMMMMMMMMMMWXc.','..'''....... ..........;O0dl:'....................':;... .....,,lKWMMM
MMMMMMMMMMMMMMMMMMMMMMM0:...,'..'''....  .............cKKxo,................................',loOWMM
MMMMMMMMMMMMMMMMMMMMMMWo',,'.'..'''... ...............'dKx:'...............................'';olkWMM
MMMMMMMMMMMMMMMMMMMMMMXc','..,'...... ...............'.;xxc................................',;cdXMMM
MMMMMMMMMMMMMMMMMMMMMMKc';..',,,...'.................''.''........................'..''..:dloxONMMMM
MMMMMMMMMMMMMMMMMMMMMMNl',..,,,''....................'......................'.....'..,;,.oWWWMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMWo',..,,'.............................''..............''..'....,::.cNMMMMMMMMM
*/