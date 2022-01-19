const ms = require("ms");
const { MessageEmbed, Constants, Permissions } = require("discord.js");
const path = require('path');
const { I18n } = require('i18n');

const i18n = new I18n({
  locales: ['en', 'fr'],
  directory: path.join(__dirname, '../locales')
})
const __ = (string, lang, options = undefined) => {
	return i18n.__({phrase:string, locale:lang}, options);
}

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

module.exports.default = async (interaction, options, language) => {
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
			interaction.reply({content:__("Please specify a valid time", language)});
			return;
		}
		try {
			await memberToMute.timeout(timeInMs, reason);

			embed = new MessageEmbed()
				.setColor("0xe11e2b")
				.setTitle(__(`Muted {{name}} for {{length}}`, language, {name: userMuted.username, length: length}))
				.setDescription(__(`💢{{name}} has been muted for **{{length}}**`, language, {name: userMuted.username, length: length}));
		}
		catch {
			embed = new MessageEmbed()
				.setColor("0xe11e2b")
				.setTitle(`I can't seem to mute this person, maybe I'm don't have the perms for that 🤷🏻`);
		}
	}

	interaction.reply({embeds: [embed]});
};