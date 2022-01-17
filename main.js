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

// This prevents the bot from completely shutting down when an error is encountered while running. Instead, it just ignores it and logs to shell
// Error handler
process
	.on('unhandledRejection', (reason, p) => {
		console.error(reason, 'Unhandled Rejection at Promise ', p);
	})
	.on('uncaughtException', err => {
		console.error(err, 'Uncaught Exception caught');
	});

// Base libraries
const { Client, Intents, MessageEmbed, Permissions } = require("discord.js");
const Database = require('simplest.db');
const config = require("./config.json");
const chatTrigger = require("./commands/chatTrigger").default;
const reactToMentions = require("./commands/reactToMentions").default;
const getRandomFromSubreddit = require("./commands/reddit").default;
const mute = require("./commands/mute");
const unmute = require("./commands/unmute");
const ping = require("./commands/ping");
const nuke = require("./commands/nukeChannel");

// Spawn new database
const db = new Database({
    path: './data.json'
})

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

	// Registers commands
	var commands = [
		ping.command,
		mute.command,
		unmute.command
	];

	// Get dev guild ID for slash commands, commane to use global slash commands
	// const guild = client.guilds.cache.get(config.guildId);
	if (typeof guild != "undefined") {
		commands = guild.commands;
	} else {
		client.application.commands.set(commands);
	}
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

	if (msg.toLowerCase().startsWith("!meme")) {
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

	if (msg.toLowerCase().startsWith("!cringe")) {
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
	if (interaction.isCommand()) {
		const { commandName, options } = interaction;

		if (commandName === "ping") ping.default(interaction, options);
		else if (commandName === "mute") mute.default(interaction, options);
		else if (commandName === "unmute") unmute.default(interaction, options);
	} else if (interaction.isButton()) {
		if (interaction.customId === "nuke_launch_confirm_button") {
			// Edit the original message to mark the button as disabled
			var interactionCopy = interaction;
			interactionCopy.message.components[0].components[0].disabled = true;
			interaction.message.edit({embeds:[interactionCopy.message.embeds[0]], components:[interactionCopy.message.components[0]],})
			if (await nuke.buttons.nuke_launch_confirm_button(interaction)) {
				await nuke.nukeChannel(interaction);
				await nuke.nukeChannel(interaction);
				await nuke.nukeChannel(interaction);
				await nuke.nukeChannel(interaction);
				await nuke.nukeChannel(interaction);
			}
		}
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