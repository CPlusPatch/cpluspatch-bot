const ms = require("ms");
const { MessageEmbed, Constants, Permissions } = require("discord.js");

module.exports.command = {
	name: "unmute",
	description: "Unmutes a user",
	options: [
		{
			name: "user",
			description: "The user to unmute",
			required: true,
			type: Constants.ApplicationCommandOptionTypes.USER
		},
	]
};

module.exports.default = async (interaction, options) => {
	var embed = new MessageEmbed()
		.setColor("0xe11e2b")
		.setTitle(`You do not have permission to perform this action`);

	if (interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) {
		const userMuted = options.getUser("user");
		const memberToMute = interaction.guild.members.cache.get(userMuted.id);

		try {
			await memberToMute.timeout(null);

			embed = new MessageEmbed()
					.setColor("0x2ad44c")
					.setTitle(`Unmuted ${userMuted.username}`)
					.setDescription(`✅ ${userMuted.username} has been unmuted`);
		}
		catch {
			embed = new MessageEmbed()
				.setColor("0xe11e2b")
				.setTitle(`I can't seem to mute this person, maybe I'm don't have the perms for that 🤷🏻`);
		}
	}

	interaction.reply({embeds: [embed]});
};