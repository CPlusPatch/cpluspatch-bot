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
	})
	.on("SIGINT", () => {
		console.log("[-] Exiting bot");
		client.destroy();
		process.exit(1);
	});

// Base libraries
const { Client, Intents, MessageEmbed } = require("discord.js");
const Database = require("simplest.db")
const { token, guildId, activityResetTimeout } = require("./config.json");
const { I18n } = require('i18n');

const i18n = new I18n({
  locales: ['en', 'fr'],
  directory: './locales'
});
const __ = (string, lang, options = undefined) => {
	return i18n.__({phrase:string, locale:lang}, options)
}

// Spawn new databases
const lang_db = new Database({
    path: './data/lang.json'
});
const mute_db = new Database({
    path: './data/toggle_responses.json'
});

// Spawn Client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.DIRECT_MESSAGES], partials: ["CHANNEL"] });

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
	setInterval(() => {
		client.user.setActivity("all of you naughty people", {type: "WATCHING"});
	}, activityResetTimeout * 100);
	console.log("[+] Set activity to \"watching all of you naughty people\"");

	// Registers commands
	var commands = [
		require("./commands/settings").command,
		require("./commands/ping").command,
		require("./commands/mute").command,
		require("./commands/meme").command,
		require("./commands/unmute").command,
		require("./commands/random_song").command
	];

	// Get dev guild ID for slash commands, comment to use global slash commands
	const guild = client.guilds.cache.get(guildId);
	if (typeof guild == "undefined") {
		client.application.commands.set(commands);
		guild.commands.set([]);
		console.log("[+] Set global commands");
	} else {
		guild.commands.set(commands);
		console.log("[+] Set guild commands");
	}

	// Set emojis
	module.exports.emojis = {
		deactivated: client.emojis.cache.get("933406960756346912"),
		activated: client.emojis.cache.get("933406961762963527")
	}
});

client.on('messageCreate', async (message) => {
	/* const language = require("./commands/settings").getLanguageForGuild(message.guildId);
	const msg = message.content;

	// Don't react to bots or DMs
	if (message.author.bot || message.channel.type === 'DM') return; */

 });

client.on("interactionCreate", async (interaction) => {
	const language = require("./commands/settings").getLanguageForGuild(interaction.guildId);

	if (interaction.isCommand()) {
		const { commandName, options } = interaction;

		switch (commandName) {
			case "ping":
				return require("./commands/ping").default(interaction, language)
			case "mute":
				return require("./commands/mute").default(interaction, language)
			case "unmute":
				return require("./commands/unmute").default(interaction, language)
			case "settings":
				return require("./commands/settings").default(interaction, language)
			case "meme":
				return require("./commands/meme").default(interaction, language)
			case "song":
				return require("./commands/random_song").default(interaction, language)
		}
	}
	else if (interaction.isButton()) {
		switch (interaction.customId) {
			case "nuke_launch_confirm_button": {
				if (await buttons.nuke_launch_confirm_button(interaction, language)) {
					await nukeChannel(interaction);
					await nukeChannel(interaction);
					await nukeChannel(interaction);
					await nukeChannel(interaction);
					await nukeChannel(interaction);
					interaction.channel.send("https://tenor.com/view/explosions-spontaneous-explosion-dynamites-explosion-test-bomb-test-gif-13806891");
				}
			}
		}
	}
});

module.exports = {
	client: client,
	lang_db: lang_db,
	mute_db: mute_db,
	translate: __,
	emojis: {}
};

// Last line: login to the client
client.login(token);

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