module.exports.default = async (message) => {
	var msg = message.content.toLowerCase();

	if (msg.includes("hey") || msg.includes("yo") || msg.includes("hi") || msg.includes("wassup") || msg.includes("whats up") || msg.includes("what's up")) {
		var replies = [
			"Hey, what's up",
			"Hello, would you like gay jokes?\nActually, turns out \”no\” isn't an option",
			"***WHOMST HATH SUMMONED THE GREAT ONE***",
			`Good day to you!`,
			`Howdy!`,
			`How are you doing?`,
			`It's always a pleasure to see you!`,
		];
	}

	if (msg.includes("stfu") || msg.includes("shut")) {
		replies = [
			"No you shut the fuck up you fucking retard you look like someone stepped on your face",
			"Fucking stfu will you?",
			"just stop existing please",
			"Go fuck yourself",
			"You shut up you fucking donkey",
		];
	}

	message.channel.sendTyping();
	await new Promise(r => setTimeout(r, 1000));

	message.reply(replies[Math.floor(Math.random()*replies.length)]);
}