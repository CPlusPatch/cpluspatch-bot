const { Client, Intents, MessageEmbed } = require("discord.js");
const config = require("./config.json");
const { meme } = require('memejs');
const triggers = require("./assets/triggers.json")

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once("ready", () => {
	console.log("CPlusPatch is online!");
	client.user.setActivity("cpluspatch.com", {type: "WATCHING"});
});

async function getRandomFromSubreddits(subreddits, title, channel) {
	const random = subreddits[Math.floor(Math.random() * subreddits.length)];

	var img = await randomPuppy(random);
	// Check if the img is an mp4, retry if it is one (we want a GIF or an image, not a video)
	while (img.includes(".mp4")) {
		img = await randomPuppy(random);
	}

	const embed = new MessageEmbed()
		.setColor("RANDOM")
		.setImage(img)
		.setTitle(title)
		.setURL(`https://reddit.com/r/${random}`)
	channel.send({embeds: [embed]});
}

client.on('messageCreate', async (message) => {
	var msg = message.content;

	var triggerChance = 1;
	
	// We don't want to respond to ourselves do we?
	if (message.author.bot) return;

	// Automatically responds to messages if keywords match
	for (var trigger in triggers) {
		if (msg.toLowerCase().includes(trigger.toLowerCase())) {
			// Adds a chance for the bot to respond to messages
			if (Math.random() > triggerChance) return;
			// We begin typing to add a more realistic bot
			message.channel.sendTyping();
			// Waits 2s
			await new Promise(r => setTimeout(r, 2000));

			if (typeof triggers[trigger] == "string") {
				message.reply(triggers[trigger]);
				return;
			}
			if (Array.isArray(triggers[trigger])) {
				// Returns random string from array
				var selectedReply = triggers[trigger][Math.floor(Math.random()*triggers[trigger].length)];
				message.reply(selectedReply);
				return;
			}
		}
	}

	if (message.mentions.has(client.user)) {
		var replies = [
			"Ayo, I'm CPlusPatch's twin, how you doing?",
			"Hey, what's up",
			"If you want to have some gay jokes then here I am",
			"***WHOMST HATH SUMMONED THE GREAT ONE***",
			`Good day to you!`,
			`Howdy!`,
			`How are you doing?`,
			`It's always a pleasure to see you!`,
		];

		message.channel.sendTyping();
		await new Promise(r => setTimeout(r, 1000));

		message.reply(replies[Math.floor(Math.random()*replies.length)]);
	}

	if (msg.toLowerCase().includes("meme")) {
		message.channel.sendTyping();
		var retryCount = 0;
		const getMemes = async () => {
			meme()
				.then((meme) => {
					const embed = new MessageEmbed()
						.setColor("RANDOM")
						.setImage(meme.url)
						.setTitle(meme.title)
						.setURL(`https://reddit.com/r/${meme.subreddit}`)
					
					message.channel.send({embeds: [embed]});
				})
				.catch(() => {
					if (retryCount < 5) {
						retryCount++
						getMemes()
					}
					else {
						message.channel.send("Try that again for me honey I'm having trouble getting your dank");
					}
				});
		}
		getMemes();
	}

	if (msg.toLowerCase().includes("cringe")) {
		message.channel.sendTyping();
		var retryCount = 0;
		const getCringe = async () => {
			meme("Cringetopia")
				.then((meme) => {
					const embed = new MessageEmbed()
						.setColor("RANDOM")
						.setImage(meme.url)
						.setTitle(meme.title)
						.setURL(`https://reddit.com/r/${meme.subreddit}`)
					
					message.channel.send({embeds: [embed]});
				})
				.catch(() => {
					if (retryCount < 5) {
						retryCount++
						getCringe()
					}
					else {
						message.channel.send("Try that again for me honey I'm having trouble getting your cringe");
					}
				});
		}
		getCringe();
	}
 });
// Last line
client.login(config.token);