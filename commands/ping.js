const { MessageEmbed, Constants } = require("discord.js");

module.exports.command = {
	name: "ping",
	description: "Replies with pong",
};

module.exports.default = async (interaction, options) => {
	interaction.reply({
		content: "Pong!",
		ephemeral: true
	});
};