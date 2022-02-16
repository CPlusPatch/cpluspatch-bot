const { MessageEmbed, Constants, Permissions } = require("discord.js");
const ms = require("ms");

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
			},
			{
				name: "responses",
				description: "Random message response settings",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP,
				options: [
					{
						name: "toggle",
						description: "Toggles random message responses",
						type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
						options: [
							{
								name: "enabled",
								description: "Whether responses should be sent",
								required: true,
								type: Constants.ApplicationCommandOptionTypes.BOOLEAN
							}
						]
					},
					{
						name: "disablefor",
						description: "Temporarily disables random responses for some time",
						type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
						options: [
							{
								name: "time",
								description: "Time to suspend responses for",
								required: true,
								type: Constants.ApplicationCommandOptionTypes.STRING
							}
						]
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
			case "responses": {
				const { mute_db, emojis } = require("../index.js");
				if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({ content: __("You need Manage Server permissions to do this, stupid", lang), ephemeral: true });
				switch(interaction.options.getSubcommand()) {
					case "toggle": {
						const enabled = interaction.options.getBoolean("enabled");

						mute_db.set(`mute_${interaction.guild.id}`, !enabled);
						const embed = new MessageEmbed()
							.setTitle("Responses")
							.setColor(enabled ? "#00AE86" : "#6d05fa")
							.setDescription(`${enabled ? emojis.activated : emojis.deactivated} Responses have been successfully ${enabled ? "enabled" : "disabled"}`);
						return interaction.reply({embeds:[embed]});
					}
					case "disablefor": {
						const time = ms(interaction.options.getString("time") ?? "1s");
						if (!time) return interaction.reply({content:__("Please specify a valid time", language), ephemeral: true});
						mute_db.set(`mute_${interaction.guild.id}`, true);
						setTimeout(() => {
							mute_db.set(`mute_${interaction.guild.id}`, false);
						}, time);
						const embed = new MessageEmbed()
							.setTitle("Responses")
							.setColor("#6d05fa")
							.setDescription(`${emojis.deactivated} Responses will be disabled for \`${interaction.options.getString("time")}\``);
						return interaction.reply({embeds:[embed]});
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