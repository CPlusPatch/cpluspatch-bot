const { MessageEmbed, Constants } = require("discord.js");

module.exports = {
	command: {
		name: "fard",
		description: "fard comman",
		options: [
			{
				name: "fard",
				description: "fard conten",
				required: true,
				type: Constants.ApplicationCommandOptionTypes.STRING
			},
		]
	},

	default: async (interaction, lang) =>{
		const { client, __ } = require('../index');
		if(interaction.member.id != "779660899081519115") return interaction.reply({ content: __("fard", lang), ephemeral: true });

		// Sends the fard parameter in chat
		await interaction.reply({ content: "fard sent", ephemeral: true });
		interaction.channel.send(interaction.options.getString("fard"));
	}
};