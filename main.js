const { Client, Intents } = require("discord.js");
const config = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once("ready", () => {
	console.log("CPlusPatch is online!");
});

client.on('messageCreate', (message) => {
	var msg = message.content;

	var triggers = {
		"Hello there": "General Kenobi!",
		"stfu": "no you shut the fuck up bro",
		"rick": "*aggressively doesn't give you up, doesn't let you down*",
		"hog": "***HOG RIIIIIDEEEEEERR***",
		"tiktok": "Ugh, TikTok \\*dies from cringe\\*",
		"jesus": "Always remember Jesus died for your sins, so you'd better sin or else it means he died in vain",
		"putin": "Better be Putin deez nuts in ya mouth don't you think?",
		"imagine dragons": "Imagine drag-ging deez nuts in your mouth tho...",
		"fart": "fard momen :cold_face: :cold_face: :cold_face:",
		"fard": "fard momen :cold_face: :cold_face: :cold_face:",
		"munism": "LONG LIVE MOTHER RUSSIA",
		"credit": ":flag_cn: +99999 SOCIAL CREDITS :flag_cn:",
		"chilling": ":flag_cn: +99999 SOCIAL CREDITS :flag_cn:",
		"xina": ":flag_cn: +99999 SOCIAL CREDITS :flag_cn:",
		"korea": "I hate kpop lmao"
	};
	
	if (message.author.bot) return;
	
	for (var trigger in triggers) {
		if (msg.toLowerCase().includes(trigger.toLowerCase())) {
			message.channel.send(triggers[trigger]);
		}
	}
 });
// Last line
client.login(config.token);