// Command to ban a member from the server, with a reason.
const ms = require("ms");
const { MessageEmbed, Constants, Permissions } = require("discord.js");

module.exports = {
	command: {
		name: "ban",
		description: "Bans a user",
		options: [
			{
				name: "user",
				description: "The user to ban",
				required: true,
				type: Constants.ApplicationCommandOptionTypes.USER
			},
			{
				name: "reason",
				description: "Reason for ban",
				required: false,
				type: Constants.ApplicationCommandOptionTypes.STRING
			}
		]
	},

	default: async (interaction, language) => {
		const { translate: __ } = require('../index');

		if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return interaction.reply({content:"Hey chief, you can't do that, you gotta have the right perms to ban people", ephemeral: true});
		const { options } = interaction;
		const userBanned = options.getUser("user");
		const memberToBan = interaction.guild.members.cache.get(userBanned.id);
		const embed = new MessageEmbed();
		const reason = options.getString("reason", false) ?? undefined;

		try {
			await memberToBan.ban({reason: "Banned by " + interaction.user.tag + " for: "  + (reason ?? "no reason given")});
			embed
				.setAuthor({
					name: memberToBan.user.tag,
					iconURL: await memberToBan.user.avatarURL(),
				})
				.setColor("#bb0af5")
				.setDescription(__("Get trolled bozo, you've been banned!\nReason: `{{reason}}`", language, {reason: reason ?? "none given"}))
				.setFooter({
					text: `Banned by ${interaction.user.tag}`
				})
				.setTimestamp();
			
		}
		catch (e) {
			embed
				.setAuthor({
					name: memberToBan.user.tag,
					iconURL: await memberToBan.user.avatarURL(),
				})
				.setColor("#bb0af5")
				.setDescription(__("Bruh, can't ban this person, move up my role or something", language))
				.setFooter({
					text: `Banned by ${interaction.user.tag}`
				})
				.setTimestamp();
			console.log(e);
		}

		interaction.reply({ embeds: [embed] });
	}
};