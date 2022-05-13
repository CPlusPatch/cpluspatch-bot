// Prints out bot stats
const { Constants, MessageEmbed } = require("discord.js");
const os = require("os");
const moment = require("moment");
require("moment-duration-format");

module.exports = {
	command: {
		name: "stats",
		description: "Prints out bot stats",
		options: []
	},
	default: async (interaction, lang) => {
		const client = interaction.client;
		const embed = new MessageEmbed()
			.setColor("RANDOM")
			.setTitle("Stats")
			.setDescription(`
			**Client stuff**
			> Username : \`${client.user.username}\`
			> Tag :      \`${client.user.discriminator}\`
			> ID :       \`${client.user.id}\`
			\u200b
			**Stats**
			> Servers :    \`${client.guilds.cache.size.toLocaleString()}\`
			> Users :      \`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}\`
			> Discord.JS : \`v${interaction.version}\`
			> Node.JS :    \`v${process.version}\`
			\u200b
			**Stats**
			> OS :           \`${os.platform()} | ${os.release()}\`
			> Uptime :       \`${moment.duration(interaction.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]")}\`
			> **CPU**
			> • Model :      \`${os.cpus()[0].model}\`
			> • Speed :      \`${os.cpus()[0].speed} MHz\`
			> **RAM**
			> • Total :      \`${(os.totalmem() / 1024 / 1024).toFixed(2)} Mb\`
			> • Free :       \`${(os.freemem() / 1024 / 1024).toFixed(2)} Mb\`
			> • Heap Total : \`${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} Mb\`
			> • Heap Usage : \`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} Mb\`
			`);

		interaction.reply({embeds: [embed]});
	}
};

