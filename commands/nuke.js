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
		.setTitle(__(`🚨 Missile command system 🚨`, language))
		.setDescription(__(`Situation is critical! Commander, we are waiting for your orders!\n\nAre you sure you want to nuke the channel?`, language));
	
	const confirmEmbedRow = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('nuke_launch_confirm_button')
				.setLabel(__('DO IT!', language))
				.setStyle('DANGER')
				.setEmoji("🚀")
		);
	
	message.reply({embeds: [confirmEmbed], components: [confirmEmbedRow]});
};

module.exports.beginNuke = async (interaction, language) => {
	if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
		// Edit the original message to mark the button as disabled
		var interactionCopy = interaction;
		interactionCopy.message.components[0].components[0].disabled = true;
		interaction.message.edit({embeds:[interactionCopy.message.embeds[0]], components:[interactionCopy.message.components[0]],});

		var strikeEmbed = new MessageEmbed()
			.setColor("0xe31414")
			.setTitle(__(`🧨 LAUNCHING NUKES 🧨`, language))
			.setDescription(__("```PREPARING MISSILES                     - 100%%```", language));

		await interaction.channel.send("https://tenor.com/view/runway-jet-aircraft-carrier-gif-5406031");
	
		await interaction.reply({embeds: [strikeEmbed]});
		await new Promise(r => setTimeout(r, 1000));
		strikeEmbed.setDescription(__("```PREPARING MISSILES                     - 100%%\nINITIALISING LONG-RANGE STRIKE SYSTEM  - 100%%```", language));
		try {
			await interaction.editReply({embeds: [strikeEmbed]});
		} catch {
			await interaction.followUp(__("You may have deleted the message, but you will never be able to stop me", language));
			await new Promise(r => setTimeout(r, 3000));
			return true;
		}
		await new Promise(r => setTimeout(r, 1000));
		strikeEmbed.setDescription(__("```PREPARING MISSILES                     - 100%%\nINITIALISING LONG-RANGE STRIKE SYSTEM  - 100%%\nAIMING FIRING PLATFORM                 - 100%%```", language));
		try {
			await interaction.editReply({embeds: [strikeEmbed]});
		} catch {
			await interaction.followUp(__("You may have deleted the message, but you will never be able to stop me", language));
			await new Promise(r => setTimeout(r, 3000));
			return true;
		}
		await new Promise(r => setTimeout(r, 1000));
		strikeEmbed.setDescription(__("```PREPARING MISSILES                     - 100%%\nINITIALISING LONG-RANGE STRIKE SYSTEM  - 100%%\nAIMING FIRING PLATFORM                 - 100%%\nFIRING IN 3```", language));
		try {
			await interaction.editReply({embeds: [strikeEmbed]});
		} catch {
			await interaction.followUp(__("You may have deleted the message, but you will never be able to stop me", language));
			await new Promise(r => setTimeout(r, 3000));
			return true;
		}
		await new Promise(r => setTimeout(r, 1000));
		strikeEmbed.setDescription(__("```PREPARING MISSILES                     - 100%%\nINITIALISING LONG-RANGE STRIKE SYSTEM  - 100%%\nAIMING FIRING PLATFORM                 - 100%%\nFIRING IN 3\nFIRING IN 2```", language));
		try {
			await interaction.editReply({embeds: [strikeEmbed]});
		} catch {
			await interaction.followUp(__("You may have deleted the message, but you will never be able to stop me", language));
			await new Promise(r => setTimeout(r, 3000));
			return true;
		}
		await new Promise(r => setTimeout(r, 1000));
		strikeEmbed.setDescription(__("```PREPARING MISSILES                     - 100%%\nINITIALISING LONG-RANGE STRIKE SYSTEM  - 100%%\nAIMING FIRING PLATFORM                 - 100%%\nFIRING IN 3\nFIRING IN 2\nFIRING IN 1```", language));
		try {
			await interaction.editReply({embeds: [strikeEmbed]});
		} catch {
			await interaction.followUp(__("You may have deleted the message, but you will never be able to stop me", language));
			await new Promise(r => setTimeout(r, 3000));
			return true;
		}
		await new Promise(r => setTimeout(r, 1000));
		strikeEmbed.setDescription(__("```PREPARING MISSILES                     - 100%%\nINITIALISING LONG-RANGE STRIKE SYSTEM  - 100%%\nAIMING FIRING PLATFORM                 - 100%%\nFIRING IN 3\nFIRING IN 2\nFIRING IN 1\nMISSILES OUT! Estimated time until strike: 3s```", language));
		try {
			await interaction.editReply({embeds: [strikeEmbed]});
		} catch {
			await interaction.followUp(__("You may have deleted the message, but you will never be able to stop me", language));
			await new Promise(r => setTimeout(r, 3000));
			return true;
		}
		await interaction.channel.send("https://tenor.com/view/planes-flying-pilot-gif-8911972");
		await interaction.channel.send("https://tenor.com/view/transformer2-avion-de-chasse-fighter-jet-f16-gif-18931146");
		await new Promise(r => setTimeout(r, 3000));
		// repeat 6 times

		for (var i = 0; i < 6; i++) {
			await module.exports.nukeChannel(interaction);
		}
		interaction.channel.send("https://tenor.com/view/explosions-spontaneous-explosion-dynamites-explosion-test-bomb-test-gif-13806891");
		return true;

	}
	else {
		var embed = new MessageEmbed()
			.setColor("0xe11e2b")
			.setTitle(__(`You do not have permission to launch the nukes`, language));
		
		interaction.reply({embeds: [embed], ephemeral: true});
		return false;
	}
};

module.exports.nukeChannel = (interaction) => {
var bigWiggle = `
big wiggle
 big wiggle
  big wiggle
   big wiggle
     big wiggle
       big wiggle
         big wiggle
            big wiggle
               big wiggle
                  big wiggle
                     big wiggle
                        big wiggle
                           big wiggle
                              big wiggle
                                 big wiggle
                                    big wiggle
                                       big wiggle
                                         big wiggle
                                           big wiggle
                                             big wiggle
                                              big wiggle
                                               big wiggle
                                                big wiggle
                                                big wiggle
                                                big wiggle
                                                big wiggle
                                               big wiggle
                                              big wiggle
                                             big wiggle
                                           big wiggle
                                         big wiggle
                                       big wiggle
                                    big wiggle
                                 big wiggle
                              big wiggle
                           big wiggle
                        big wiggle
                     big wiggle
                  big wiggle
               big wiggle
            big wiggle
         big wiggle
       big wiggle
     big wiggle
   big wiggle
  big wiggle
 big wiggle
big wiggle
big wiggle
big wiggle
`;
	interaction.channel.send(bigWiggle);
};