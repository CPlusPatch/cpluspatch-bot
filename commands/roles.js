const { MessageSelectMenu, Constants, MessageActionRow, Permissions } = require("discord.js");

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
			{
				name: "location",
				description: "Assigns location roles",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: [
					{
						name: "europe",
						description: "Europe role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "north-america",
						description: "North America role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "south-america",
						description: "South America role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "asia",
						description: "Asia role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "oceania",
						description: "Oceania role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "africa",
						description: "Africa role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
				]
			},
			{
				name: "colors",
				description: "Assigns color roles",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: [
					{
						name: "red",
						description: "Red role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "purple",
						description: "Purple role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "green",
						description: "Pink role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "pink",
						description: "Pink",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "orange",
						description: "Orange role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "yellow",
						description: "Yellow role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "blue",
						description: "Blue role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
				]
			},
			{
				name: "pings",
				description: "Assigns ping roles",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: [
					{
						name: "server-updates",
						description: "Server updates role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "modpack-updates",
						description: "Modpack updates role",
						type: Constants.ApplicationCommandOptionTypes.MENTIONABLE,
						required: true,
					},
					{
						name: "staff-updates",
						description: "Staff updates role",
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
			case "location": {
				if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({ content: __("You need Manage Server permissions to do this, stupid", lang), ephemeral: true });
				const row = new MessageActionRow()
					.addComponents(
						new MessageSelectMenu()
							.setCustomId('select')
							.setPlaceholder('Nothing selected')
							.addOptions([
								{
									label: "Europe",
									description: "I'm from Europe!",
									value: options.getMentionable("europe").id.toString(),
									emoji: "🇪🇺"
								},
								{
									label: "North America",
									description: "I'm from North America!",
									value: options.getMentionable("north-america").id.toString(),
									emoji: "🦅"
								},
								{
									label: "South America",
									description: "I'm from South America!",
									value: options.getMentionable("south-america").id.toString(),
									emoji: "🌄"
								},
								{
									label: "Asia",
									description: "I'm from Asia!",
									value: options.getMentionable("asia").id.toString(),
									emoji: "🐼"
								},
								{
									label: "Oceania",
									description: "I'm from Oceania!",
									value: options.getMentionable("oceania").id.toString(),
									emoji: "🐨"
								},
								{
									label: "Africa",
									description: "I'm from Africa!",
									value: options.getMentionable("africa").id.toString(),
									emoji: "🦒"
								},
							]),
					);
				
				for (var i of ["europe", "north-america", "south-america", "asia", "oceania", "africa"]) {
					role_db.set(`${interaction.guild.id}.location.${i}`, options.getMentionable(i).id.toString());
				}
				return interaction.reply({ content: "Where are you from?", components: [row] });
			}
			case "colors": {
				if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({ content: __("You need Manage Server permissions to do this, stupid", lang), ephemeral: true });
				const row = new MessageActionRow()
					.addComponents(
						new MessageSelectMenu()
							.setCustomId('select')
							.setPlaceholder('Nothing selected')
							.addOptions([
								{
									label: "Red",
									description: "I'm red",
									value: options.getMentionable("red").id.toString(),
									emoji: "🔴"
								},
								{
									label: "Blue",
									description: "I'm blue",
									value: options.getMentionable("blue").id.toString(),
									emoji: "🔵"
								},
								{
									label: "Green",
									description: "I'm green",
									value: options.getMentionable("green").id.toString(),
									emoji: "🟢"
								},
								{
									label: "Yellow",
									description: "I'm yellow",
									value: options.getMentionable("yellow").id.toString(),
									emoji: "🟡"
								},
								{
									label: "Purple",
									description: "I'm purple",
									value: options.getMentionable("purple").id.toString(),
									emoji: "🟣"
								},
								{
									label: "Orange",
									description: "I'm orange",
									value: options.getMentionable("orange").id.toString(),
									emoji: "🟠"
								},
								{
									label: "Pink",
									description: "I'm pink",
									value: options.getMentionable("pink").id.toString(),
									emoji: "🦩"
								},
							]),
					);
				
				for (var i of ["red", "blue", "green", "yellow", "purple", "orange", "pink"]) {
					role_db.set(`${interaction.guild.id}.color.${i}`, options.getMentionable(i).id.toString());
				}
				return interaction.reply({ content: "Select your color here!", components: [row] });
			}
			case "pings": {
				if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return interaction.reply({ content: __("You need Manage Server permissions to do this, stupid", lang), ephemeral: true });
				const row = new MessageActionRow()
					.addComponents(
						new MessageSelectMenu()
							.setCustomId('select')
							.setPlaceholder('Nothing selected')
							.addOptions([
								{
									label: "Server updates pings",
									description: "Ping me for server news and updates",
									value: options.getMentionable("server-updates").id.toString(),
									emoji: "💾"
								},
								{
									label: "Modpack pings",
									description: "Ping me for modpack changes and new releases",
									value: options.getMentionable("modpack-updates").id.toString(),
									emoji: "🛠️"
								},
								{
									label: "Staff updates",
									description: "Ping me for staff updates",
									value: options.getMentionable("staff-updates").id.toString(),
									emoji: "📢"
								},
							]),
					);
				
				for (var i of ["server-updates", "modpack-updates", "staff-updates"]) {
					role_db.set(`${interaction.guild.id}.ping.${i}`, options.getMentionable(i).id.toString());
				}
				return interaction.reply({ content: "Do you want to be pinged?", components: [row] });
			}
		}
	},

	checkForRoleEvent: async (interaction, lang) => {
		const { role_db, translate: __ } = require('../index');
		var i;

		// Check for pronoun roles
		if (Object.values(role_db.get(`${interaction.guild.id}.pronouns`)).indexOf(interaction.values[0].toString()) > -1) {
			for (i of ["he-him", "she-her", "they-them", "any", "ask", "amogus-sus"]) {
				const role = interaction.guild.roles.cache.find(r => r.id === role_db.get(`${interaction.guild.id}.pronouns.${i}`));
				interaction.member.roles.remove(role);
				if (role_db.get(`${interaction.guild.id}.pronouns.${i}`) == interaction.values[0]) {
					interaction.member.roles.add(role);
					interaction.reply({ content: `You've been given the \`${role.name}\` role!`, ephemeral: true });
				}
			}
		}

		i = undefined;

		// Check for location roles
		if (Object.values(role_db.get(`${interaction.guild.id}.location`)).indexOf(interaction.values[0].toString()) > -1) {
			for (i of ["europe", "north-america", "south-america", "asia", "oceania", "africa"]) {
				const role = interaction.guild.roles.cache.find(r => r.id === role_db.get(`${interaction.guild.id}.location.${i}`));
				interaction.member.roles.remove(role);
				if (role_db.get(`${interaction.guild.id}.location.${i}`) == interaction.values[0]) {
					interaction.member.roles.add(role);
					interaction.reply({ content: `You've been given the \`${role.name}\` role!`, ephemeral: true });
				}
			}
		}

		i = undefined;

		// Check for color roles
		if (Object.values(role_db.get(`${interaction.guild.id}.color`)).indexOf(interaction.values[0].toString()) > -1) {
			for (i of ["red", "blue", "green", "yellow", "purple", "orange", "pink"]) {
				const role = interaction.guild.roles.cache.find(r => r.id === role_db.get(`${interaction.guild.id}.color.${i}`));
				interaction.member.roles.remove(role);
				if (role_db.get(`${interaction.guild.id}.color.${i}`) == interaction.values[0]) {
					interaction.member.roles.add(role);
					interaction.reply({ content: `You've been given the \`${role.name}\` role!`, ephemeral: true });
				}
			}
		}

		i = undefined;

		// Check for ping roles`
		if (Object.values(role_db.get(`${interaction.guild.id}.ping`)).indexOf(interaction.values[0].toString()) > -1) {
			for (i of ["server-updates", "modpack-updates", "staff-updates"]) {
				const role = interaction.guild.roles.cache.find(r => r.id === role_db.get(`${interaction.guild.id}.ping.${i}`));
				interaction.member.roles.remove(role);
				if (role_db.get(`${interaction.guild.id}.ping.${i}`) == interaction.values[0]) {
					interaction.member.roles.add(role);
					interaction.reply({ content: `You've been given the \`${role.name}\` role!`, ephemeral: true });
				}
			}
		}
	}
};