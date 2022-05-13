const { MessageEmbed, Constants } = require("discord.js");

var cooldowns = [];
module.exports = {
	command: {
		name: "monke",
		description: "Spams the word \"monke\" in chat",
		options: [
			{
				name: "times",
				description: "Number of times to spam",
				required: true,
				type: Constants.ApplicationCommandOptionTypes.INTEGER
			}
		]
	},
	default: async (interaction, language) => {
		// Return if user is in cooldown array
		if (cooldowns.includes(interaction.user.id)) {
			return interaction.reply({embeds:[
				new MessageEmbed()
					.setColor("#0099ff")
					.setTitle("Monke")
					.setDescription(`${interaction.user.username} is on cooldown!`)
			]});
		}
		// Add user to cooldown array
		cooldowns.push(interaction.user.id);
		// Set timeout for cooldown
		setTimeout(() => {
			// Remove user from cooldown array
			cooldowns.splice(cooldowns.indexOf(interaction.user.id), 1);
		}, 1000 * 60 * 3);

		const { translate: __ } = require('../index');
		const { options } = interaction;
		const times = options.getInteger("times");
		if (times > 15) return interaction.reply(__("i refuse to send more than fifteen (15) monke", language));
		const embed = new MessageEmbed()
			.setAuthor({
				name: interaction.user.tag,
				iconURL: await interaction.user.avatarURL(),
			})
			.setColor("#bb0af5")
			.setDescription(__("Spamming the word \"monke\" in chat {{times}} times", language, {times: times}))
			.setFooter({
				text: `Spammed by ${interaction.user.tag}`
			})
			.setTimestamp();
		
		await interaction.reply({embeds:[embed]});
		for (let i = 0; i < times; i++) {
			await interaction.channel.send("MONKE");
		}
	}
};

