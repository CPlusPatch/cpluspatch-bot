/*
 _       __________ 
| |     / /  _/ __ \
| | /| / // // /_/ /
| |/ |/ // // ____/ 
|__/|__/___/_/      
                    
This is a WIP thing that does nothing yet.
*/
const chatTrigger = require("./commands/chatTrigger").default;
const reactToMentions = require("./commands/reactToMentions").default;
const getRandomFromSubreddit = require("./commands/reddit").default;
const triggers = require("./assets/triggers.json")

class CPlusPatchBot {
	constructor(client, config) {
		this.chatTriggerChance = 1.0;
	}

	async reactToMentions(message) {
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

	async reactToChat(message) {
		var msg = message.content;

		// Automatically responds to messages if keywords match
		for (var trigger in triggers) {
			if (msg.toLowerCase().includes(trigger.toLowerCase())) {
				// Adds a chance for the bot to respond to messages
				if (Math.random() > this.chatTriggerChance)
					return;
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
					var selectedReply = triggers[trigger][Math.floor(Math.random() * triggers[trigger].length)];
					message.reply(selectedReply);
					return;
				}
			}
		}
	}
}

module.exports.defaults = CPlusPatchBot;