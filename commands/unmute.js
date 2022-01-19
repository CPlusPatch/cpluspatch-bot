const { MessageEmbed, Constants, Permissions } = require("discord.js");
const path = require('path');
const { I18n } = require('i18n');

const i18n = new I18n({
  locales: ['en', 'fr'],
  directory: path.join(__dirname, '../locales')
})
const __ = (string, lang, options = undefined) => {
	return i18n.__({phrase:string, locale:lang}, options)
}

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

module.exports.default = async (interaction, options, language) => {
	var embed = new MessageEmbed()
		.setColor("0xe11e2b")
		.setTitle(__(`You do not have permission to perform this action`, language));

	if (interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) {
		const userMuted = options.getUser("user");
		const memberToMute = interaction.guild.members.cache.get(userMuted.id);

		try {
			await memberToMute.timeout(null);

			embed = new MessageEmbed()
					.setColor("0x2ad44c")
					.setTitle(__("Unmuted {{username}}", language, {username: userMuted.username}))
					.setDescription(__(`✅ {{username}} has been unmuted`, language, {username: userMuted.username}));
		}
		catch {
			embed = new MessageEmbed()
				.setColor("0xe11e2b")
				.setTitle(__(`I can't seem to mute this person, maybe I'm don't have the perms for that 🤷🏻`, language));
		}
	}

	interaction.reply({embeds: [embed]});
};