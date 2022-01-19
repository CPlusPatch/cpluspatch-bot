module.exports.default = async (message, language) => {
	const triggers = require(`../locales/${language}_triggers.json`);
	var msg = message.content;

	// Automatically responds to messages if keywords match
	for (var trigger in triggers) {
		if (msg.toLowerCase().includes(trigger.toLowerCase())) {
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