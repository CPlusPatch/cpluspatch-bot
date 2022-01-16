const ms = require("ms");
const { MessageEmbed, Constants, Permissions } = require("discord.js");

module.exports.command = {
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
};

module.exports.default = async (interaction, options) => {
	var embed = new MessageEmbed()
		.setColor("0xe11e2b")
		.setTitle(`You do not have permission to perform this action`);

	if (interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) {
		const userMuted = options.getUser("user");
		const length = options.getString("length", false) ?? "1w";
		const reason = options.getString("reason", false) ?? undefined;
		const memberToMute = interaction.guild.members.cache.get(userMuted.id);

		const timeInMs = ms(length);
		if (!timeInMs) {
			interaction.reply({content:"Please specify a valid time"});
			return;
		}
		await memberToMute.timeout(timeInMs, reason);

		embed = new MessageEmbed()
			.setColor("0xe11e2b")
			.setTitle(`Muted ${userMuted.username} for ${length}`)
			.setDescription(`💢 ${userMuted.username} has been muted for **${length}**`);
	}

	interaction.reply({embeds: [embed]});
};