const { MessageEmbed, Constants, Permissions, MessageActionRow, MessageButton, CommandInteraction, ButtonInteraction } = require("discord.js");
const path = require('path');
const { I18n } = require('i18n');

const i18n = new I18n({
  locales: ['en', 'fr'],
  directory: path.join(__dirname, '../locales')
});
const __ = (string, lang, options = undefined) => {
	return i18n.__({phrase:string, locale:lang}, options);
};

module.exports.default = async (message, language) => {
	//if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return;
	if (message.author.id != "779660899081519115") return;
	const confirmEmbed = new MessageEmbed()
		.setColor("0xe31414")
		.setTitle(__(`๐จ Missile command system ๐จ`, language))
		.setDescription(__(`Situation is critical! Commander, we are waiting for your orders!\n\nAre you sure you want to nuke the channel?`, language));
	
	const confirmEmbedRow = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('nuke_launch_confirm_button')
				.setLabel(__('DO IT!', language))
				.setStyle('DANGER')
				.setEmoji("๐")
		);
	
	message.reply({embeds: [confirmEmbed], components: [confirmEmbedRow]});
};

// It's Morbin' time
module.exports.beginNuke = async (interaction, language) => {
	if (!interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return interaction.reply({embeds: [new MessageEmbed().setColor("0xe11e2b").setTitle(__(`You do not have permission to launch the nukes`, language))], ephemeral: true});
		
	// Edit the original message to mark the button as disabled
	var interactionCopy = interaction;
	interactionCopy.message.components[0].components[0].disabled = true;
	interaction.message.edit({embeds:[interactionCopy.message.embeds[0]], components:[interactionCopy.message.components[0]],});

	let strikeEmbedText = "```PREPARING MISSILES                     - 100%%";
	var strikeEmbed = new MessageEmbed()
		.setColor("0xe31414")
		.setTitle(__(`๐งจ LAUNCHING NUKES ๐งจ`, language))
		.setDescription(__(strikeEmbedText + "```", language));

	await interaction.channel.send("https://tenor.com/view/runway-jet-aircraft-carrier-gif-5406031");

	let strikeEmbedTextRows = [
		"\nINITIALISING LONG-RANGE STRIKE SYSTEM  - 100%%",
		"\nAIMING FIRING PLATFORM                 - 100%%",
		"\nFIRING IN 3",
		"\nFIRING IN 2",
		"\nFIRING IN 1",
		"\nMISSILES OUT! Estimated time until strike: 3s"
	];
	try {
		await interaction.reply({embeds: [strikeEmbed]});

		for (let i = 0; i < strikeEmbedTextRows.length; i++) {
			strikeEmbedText += strikeEmbedTextRows[i];
			await new Promise(r => setTimeout(r, 1000));
			strikeEmbed.setDescription(__(strikeEmbedText + "```", language));
			await interaction.editReply({embeds: [strikeEmbed]});
		}
	} catch { // This executes if someone deletes the strike embed before the strike is complete
		await interaction.followUp(__("You may have deleted the message, but you will never be able to stop me", language));
		await new Promise(r => setTimeout(r, 3000));
	}

	await interaction.channel.send("https://tenor.com/view/planes-flying-pilot-gif-8911972");
	await interaction.channel.send("https://tenor.com/view/transformer2-avion-de-chasse-fighter-jet-f16-gif-18931146");
	await new Promise(r => setTimeout(r, 3000));

	for (var i = 0; i < 6; i++) {
		await module.exports.nukeChannel(interaction);
		await new Promise(r => setTimeout(r, 1000));
	}
	interaction.channel.send("https://tenor.com/view/explosions-spontaneous-explosion-dynamites-explosion-test-bomb-test-gif-13806891");
	return true;
};

module.exports.nukeChannel = (interaction) => {
	var bigWiggle = "_" + (`
	`.repeat(990)) + "_";
	interaction.channel.send(bigWiggle);
	interaction.channel.send(`
โ?โ?โ?โกโ?โ?HOG RIDAAAAAAโ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โกโ?โ?โ?
โ?โ?โ?โ?โกโ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โกโ?โ?โ?โ?
โ?โ?โ?โ?โ?โ?ขโขโ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โฃโ?ดโ?โ?โ?โ?โ?โ?
โ?โ?โ?โ?โ?โ?โ?โขธโ?โ?โ?โขโฃโฃโฃโฃโฃโกโ?คโ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?
โ?โ?โ?โ?โ?โ?โ?โ?โฃโ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?โ?
โฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโ?โ?โขโ?ฉโขโขฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟ
โฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโกฟโขโ??โ?โ?โ?จโ?โขธโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟ
โฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโกโขโ?โ?โกโขโขโขโ?โกโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟ
โฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโกโ?โกโ?โกโขโ?โ?โ?ฑโ?โกโ?โขนโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟ
โฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโขโ?โ?โ?โก?โกโ?โกโขโกโกฌโขโขธโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟ
โฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโกฟโ?กโ?โ?โ?โ?โ?โ?โ?โ?โขโ?โ?โขโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟ
โฃฟโฃฟโฃฟโกฟโขโ?ฉโ?โกโ?โ?โ?โ?โ?โ?โ?โ?โ?โขโ?โขโขโขโขฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟ
โฃฟโฃฟโ?ซโ?กโ?กโ?จโขโ?โ??โ?โ?โขโ?โกฑโ?โ?โกโขโ??โขธโขธโขจโ?ฃโกโฃปโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟ
โฃฟโขโขโขโ?โขโ?โกโ?โ??โ?โ?โ?โ?โ?โ?โ?โ?โขโขโ?ธโกจโ?ชโกชโกโฃปโฃฟโกฟโฃฟโฃฟโฃฟ
โฃฟโขโ?โกโ?โกโ?โกโ?จโขโ?โ??โ??โกโขโ??โก?โกกโกฑโกโ?โขโขโขโขฃโขโ?ฝโขฟโฃฟโฃฟโฃฟ
โ?ฃโขโ?โ?โ?กโ?โ?โ?โ?โกโ?จโกโ?ขโ?จโกโขโขโ?โกชโ?จโกโ?โกโ?ขโขกโฃขโฃฃโกฃโฃโขฟโฃฟ
โ?จโขโขโ?โกโ?โ?โ?โ?โ?โ?โ?โขโ?โ?โกโ?โ?โ?โ?โ?โฃโกโ??โกโกโ?โ?ขโขโ?โ?ฝ
โกจโ?โ?โ?โ?โข?โกโกโ?โ?โ?โ?โกโ?โ?โ??โ?โ?โกโ?โกโกซโ?โฃโ?โขโ?โ?โขโ?โ?จ
โ?บโกชโ?ขโกโ?โ?โขโขโ?โ?โกโ??โ?โ?โ?โ?โ?จโ?โขโ?ขโกโขโขฟโกโกโ?โ?โ?โกโ?โฃฐ
โขโขโ?โ?โ?โ?โกโ?โกโ?โกโ?โกโ?โขโ?โกโกโกโขโ?โขโ?ธโฃฟโกโ?โ?โฃ?โฃดโฃฟโฃฟ
โขโ?โ??โ?โ?โกโ??โขโ?ขโขโ?โ?โขโ?โกโกฑโขโฃโขโขโขโขโ?โ?นโขโฃบโกฟโฃโขฟโฃฟโฃฟ
โขโ?กโ?โ?โ?โ??โ?โ?โขโ??โขโขขโกฃโฃโ?โ?โฃโขฎโฃโฃโฃโฃฏโขฏโกทโกดโฃนโกชโฃทโฃฟโฃฟโฃฟ
โ?โ?โ??โ??โ?กโ?โ??โขโ??โกโกโฃโขญโขโ?นโกนโฃฎโกณโกตโฃณโฃปโขพโฃปโฃฝโฃปโฃบโฃบโฃฝโฃฟโฃฟโฃฟ
โฃจโฃพโขโ?ฐโ?โ?โกโกโขโขโขโขตโขนโขโขโ?จโขโ?ธโกนโกตโฃฏโฃปโขฝโฃณโฃปโฃบโขโกฟโฃฟโฃฟโฃฟ
โฃฟโฃฟโกโ??โขโ?โ?โข?โขฑโขธโขธโขธโขธโ?ฐโกกโขโขโขโ?โขฎโฃณโขฝโขโกพโกตโกฏโฃโ?ฏโฃฟโฃฟโฃฟ
โฃฟโฃฟโฃโขโขขโ??โ?กโ?ขโกฑโกโกโกโขโ?ฃโกโขจโขชโกฃโกฃโกโกฌโกณโขฝโขฝโขฝโขฝโฃโฃงโ?โฃฟโฃฟ
โกปโฃฟโกฏโกชโ?ขโกกโ?กโขโขโ?ชโกชโกโ?โขโ?ชโขโขโขฑโขฑโขฑโขฑโขฑโขโขฎโกซโกโฃโขฎโฃณโ?โฃฟ
โ?โฃฟโฃฏโ?ชโกโ?โขโ?โขโ?โขโขโขโ?โขโ?โ?โกฒโกฐโกกโฃโ?โขโขโ?ชโ?โ?โ?โ?โกโ?น
โฃธโขฟโฃณโขฑโ?จโกโกฝโกฟโกถโกพโกฌโกขโขโ?โกขโขกโฃโ?โ?โขโขโขโขโ??โ?กโ??โ??โ?กโกโกโ?ก
โกฏโกฏโกโขโ?โ??โขฑโขนโกโขฎโขนโ?จโกโกโขโ?โ?ฎโกณโ?โกโขโ?กโกโ??โขโขโฃกโฃกโฃขโฃถโฃฟ
โฃโขฝโขโกขโกกโกกโกธโกขโกฃโกฃโกฑโกโ?โกโขโขโขโ?โ?โฃขโกณโฃฝโกโขโขโฃโฃฟโฃฟโฃฟโฃฟโฃฟ
โฃฏโขฏโขทโขฝโขฎโขฏโฃบโฃชโขโกฎโฃณโขโ?โขโขโฃโฃโฃฎโฃปโขฎโฃฏโขทโฃฟโฃปโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟ
โฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃทโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃพโฃทโฃฟโฃพโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟโฃฟ
	`);
};