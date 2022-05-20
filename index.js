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
.on('unhandledRejection', (reason, p) => console.error(reason, 'Unhandled Rejection at Promise ', p))
.on('uncaughtException', err => console.error(err, 'Uncaught Exception caught ', err))
.on("SIGINT", () => {
	console.log("[-] Exiting bot");
	client.destroy();
	process.exit(1);
});

// Base libraries
const { Client, Intents } = require("discord.js");
const Database = require("simplest.db").JS0N;
const { token, guildId, activityResetTimeout } = require("./config.json");
const { I18n } = require('i18n');
const db = require("./scripts/firebase.js");

const role_db = new Database({ path: "./data/roles.json" });

const __ = (string, lang, options = undefined) => new I18n({
	locales: ['en', 'fr'],
	directory: './locales',
	syncFiles: true,
	retryInDefaultLocale: false,
}).__({phrase:string, locale:lang}, options);


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
	client.activityInterval = setInterval(() => {
		client.user.setActivity("all of you naughty people", {type: "WATCHING"});
	}, activityResetTimeout * 100);
	console.log("[+] Set activity to \"watching all of you naughty people\"");

	let commands = [];
	var normalizedPath = require("path").join(__dirname, "commands");

	require("fs").readdirSync(normalizedPath).forEach(function(file) {
		commands.push(require("./commands/" + file).command);
	});

	// Get dev guild ID for slash commands, comment to use global slash commands
	const guild = client.guilds.cache.get(guildId);
	if (typeof guild == "undefined") {
		client.application.commands.set(commands);
		console.log("[+] Set global commands");
	} else {
		guild.commands.set(commands);
		console.log("[+] Set guild commands");
	}

	// Set emojis
	module.exports.emojis = {
		deactivated: client.emojis.cache.get("933406960756346912"),
		activated: client.emojis.cache.get("933406961762963527")
	};
});

client.on('messageCreate', async (message) => {
	const language = (await db.getServerData(message.guild.id)).language;
	const msg = message.content;

	// Don't react to bots or DMs
	if (message.author.bot || message.channel.type === 'DM') return;
	if (!(await db.getServerData(message.guild.id)).muted) require("./scripts/responses").default(message, language);
	
	// Check if bot is asked to nuke a channek
	if (message.mentions.has(client.user)) {
		if (["nuke", "bomb", "strike", "hell", "rain"].some(v => msg.includes(v))) {
			require("./scripts/nuke").default(message, language);
		}
	}
 });

client.on("interactionCreate", async (interaction) => {
	const language = (await db.getServerData(interaction.guildId)).language;

	if (interaction.isCommand()) {
		const { commandName, options } = interaction;
		return require("./commands/" + commandName).default(interaction, language);
	}

	else if (interaction.isButton()) {
		switch (interaction.customId) {
			case "nuke_launch_confirm_button": {
				return require("./scripts/nuke").beginNuke(interaction, language);
			}

			case "clear-pings": {
				return require("./commands/roles").clearPingRoles(interaction, language);
			}
		}
	}
	else if (interaction.isSelectMenu()) {
		return require("./commands/roles").checkForRoleEvent(interaction, language);
	}
});

module.exports = {
	client: client,
	db: db,
	role_db: role_db,
	translate: __,
	emojis: {}
};

// Last line: login to the client
client.login(token);

/*
,,;;;;;;;:::::::::::ccccccccccccccllllllllllllllllllllllllllllllllllllllllllllllllllllllllcccccccccccccccc::::::::::;;;;
;;;;;;::::::::::ccccccccccccclllllllllllllllllllllllllllllllllloloolllllllllllllllllllllllllllllcccccccccccccc::::::::;;
;;;;:::::::::cccccccccccllllllllllllllllllllllllloolcccclooxxxxxdoooooooooooloollllllllllllllllllllllccccccccccc::::::::
;;::::::::cccccccccccllllllllllllllllllloooooooool:;,''',,;:coxxoc::clooooooooooooooolllllllllllllllllllccccccccccc:::::
;:::::::ccccccccclllllllllllllllllooooooooooooooc,.'..':cllc::ll:;;,',looooooooooooooooooooollllllllllllllllccccccccc:::
::::::cccccccclllllllllllllloooooooooooooooooooc,..,',llldkxdoododxx:'coooooooooooooooooooooooooolllllllllllllccccccccc:
::::ccccccccllllllllllllloooooooooooooooooooooc'..';:cc'.:dxxxxx:.:kxlldoooooooooooooooooooooooooooolllllllllllllccccccc
::cccccccclllllllllllloooooooooooooooooooooooo;. .;:ccllldkkOkdxxlodxxddddddddddddooooooooooooooooooooollllllllllllccccc
:ccccccclllllllllllooooooooooooooooooodddoddoo:..,cldxkO0KK0kxlloOKKK0xdddddddddddddddddooooooooooooooooooollllllllllccc
ccccccllllllllllooooooooooooooooooodddddddddddo;':cllodxkkOkkocldOKKK0kdddddddddddddddddddddoooooooooooooooooolllllllllc
ccccllllllllllooooooooooooooooddddddddddddddddo;,cccclooooooooodkO0OOOOxdddddddddddddddddddddddddoooooooooooooolllllllll
ccclllllllllooooooooooooooodddddddddddddddddddo;;ccllodkkkxxdxxkkkOOOOOxddddddddddddddddddddddddddddoooooooooooooollllll
clllllllllooooooooooooodddddddddddddddddddddddo;;cllloxO0KK0KKKXXXXNNX0kxxddddddddddddddddddddddddddddooooooooooooolllll
llllllllloooooooooooodddddddddddddddddddddddddd;,cllllodkO000KKXXXNNNNKkxxxxxxxxxxxdddddddddddddddddddddooooooooooooolll
llllllloooooooooooodddddddddddddddddddddddddddd;':lllllloodxxxkOO00KKK0kxxxxxxxxxxxxxxxdddddddddddddddddddooooooooooooll
lllllloooooooooooddddddddddddddddddddddddxxdddd;.'clooooooooooooddddxxkxxxxxxxxxxxxxxxxxxdddddddddddddddddddoooooooooooo
llllloooooooooooddddddddddddddddddddxxxxxxxddol,...;cooooddddddddooooodxxxxxxxxxxxxxxxxxxxxxxdddddddddddddddddoooooooooo
llllooooooooooddddddddddddddddddxdxxxdxxxxdl;,;.. ..',:cooddddddoooolldxxxxxxxxxxxxxxxxxxxxxxxxddddddddddddddddooooooooo
llloooooooooodddddddddddddddddddxxxxxxxxdl;'....  .......',;;::::::;;ldxkkkxxxxxxxxxxxxxxxxxxxxxxxdddddddddddddddooooooo
llooooooooooddddddddddddddddxxxxxxxxxdoc;'......  ......     ......'cddxOOOOOkkkxxxxxxxxxxxxxxxxxxxdddddddddddddddoooooo
loooooooooodddddddddddddddxdxxxxxddlc;,'...''.    ..'....       ...';lxkkOO0OOOOOOkkkxxxxxxxxxxxxxxxddddddddddddddoooooo
loooooooooddddddddddddddxxdddooolc;,......'',.   .........     .......cxkkkkkkkOOOOOOOOkkkxxxxxxxxxxxddddddddddddddooooo
ooooooooodddddddddddddddol::;;;;,,,'......'','. ..............',;;:c:';dxxkkkkkxxkkkkkkOOOOkkxxxxxxxxdddddddddddddddoooo
oooooooodddddddddddddddo:''''''''''''.......''...',.''...,,:ccldo:cl;,odddxxxxdddoooooddddddooddxxxxxxxdddddddddddddoooo
ooooooodddddddddddddddxl,....''....''........'..';c;::;cllll::ldclxl:ldddoddooolccccllllclc:;:cdxxxxxxxxddddddddddddoooo
oooooooddddddddddddddddl'....................'...,c;;ldxoddc:dOddkocldddoolllcc:cccccccccc:,,;:dxxxxxxxxxddddddddddddooo
ooooooddddddddddddddxdxl,.....................',.,c,,lddk0doxOdcdo:ldddddolc:::ccllccc:::;,,,,:dxxxxxxxxxxdddddddddddooo
oooooodddddddddddddxxdxo;.'...................',,::',do;oxokKklod:coddolllcc:;;:clllcc:;;'',,,:oxxxxxxxxxxddddddddddddoo
oooooddddddddddddddxxxxd:''....................',:;.;o:,c:;xOdoxl:loool;:lloolllolcccc:;'',,,,;oxxxxxxxxxxddddddddddddoo
oooooddddddddddddddxxxxd:'''.....''..''.........,:,.:c,:c';lclxd:clllc:;;;:ccll:ccccc:,'.',,,,;lxxxxxxxxxxdddddddddddddo
oooooddddddddddddxxxxxxo;'''......''''''........','.:l:lc,::':dlcclcccc:::::ccccc::::,..',,,;,,cxxxxxxxxxxdddddddddddddo
oooooddddddddddddxdxxxxl'''...   .',,,,'''.......,'.:oloc,c,.,::ccccccc:ccccccccccc:'...',,,;;,:dxxxxxxxxxdddddddddddddo
oooooddddddddddddxxxxxdc''''..    .,,,,,,''......''.:c;l:,;'..,;;;;cccccccccccccc::'. ..',,,;;,:dxxxxxxxxddddddddddddddo
oooooddddddddddddxxxxxxl'.'''.    ..''',,,,'......',:c,l:,;'.,;,',,:ccccccccc::::;,.  ..',,,,;,:dxxxxxdddddddddddddddddo
ooooodddddddddddddxxxxxo,...''.    ...',,,,,'......,cc;lc,,,,,,'',,;;::cc::::::::;.   ..',,,,;;cdxxxxxdddddddddddddddddo
ooooodddddddddddddddddxd:........    ..',,,,,''.....;;,:;.','''''',,,;;;;;;;;;;;;;'.  ..',,,,,;lxxxddddddddddddddddddddo
oooooddddddddddddddddxxxc'........    ..'',,,,''....',,c:''...''',,,,,,,,,,,,,,,,,'.  ..'''',,:oxdxdddddddddddddddddddoo
ooooodddddddddddddddddxdc'........    ...'',,'''''...':c;'...'',,,,,,,,,,,''''''..    ..'....':oxdddddddddddddddddddddoo
oooooodddddddddddddddddo;..........    ...'',,'''''........',,,,,,,,,,,,,,,'',,..     ..''....'cdddddddddddddddddddddooo
oooooddddddddddddddddddl..             ....''''''..'......',,,,,',,,,,,,,,'''''..     ...',,,'';ldddddddddddddddddddoooo
oooooodddddddddddddddddo;...          .,.....'''..........'..''''',,,,,,,,'''''...         ..,;coddddddddddddddddddooooo
oooooooddddddddddddddddd:.....        ;,...............''',,;,'..'',,,,;,;;;;,..         ...',;cddddddddddddddddddoooooo
ooooooodddddddddddddddddc...          .. ..............,c:;;:::;...''''''''''''...   .......,;:oddddddddddddddddddoooooo
ooooooodddddddddddddddddo;....          ...........''..,cl:,,,;::;,''...........      ...';;;;:odddddddddddddooooooooooo
oooooooddddddddddddddddddc'....         ....'.....'',,..cllc:;,,:cllllcclllc;;;,.  .......';;codddddddddddddoooooooooooo
oooooooodddddddddddddddddl,....         .........'',,'..;ccllc;,;;::::::::::::;'.......';;,,,cdddddddddddooooooooooooooo
loooooooodddddddddddddddddl,....        .........'',,'..':lllcc;;;::::::::::::;. .;:;,'.';;:lddddddddddddooooooooooooooo
loooooooooddddddddddddddddc,....          ........',;;'..,llcc:;,,,;:;;;,,;;;;'. .':c:,'.,coddddddddddddoooooooooooooooo
llooooooooodddddddddddddddo:'.....           .....',;,....;looc:,...''''',;:;'......,,''',cddddddddddddooooooooooooooool
lloooooooooodddddddddddddddl;.....   ..       ....',,.   ..;clddoc:::cccllc'...:l;..''',',lddddddddddoooooooooooooooooll
llloooooooooodddddddddddddddl;'...  ..'''..    ...''.  ......':oxxxxdddoc,....,cll:,',,,:ldddddddddoooooooooooooooooolll
lllllooooooooooddddddddddddddc;,'...',;;:c:,'..'''.............':loddol;.....'::;,;:,';;codddddddooooooooooooooooooollll
lllllloooooooooodddddddddddddo;','....''',;;;,,'.................',:cc:,';,.,::;,..,;,,coddddddoooooooooooooooooolllllll
llllllloooooooooooddddddddddddlc;''.......''........................';cloc;;::;;,'..'',cddddooooooooooooooooolllllllllll
lllllllllooooooooooooodddddddddddl;'..................................',;;,,,,,,,'....,ldoooooooooooooooooolllllllllllll
cclllllllloooooooooooooooodddddddo:'...........................................''.';ccloooooooooooooooooolllllllllllllll
cclllllllllooooooooooooooooooddddl,...............................................'cddoooooooooooooooollllllllllllllllcc
cccclllllllllloooooooooooooooooodc'..................    ........................';loooooooooooooooolllllllllllllllccccc
ccccccllllllllllooooooooooooooooo:...................   .........................';loooooooooooooolllllllllllllllccccccc
ccccccclllllllllllooooooooooooooo;..................   .;;.......................':oooooooooooolllllllllllllllllcccccccc
*/