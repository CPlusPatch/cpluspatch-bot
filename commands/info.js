const { Constants, MessageEmbed } = require("discord.js");

module.exports = {
	command: {
		name: "info",
		description: "Prints out bot info",
		options: []
	},

	default: async (interaction, lang) => {
		const embed = new MessageEmbed()
			.setColor("RANDOM")
			.setTitle("Info")
			.setDescription(`
			Version:    ${require("../package.json").version}
			©️ 2022      **${require("../package.json").author}**
			My github:  https://github.com/CPlusPatch`);

		interaction.reply({embeds: [embed]});
	}
};
