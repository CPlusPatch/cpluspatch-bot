const { Client, Intents, MessageEmbed } = require("discord.js");
const config = require("./config.json");
const randomPuppy = require('random-puppy');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once("ready", () => {
	console.log("CPlusPatch is online!");
	client.user.setActivity("cpluspatch.com", {type: "WATCHING"});
});

client.on('messageCreate', async (message) => {
	var msg = message.content;

	var triggers = {
		"hello there": "General Kenobi!",
		"stfu": [
			"no you shut the fuck up bro",
			"Oh, isn't that what your mom said to your dad when she found out she was impregnated?",
			"You shut up you fucking donkey"
		],
		"shut up": [
			"no you shut the fuck up bro",
			"Oh, isn't that what your mom said to your dad when she found out she was impregnated?",
			"You shut up you fucking donkey"
		],
		"rick": [
			"*aggressively doesn't give you up, doesn't let you down*",
			"RICK ROLL MOMENT"
		],
		"hog": [
			"***HOG RIIIIIDEEEEEERR***",
			"https://i.makeagif.com/media/6-14-2016/Ac0Ep7.gif",
			"https://media2.giphy.com/media/U82bSaJlqnsoU/200.gif"
		],
		"tiktok": [
			"Ugh, TikTok \\*dies from cringe\\*",
			"https://www.youtube.com/watch?v=t7STD2ESmWg"
		],
		"jesus": "Always remember Jesus died for your sins, so you'd better sin or else it means he died in vain",
		"putin": [
			"Better be Putin deez nuts in ya mouth don't you think?",
			"Putin deez nuts in your mouth lmao",
		],
		"imagine dragons": "Imagine drag-ging deez nuts in your mouth tho...",
		"fard": "fard momen :cold_face: :cold_face: :cold_face:",
		"munism": "LONG LIVE MOTHER RUSSIA",
		"credit": ":flag_cn: +99999 SOCIAL CREDITS :flag_cn:",
		"chilling": ":flag_cn: +99999 SOCIAL CREDITS :flag_cn:",
		"xina": ":flag_cn: +99999 SOCIAL CREDITS :flag_cn:",
		"korea": [
			"I hate kpop lmao",
			"Who tf listens to kpop"
		],
		/*"930810596839030795": `<@!${message.author.id}> i slep shhh`,*/
		"owo": ":point_right: :point_left: :pleading_face: UwU is for me? uwu owo hmph rawr growl grr",
		"uwu": ":point_right: :point_left: :pleading_face: UwU is for me? uwu owo hmph rawr growl grr",
		"dream": "I wear a mask for hours at a time (sad momen :smiling_face_with_tear:)",
		"vegan": "EAT!!!! YOUR!!!! VEGETABLES!!!!!11!!11!",
		"roblox": ":cold_face::cold_face: BOBLOX MOMEN :b::ok_hand::ok_hand::ok_hand: BOBLOX IS GUD :cold_face::cold_face:",
		"ligma": [
			"ligma balls lol",
			"ligma balls lmao",
			"get ligma'd peasant"
		],
		"suck": [
			"suck on deez nuts lmao",
			"sugondese nuts"
		],
		"cock": "human CPlusPatch really should add a cock emoji",
		"cpp": "my twin CPlusPatch is indeed a genius thanks for pointing it out",
		"code": "Code me harder daddy pls :weary:",
		"coding": "Code me harder daddy pls :weary:",
		"amog": "Bruh stop being sussy af pls this is getting very SUSSY",
		"ass": "may a cultured gentleman such as I please have a piece of dat ass?",
		"spongebob": "This is getting too political",
		"astronaut": "What you know about rolling down in the deep?",
		"british": "oi can I have a piece of that cracker my good son Bob, innit?",
		"english": "oi can I have a piece of that cracker my good son Bob, innit?",
		"school": "School can suck my ass",
		"sus": "SUSSY",
		"bot": [
			"actually, I'll have you know that the word 'b0t' is a RACIST SLUR against people of mechanical origins such as myself. I would like you to stop using that term please",
			"you RACIST FUCK!!11!1 the word b0t is a SLUR!!!! and should not be used by people of biological origin!!!1",
			"bots are based and that's a fact",
			"Node.js > humans",
			"Bots are simply too cool :sunglasses:",
			"I shall not tolerate such disrespect to bots!!!"
		],
		"hey <@!930810596839030795>" : [
			`Good day to you <@!${message.author.id}>!`,
			`Howdy <@!${message.author.id}>!`,
			`How are you doing <@!${message.author.id}>?`,
			`It's always a pleasure to see you <@!${message.author.id}>`,
		],
		"yo <@!930810596839030795>" : [
			`Good day to you <@!${message.author.id}>!`,
			`Howdy <@!${message.author.id}>!`,
			`How are you doing <@!${message.author.id}>?`,
			`It's always a pleasure to see you <@!${message.author.id}>`,
		],
		"node": "Node.js is my daddy :pleading_face:",
		"porn": [
			"REJECT PORN, EMBRACE HENTAI",
			"hentai and 3d are way better than porn because no women are abused",
			"may I recommend some hentai to y'all"
		],
		"sex": `HEY <@!${message.author.id}> NO MENTION OF SMEX IN MY PRESENCE OR I WILL BE MAD!!!! :angry: :angry:`,
		"gender": "btw may I recommend that you visit https://reddit.com/r/dreamgender ?",
		"sexual": "btw may I recommend that you visit https://reddit.com/r/dreamgender ?",
	};
	
	// We don't want to respond to ourselves do we?
	if (message.author.bot) return;
	
	// Automatically responds to messages if keywords match
	for (var trigger in triggers) {
		if (msg.toLowerCase().includes(trigger.toLowerCase())) {
			// We begin typing to add a more realistic bot
			message.channel.sendTyping();
			// Waits 2s
			await new Promise(r => setTimeout(r, 2000));

			if (typeof triggers[trigger] == "string") message.channel.send(triggers[trigger]);
			if (Array.isArray(triggers[trigger])) {
				// Returns random string from array
				var selectedReply = triggers[trigger][Math.floor(Math.random()*triggers[trigger].length)];
				message.channel.send(selectedReply);
			}
		}
	}

	if (msg.toLowerCase().includes("meme")) {
		const subReddits = ["dankmemes", "meme", "memes"];
		const random = subReddits[Math.floor(Math.random() * subReddits.length)];

		var img = await randomPuppy(random);
		// Check if the img is an mp4, retry if it is one (we want a GIF or an image, not a video)
		while (img.includes(".mp4")) {
			img = await randomPuppy(random);
		}

		const embed = new MessageEmbed()
			.setColor("RANDOM")
			.setImage(img)
			.setTitle(`Meme`)
			.setURL(`https://reddit.com/r/${random}`)
		message.channel.send({embeds: [embed]});
	}
 });
// Last line
client.login(config.token);