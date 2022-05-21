const { MessageEmbed, Constants, Permissions } = require("discord.js");
const ms = require("ms");
const { activityResetTimeout } = require("../config.json");

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
			},
			{
				name: "status",
				description: "Change the status of the bot",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP,
				options: [
					{
						name: "set",
						description: "Set the status of the bot to a string",
						type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
						options: [
							{
								name: "type",
								description: "What kind of activity to set in the status",
								required: true,
								type: Constants.ApplicationCommandOptionTypes.STRING,
								choices: [
									{
										name: "Watching",
										value: "WATCHING"
									},
									{
										name: "Playing",
										value: "PLAYING"
									},
									{
										name: "Listening to",
										value: "LISTENING"
									}
								]
							},
							{
								name: "status",
								description: "The status text",
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
		const { db, translate: __ } = require('../index');

		switch(interaction.options.getSubcommandGroup()) {
			case "language": {
				switch(interaction.options.getSubcommand()) {
					case "set": {
						if(interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
							var newLanguage = interaction.options.getString("lang");
							db.setServerField(interaction.guild.id, "language", newLanguage);
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
						break;
					}
					case "current": {
						const embed = new MessageEmbed()
							.setTitle("Language")
							.setColor(0x00AE86)
							.setDescription(__("Current language is set to `{{currentLang}}`", lang, {currentLang: lang}));
						
						interaction.reply({ embeds: [embed] });
					}
				}
				break;
			}
			case "responses": {
				const { db, emojis } = require("../index.js");
				
				switch(interaction.options.getSubcommand()) {
					case "toggle": {
						if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({ content: __("You need Manage Server permissions to do this, stupid", lang), ephemeral: true });
						const enabled = interaction.options.getBoolean("enabled");

						db.setServerField(interaction.guild.id, "auto_responses", enabled);
						const embed = new MessageEmbed()
							.setTitle("Responses")
							.setColor(enabled ? "#00AE86" : "#6d05fa")
							.setDescription(`${enabled ? emojis.activated : emojis.deactivated} Responses have been successfully ${enabled ? "enabled" : "disabled"}`);
						return interaction.reply({embeds:[embed]});
					}
					case "disablefor": {
						const time = ms(interaction.options.getString("time") ?? "1s");
						if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) && time > 1000 * 60 * 60) return interaction.reply({ content: __("You need Manage Server permissions to do this, stupid", lang), ephemeral: true });
						if (!time) return interaction.reply({content:__("Please specify a valid time", language), ephemeral: true});
						db.setServerField(interaction.guild.id, "auto_responses", false);
						setTimeout(() => {
							db.setServerField(interaction.guild.id, "auto_responses", true);
						}, time);
						const embed = new MessageEmbed()
							.setTitle("Responses")
							.setColor("#6d05fa")
							.setDescription(`${emojis.deactivated} Responses will be disabled for \`${interaction.options.getString("time")}\``);
						return interaction.reply({embeds:[embed]});
					}
				}
				break;
			}
			case "status": {
				switch(interaction.options.getSubcommand()) {
					case "set": {
						if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({ content: __("You need Manage Server permissions to do this, stupid", lang), ephemeral: true });
						clearInterval(interaction.client.activityInterval);
						interaction.client.activityInterval = setInterval(() => {
							interaction.client.user.setActivity(interaction.options.getString("status"), { type: interaction.options.getString("type") });
						}, activityResetTimeout * 100);
						interaction.reply({ content: __("Set status to `{{status}}`", lang, {
							status: interaction.options.getString("status")
						}), ephemeral: true });
					}
				}
			}
		}
	}
};