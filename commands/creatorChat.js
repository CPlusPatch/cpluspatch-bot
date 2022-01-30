module.exports.default = async (message, language) => {
	var msg = message.content.toLowerCase();
	if (["hey", "yo", "hi"].some(v => msg.includes(v))) {
		var replies = [
			"Yooo cplus wassup man",
			"Yooo new status?",
			"hey bro how's it going"
		];
	}

	if (["wassup", "whats up", "what's up", "waddup", "you doing", "it going"].some(v => msg.includes(v))) {
		var replies = [
			"Eyyy cplus I'm good, wassup on your side man?",
			"Hey cplus, I'm good! You're looking fine as hell today my man!",
			"My god it's my bro cpp, how YOU doing today?",
			"hey bro how's it going (am good)",
			"i think i'm depressed lmao"
		];
	}

	if (["among", "amogus"].some(v => msg.includes(v))) {
		var replies = [
			"sus",
			"sus",
			"sus",
			"sus (extra edition)"
		];
	}

	if (["friend", "fren"].some(v => msg.includes(v))) {
		var replies = [
			"Who needs friends when you have cpp",
			"fr cpp is my bff",
			"yeah bro you're my best friend",
			"sus (extra edition)"
		];
	}

	if (typeof replies !== "undefined") { 
		message.channel.sendTyping();
		await new Promise(r => setTimeout(r, 1000));

		message.reply(replies[Math.floor(Math.random()*replies.length)]);
	}
}