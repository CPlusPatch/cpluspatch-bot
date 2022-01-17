const { MessageEmbed, Constants, Permissions, MessageActionRow, MessageButton, CommandInteraction, ButtonInteraction } = require("discord.js");

module.exports.default = async message => {
	const confirmEmbed = new MessageEmbed()
		.setColor("0xe31414")
		.setTitle(`🚨 Missile command system 🚨`)
		.setDescription(`Situation is critical! Commander, we are waiting for your orders!\n\nAre you sure you want to nuke the channel?`);
	
	const confirmEmbedRow = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setCustomId('nuke_launch_confirm_button')
				.setLabel('DO IT!')
				.setStyle('DANGER')
				.setEmoji("🚀")
		);
	
	message.reply({embeds: [confirmEmbed], components: [confirmEmbedRow]});
}

module.exports.buttons = {
	nuke_launch_confirm_button: async (interaction, options) => {
		if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
			// Edit the original message to mark the button as disabled
			var interactionCopy = interaction;
			interactionCopy.message.components[0].components[0].disabled = true;
			interaction.message.edit({embeds:[interactionCopy.message.embeds[0]], components:[interactionCopy.message.components[0]],})

			var strikeEmbed = new MessageEmbed()
				.setColor("0xe31414")
				.setTitle(`🧨 LAUNCHING NUKES 🧨`)
				.setDescription("```PREPARING MISSILES                     - 100%```");
		
			await interaction.reply({embeds: [strikeEmbed]});
			await new Promise(r => setTimeout(r, 1000));
			strikeEmbed.setDescription("```PREPARING MISSILES                     - 100%\nINITIALISING LONG-RANGE STRIKE SYSTEM  - 100%```")
			await interaction.editReply({embeds: [strikeEmbed]});
			await new Promise(r => setTimeout(r, 1000));
			strikeEmbed.setDescription("```PREPARING MISSILES                     - 100%\nINITIALISING LONG-RANGE STRIKE SYSTEM  - 100%\nAIMING FIRING PLATFORM                 - 100%```")
			await interaction.editReply({embeds: [strikeEmbed]});
			await new Promise(r => setTimeout(r, 1000));
			strikeEmbed.setDescription("```PREPARING MISSILES                     - 100%\nINITIALISING LONG-RANGE STRIKE SYSTEM  - 100%\nAIMING FIRING PLATFORM                 - 100%\nFIRING IN 3```")
			await interaction.editReply({embeds: [strikeEmbed]});
			await new Promise(r => setTimeout(r, 1000));
			strikeEmbed.setDescription("```PREPARING MISSILES                     - 100%\nINITIALISING LONG-RANGE STRIKE SYSTEM  - 100%\nAIMING FIRING PLATFORM                 - 100%\nFIRING IN 3\nFIRING IN 2```")
			await interaction.editReply({embeds: [strikeEmbed]});
			await new Promise(r => setTimeout(r, 1000));
			strikeEmbed.setDescription("```PREPARING MISSILES                     - 100%\nINITIALISING LONG-RANGE STRIKE SYSTEM  - 100%\nAIMING FIRING PLATFORM                 - 100%\nFIRING IN 3\nFIRING IN 2\nFIRING IN 1```")
			await interaction.editReply({embeds: [strikeEmbed]});
			await new Promise(r => setTimeout(r, 1000));
			strikeEmbed.setDescription("```PREPARING MISSILES                     - 100%\nINITIALISING LONG-RANGE STRIKE SYSTEM  - 100%\nAIMING FIRING PLATFORM                 - 100%\nFIRING IN 3\nFIRING IN 2\nFIRING IN 1\nMISSILES OUT! Estimated time until strike: 3s```")
			await interaction.editReply({embeds: [strikeEmbed]});
			await new Promise(r => setTimeout(r, 3000));
			return true;

		}
		else {
			var embed = new MessageEmbed()
				.setColor("0xe11e2b")
				.setTitle(`You do not have permission to launch the nukes`);
			
			interaction.reply({embeds: [embed], ephemeral: true});
			return false;
		}
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