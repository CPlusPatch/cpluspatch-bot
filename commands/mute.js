const ms = require("ms");
const { MessageEmbed, Constants, Permissions } = require("discord.js");

module.exports = {
	command: {
		name: "mute",
		description: "Mutes a user",
		options: [
			{
				name: "user",
				description: "The user to mute",
				required: true,
				type: Constants.ApplicationCommandOptionTypes.USER
			},
			{
				name: "length",
				description: "Length of mute",
				required: false,
				type: Constants.ApplicationCommandOptionTypes.STRING
			},
			{
				name: "reason",
				description: "Reason for mute",
				required: false,
				type: Constants.ApplicationCommandOptionTypes.STRING
			}
		]
	},

	default: async (interaction, language) => {
		const { translate: __ } = require('../index');

		if (!interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return interaction.reply({content:"Hey chief, you can't do that, you gotta have the right perms to mute people", ephemeral: true});
		const { options } = interaction;
		const userMuted = options.getUser("user");
		const length = options.getString("length", false) ?? "1h";
		const reason = options.getString("reason", false) ?? undefined;
		const memberToMute = interaction.guild.members.cache.get(userMuted.id);
		const embed = new MessageEmbed();

		const timeInMs = ms(length);
		if (!timeInMs) return interaction.reply({content:__("Please specify a valid time", language), ephemeral: true});

		try {
			await memberToMute.timeout(timeInMs, reason);
			
			embed
				.setAuthor({
					name: memberToMute.user.tag,
					iconURL: await memberToMute.user.avatarURL(),
				})
				.setColor("#bb0af5")
				.setDescription(__("Get trolled bozo, you've been muted for `{{length}}`!\n", language, {length: length}))
				.setFooter({
					text: `Muted by ${interaction.user.tag}`
				})
				.setTimestamp();

		}
		catch (e) {
			embed
				.setColor("#df9c20")
				.setDescription(__("Bruh dawg I can't unmute this person, are they admin or something?", language));
		}
		return interaction.reply({ embeds: [embed] });
	}
};