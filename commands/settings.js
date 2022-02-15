const { MessageEmbed, Constants, Permissions } = require("discord.js");

module.exports = {
	command: {
		name: "settings",
		description: "Settings for the application",
		options: [
			{
				name: "language",
				description: "Language settings",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP,
				options: [
					{
						name: "set",
						description: "Changes the default language",
						type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
						options: [
							{
								name: "lang",
								description: "Language to change to",
								required: true,
								type: Constants.ApplicationCommandOptionTypes.STRING,
								choices: [
									{
										name: "english",
										value: "en",	
									},
									{
										name: "french",
										value: "fr",	
									},
								]
							}
						]
					},
					{
						name: "current",
						description: "See the current language",
						type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
						options: []
					}
				]
			}
		]
	},

	default: (interaction, lang) => {
		const { lang_db, translate: __ } = require('../index');

		switch(interaction.options.getSubcommandGroup()) {
			case "language": {
				switch(interaction.options.getSubcommand()) {
					case "set": {
						if(interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
							var newLanguage = interaction.options.getString("lang");
							lang_db.set(`lang_${interaction.guildId}`, newLanguage);
							const embed = new MessageEmbed()
								.setTitle("Language")
								.setColor(0x00AE86)
								.setDescription(__("Successfully set language to `{{newLanguage}}`!", newLanguage, {newLanguage: newLanguage}));
							
							return interaction.reply({ embeds: [embed] });
						}
						interaction.reply({
							content: __("You need Manage Server permissions to do this, stupid", lang),
							ephemeral: true
						});
					}
					case "current": {
						const embed = new MessageEmbed()
							.setTitle("Language")
							.setColor(0x00AE86)
							.setDescription(__("Current language is set to `{{currentLang}}`", lang, {currentLang: lang}));
						
						interaction.reply({ embeds: [embed] });
					}
				}
			}
		}
	},

	getLanguageForGuild: (guildId) => {
		const { lang_db } = require('../index');
		return lang_db.get(`lang_${guildId}`) ?? "en";
	}
}