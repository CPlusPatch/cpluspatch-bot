const nukeChannel = require('./nuke').default;

module.exports.default = async (message, language) => {
	var msg = message.content.toLowerCase();

	if (["hey", "yo", "hi", "wassup", "whats up", "what's up", "waddup", "you doing", "it going"].some(v => msg.includes(v)) && message.author.id !== "779660899081519115") {
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

	if (["stfu", "shut", "fuck you", "go fuck yourself"].some(v => msg.includes(v))) {
		var replies = [
			"No you shut the fuck up you fucking retard you look like someone stepped on your face",
			"Fucking stfu will you?",
			"just stop existing please",
			"Go fuck yourself",
			"You shut up you fucking donkey",
			"https://c.tenor.com/qZDvDAaCRXQAAAAM/dont-care-didnt-ask.gif"
		];
	}

	if (["didn't ask", "who asked"].some(v => msg.includes(v))) {
		var replies = [
			"https://c.tenor.com/qZDvDAaCRXQAAAAM/dont-care-didnt-ask.gif",
		];
	}


	if (["strike", "nuke", "missile"].some(v => msg.includes(v))) {
		nukeChannel(message, language);
		return;
	}

	if (typeof replies !== "undefined") { 
		message.channel.sendTyping();
		await new Promise(r => setTimeout(r, 1000));

		message.reply(replies[Math.floor(Math.random()*replies.length)]);
	}
}