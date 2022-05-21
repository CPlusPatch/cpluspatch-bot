module.exports.default = async (message, language) => {
	const triggers = require(`../locales/${language}_triggers.json`);
	let msg = message.content;
	var messages = [];

	// Automatically responds to messages if keywords match
	for (var trigger in triggers) {
		// Has a 30% chance of respnding to a trigger
		if (msg.toLowerCase().includes(trigger.toLowerCase()) && Math.random() < 0.3) {
			// We begin typing to add a more realistic bot
			message.channel.sendTyping();
			// Waits 2s
			await new Promise(r => setTimeout(r, 2000));

			if (typeof triggers[trigger] == "string") reply = triggers[trigger];

			if (Array.isArray(triggers[trigger])) reply = triggers[trigger][Math.floor(Math.random() * triggers[trigger].length)];

			// Split selected reply into chunks of 1800 characters
			const chunks = require('chunk-text')(reply, 1800);
			for (let chunk in chunks) {
				// Send each chunk
				await messages.push(await message.channel.send(chunks[chunk]));
			}
		}
	}
	if (messages.length > 0) {
		messages[messages.length - 1].react("❌");

		const filter = (reaction, user) => reaction.emoji.name === '❌' && user.id !== message.client.user.id;
		const collector = messages[messages.length - 1].createReactionCollector({filter, time: 30000 });
		collector.on('collect', r => {
			// Delete the message chunks
			for (let message in messages) {
				messages[message].delete();
			}
		});
	}
	// Deletes message if someone reacts with a reaction

};