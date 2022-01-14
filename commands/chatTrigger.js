const triggers = require("../assets/triggers.json")

module.exports.default = async (message, triggerChance) => {
	var msg = message.content;

	// Automatically responds to messages if keywords match
	for (var trigger in triggers) {
		if (msg.toLowerCase().includes(trigger.toLowerCase())) {
			// Adds a chance for the bot to respond to messages
			if (Math.random() > triggerChance)
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