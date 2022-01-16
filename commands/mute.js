const ms = require("ms");
const { MessageEmbed } = require("discord.js");


module.exports.default = async (interaction, options) => {
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

	const embed = new MessageEmbed()
			.setColor("0xe11e2b")
			.setTitle(`Muted ${userMuted.username} for ${length}`)
			.setDescription(`💢 ${userMuted.username} has been muted for **${length}**`)

	interaction.reply({embeds: [embed]});
};