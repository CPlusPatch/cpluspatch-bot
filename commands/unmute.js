const { MessageEmbed, Constants, Permissions } = require("discord.js");

module.exports = {
	command: {
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
	},

	default: async (interaction, language) => {
		const { translate: __ } = require('../index');
		
		if (!interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return interaction.reply({content:"Hey chief, you can't do that, you gotta have the right perms to unmute people", ephemeral: true});
		const { options } = interaction;
		const userMuted = options.getUser("user");
		const memberToMute = interaction.guild.members.cache.get(userMuted.id);
		const embed = new MessageEmbed();

		try {
			await memberToMute.timeout(null);
			
			embed
				.setAuthor({
					name: memberToMute.user.tag,
					iconURL: await memberToMute.user.avatarURL(),
				})
				.setColor("#5ab14e")
				.setDescription(__("Welcome back <@!{{userId}}>, you've been unmuted!", language, {userId: userMuted.id}))
				.setFooter({
					text: `Unmuted by ${interaction.user.tag}`
				})
				.setTimestamp();

		}
		catch {
			embed
				.setColor("#df9c20")
				.setDescription(__("Bruh dawg I can't unmute this person, are they admin or something?", language));
		}
	
		interaction.reply({embeds: [embed]});
	}
};