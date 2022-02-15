const memejs = require("meme-fetcher").default;
const { MessageEmbed } = require("discord.js");

module.exports = {
	command: {
		name: "meme",
		description: "Sends a dank (actually probably terrible) meme to chat",
		options: []
	},

	default: async (interaction, lang) => {
		do {
			try {
				image = await memejs({ type: "meme", addSubs: [
					"shitposting"
				 ] });
			} catch {}
		} while (typeof image == "undefined" || typeof image.title != "string" || image.url.includes("v.redd"));

		const embed = new MessageEmbed()
			.setColor("RANDOM")
			.setImage(image.url)
			.setTitle(image.title)
			.setURL(image.url);
		
		interaction.reply({embeds: [embed]});
	}
}