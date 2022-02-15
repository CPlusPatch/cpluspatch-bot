const { MessageEmbed, Constants } = require("discord.js");

module.exports = {
	command: {
		name: "ping",
		description: "Gives info about latency and connection",
	},

	default: async (interaction, options) => {
		const { client } = require('../index');

		await interaction.reply({ content: `Pinging...` }).then(async () => {
			const ping = Date.now() - interaction.createdAt;
			const api_ping = client.ws.ping;

			await interaction.editReply({
				content: "\u200B",
				embeds: [
					new MessageEmbed()
						.setColor('#04d384')
						.setTitle('Ping')
						.setDescription(`Roundtrip latency is ${ping}ms \nAPI Latency is ${Math.round(api_ping)}ms`)
				]
			});
		});
}
}