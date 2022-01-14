const getMeme = require("meme-fetcher").default;
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

function getRandomFromSubreddit(subreddit) {
	/* return new Promise((resolve, reject) => {
		get(subreddit)
			.then((image) => {
				resolve(image);
			})
			.catch(() => {
				reject("Could not get image from reddit");
			});
	}); */
	
}

module.exports.getRandomFromSubreddit = getRandomFromSubreddit;
module.exports.getRandomFromSubreddits = getRandomFromSubreddits;