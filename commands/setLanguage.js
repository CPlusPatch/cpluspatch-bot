const { MessageEmbed, Constants, Permissions } = require("discord.js");
const path = require('path');
const { I18n } = require('i18n');

const i18n = new I18n({
  locales: ['en', 'fr'],
  directory: path.join(__dirname, '../locales')
})
const __ = (string, lang, options = undefined) => {
	return i18n.__({phrase:string, locale:lang}, options)
}

module.exports.default = async (message, db) => {
	var language = db.get(`guilds.${message.guildId}.lang`);
	// If there is no locale following the !lang, just show the set language
	if (message.content.toLowerCase().split(" ").length <= 1) {			
		const embed_98678 = new MessageEmbed()
			.setTitle("Language")
			.setColor(0x00AE86)
			.setDescription(__("Current language is set to `{{currentLang}}`", language, {currentLang: language}));
		
		message.channel.send({embeds: [embed_98678]});
	}
	else if (message.content.toLowerCase().split(" ").length == 2) { // If there is indeed a locale following the !lang
		if(message.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) {
			var newLanguage = message.content.split(" ")[1];
			if (["en", "fr"].includes(newLanguage)) { // Checks if the new language is in the list of supported languages
				db.set(`guilds.${message.guildId}.lang`, newLanguage);
				const embed_87655 = new MessageEmbed()
					.setTitle("Language")
					.setColor(0x00AE86)
					.setDescription(__("Successfully set language to `{{newLanguage}}`!", newLanguage, {newLanguage: newLanguage}));
				
				message.channel.send({embeds: [embed_87655]});
			} else {
				const embed_34567 = new MessageEmbed()
					.setTitle("Language")
					.setColor(0x00AE86)
					.setDescription(__("Language `{{newLanguage}}` is not supported yet!", language, {newLanguage: newLanguage}))
					.setFooter({text:__("Please dm my twin CPlusPatch#9373 if you think it should be added!", language)});
				
				message.channel.send({embeds: [embed_34567]});
			}
		}
		else {
			message.channel.send({
				content: __("You need Manage Server permissions to do this, stupid", language)
			});
		}
	}
};