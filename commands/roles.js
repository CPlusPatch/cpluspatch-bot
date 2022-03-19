const { MessageSelectMenu, Constants, MessageActionRow } = require("discord.js");

module.exports = {
	command: {
		name: "roles",
		description: "Auto assign roles to users from a select menu",
		options: [
			{
				name: "pronouns",
				description: "Assigns pronoun roles",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: [
					{
						name: "he-him",
						description: "He/him role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "she-her",
						description: "She/her role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "they-them",
						description: "They/them role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "any",
						description: "Any role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "ask",
						description: "Ask role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "amogus-sus",
						description: "Sussy role!!!",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
				]
			},
		]
	},

	default: async (interaction, lang) => {
		const { commandName, options } = interaction;
		const { role_db, translate: __ } = require('../index');

		switch (options.getSubcommand()) {
			case "pronouns": {
				if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({ content: __("You need Manage Server permissions to do this, stupid", lang), ephemeral: true });
				const row = new MessageActionRow()
					.addComponents(
						new MessageSelectMenu()
							.setCustomId('select')
							.setPlaceholder('Nothing selected')
							.addOptions([
								{
									label: "He/him",
									description: "I go by he/him",
									value: options.getMentionable("he-him").id.toString(),
									emoji: "♂️"
								},
								{
									label: "She/her",
									description: "I go by she/her",
									value: options.getMentionable("she-her").id.toString(),
									emoji: "♀️"
								},
								{
									label: "They/them",
									description: "I go by they/them ",
									value: options.getMentionable("they-them").id.toString(),
									emoji: "⚧"
								},
								{
									label: "Any",
									description: "I use any pronouns",
									value: options.getMentionable("any").id.toString(),
									emoji: "🅰️"
								},
								{
									label: "Ask",
									description: "Ask for my pronouns",
									value: options.getMentionable("ask").id.toString(),
									emoji: "❓"
								},
								{
									label: "Amogus/sus",
									description: "I am a sussy baka",
									value: options.getMentionable("amogus-sus").id.toString(),
									emoji: "📮"
								},
							]),
					);
				
				for (var i of ["he-him", "she-her", "they-them", "any", "ask", "amogus-sus"]) {
					role_db.set(`${interaction.guild.id}.pronouns.${i}`, options.getMentionable(i).id.toString());
				}
				return interaction.reply({ content: "Select your pronouns from the list below", components: [row] });
			}
		}
	},

	checkForRoleEvent: async (interaction, lang) => {
		const { role_db, translate: __ } = require('../index');

		if (role_db.get(`${interaction.guild.id}.pronouns`) != undefined) {
			for (var i of ["he-him", "she-her", "they-them", "any", "ask", "amogus-sus"]) {
				const role = interaction.guild.roles.cache.find(r => r.id === role_db.get(`${interaction.guild.id}.pronouns.${i}`));
				if (role_db.get(`${interaction.guild.id}.pronouns.${i}`) == interaction.values[0]) {
					interaction.member.roles.add(role);
					interaction.reply({ content: `You've been given the \`${role.name}\` role!`, ephemeral: true });
				} else {
					interaction.member.roles.remove(role);
				}
			}
		}
	}
};