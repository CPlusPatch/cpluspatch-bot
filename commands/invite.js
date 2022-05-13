// Sends bot invite link
const { Constants, MessageEmbed } = require("discord.js");

module.exports = {
	command: {
		name: "invite",
		description: "Sends bot invite link",
		options: []
	},

	default: async (interaction, lang) => {
		const embed = new MessageEmbed()
			.setColor("RANDOM")
			.setTitle("Invite")
			.setDescription(`Invite me to your server: https://cpluspatch.com/discord`);

		interaction.reply({embeds: [embed]});
	}
};
