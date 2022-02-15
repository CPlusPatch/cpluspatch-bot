const data = require("../static/songs.json");
const SpotifyWebApi = require('spotify-web-api-node');
const { spotifyToken } = require("../config.json");
const { MessageEmbed } = require("discord.js");

module.exports = {
	command: {
		name: "song",
		description: "Sends a random song from CPlusPatch#9373's favorites",
		options: []
	},

	default: async (interaction, language) => {
		/* const song = data[Math.floor(Math.random() * data.length)];
		console.log(song); */
		var spotifyApi = new SpotifyWebApi();
		spotifyApi.setAccessToken(spotifyToken);
		spotifyApi.getPlaylist('5WMs9w0lo6NOA23rzUpbmK')
			.then(function(data) {
				const songs = data.body.tracks.items;
				const song = songs[Math.floor(Math.random() * songs.length)];
				interaction.reply({ content:song.track.external_urls.spotify });
			}, function(err) {
				console.error(err);
				interaction.reply("Something went wrong! Please try again later or report this, idk");
			});
	}
}