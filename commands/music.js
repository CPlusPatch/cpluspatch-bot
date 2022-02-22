const { MessageEmbed, Constants } = require("discord.js");
const ytdl = require("ytdl-core");
const { createAudioPlayer, joinVoiceChannel, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const spotifyToYt = require("spotify-to-yt");
const SpotifyWebApi = require('spotify-web-api-node');
const { spotifyClientId, spotifyClientSecret } = require("../config.json");
const { GorilinkManager } = require('gorilink');

var queue = new Map();

module.exports = {
	command: {
		name: "music",
		description: "Music commands",
		options: [
			{
				name: "play",
				description: "Play a song",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: [
					{
						name: "song",
						description: "Can be a YouTube link, Spotify link, song name or anything else",
						type: Constants.ApplicationCommandOptionTypes.STRING,
						required: true
					}
				]
			},
			{
				name: "nowplaying",
				description: "Shows the currently playing track",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: []
			},
			{
				name: "resume",
				description: "Resumes playback",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: []
			},
			{
				name: "pause",
				description: "Pauses the currently playing track",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: []
			},
			{
				name: "stop",
				description: "Stops playback",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: [],
			},
			{
				name: "skip",
				description: "Skips the currently playing track",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: []
			},
			{
				name: "queue",
				description: "Shows every current track in the queue",
				type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
				options: []
			}
		]
	},

	default: async (interaction, language) => {
		switch(interaction.options.getSubcommand()) {
			case "play": {
				const voiceChannel = interaction.member.voice.channel;

				if (!voiceChannel) return interaction.reply({ content: "You need to be in a voice channel to play music!", ephemeral: true });
				const permissions = voiceChannel.permissionsFor(interaction.client.user);
				if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) return interaction.reply({ content: "Lmfao I don't have the perms to speak, that's rather annoying" });
				
				const player = await interaction.client.music.join({
					guild: interaction.guild.id,
					voiceChannel: voiceChannel.id,
					textChannel: interaction.channel
				});
			  
				// Getting tracks
				const { tracks, loadType, playlistInfo } = await interaction.client.music.fetchTracks(interaction.options.getString("song"));

				if (loadType == "LOAD_FAILED") return interaction.reply({ content: "I can't seem to fetch this, are you sure this is valid? Supported sources are:\n` 1 ` Spotify song\n` 2 ` YouTube video\n` 3 ` YouTube playlist", ephemeral: true });

				var serverQueue = queue.get(interaction.guild.id);
				if (!serverQueue) {
					queue.set(interaction.guild.id, {
						player: player,
						channel: interaction.channel,
						volume: 5,
						queue: []
					});
					serverQueue = queue.get(interaction.guild.id);
				}
				// Adding in queue
				if (loadType == "PLAYLIST_LOADED") {
					await interaction.reply("Loading playlist tracks...");
					for (var track in tracks) {
						serverQueue.queue.push(tracks[track]);
					}
					serverQueue.player.queue.add(tracks[0]);
					if (!player.playing) {
						player.play();
						return interaction.editReply({ content: `:notes: Playing playlist \`${playlistInfo.name}\` (requested by \`${interaction.user.tag})\`` });
					} else {
						return interaction.editReply({ content: `:musical_score: playlist \`${playlistInfo.name}\` has been added to the queue!` });
					}
				} else {
					serverQueue.queue.push(tracks[0]);
					serverQueue.player.queue.add(tracks[0]);
					if (!player.playing) {
						player.play();
						return interaction.reply({ content: `:notes: Playing \`${tracks[0].title}\` (requested by \`${interaction.user.tag})\`` });
					} else {
						return interaction.reply({ content: `:musical_score: \`${tracks[0].title}\` has been added to the queue!` });
					}
				}
				break;
			}
			case "skip": {
				const voiceChannel = interaction.member.voice.channel;

				if (!voiceChannel) return interaction.reply({ content: "You need to be in a voice channel to do this!", ephemeral: true });
				const serverQueue = queue.get(interaction.guild.id);
				serverQueue.player.pause();
				serverQueue.queue.shift();
				serverQueue.player.queue.add(serverQueue.queue[0]);
				if (serverQueue.queue.length > 0) {
					serverQueue.player.play();
					return interaction.reply({ content: ":control_knobs: Skipping to next song..." });
				} else {
					serverQueue.player.stop();
					return interaction.reply({ content: "I've reached the end of the playlist! Goodbye" });
				}
				break;
			}
			case "nowplaying": {
				const voiceChannel = interaction.member.voice.channel;

				if (!voiceChannel) return interaction.reply({ content: "You need to be in a voice channel to do this!", ephemeral: true });
				const serverQueue = queue.get(interaction.guild.id);
				if (serverQueue.player.playing) {
					return interaction.reply({ content: `:notes: Playing \`${serverQueue.player.queue[0].title}\`` });
				} else {
					return interaction.reply({ content: `:notes: Nothing is playing right now!`, ephemeral: true });
				}
			}
		}
	},

	initMusicClient: (client, nodes) => {
		return new GorilinkManager(client, nodes, {
			sendWS: (data) => {
				const guild = client.guilds.cache.get(data.d.guild_id);
				if (!guild) return;

				return guild.shard.send(data);
			}
		})
			.on('nodeConnect', node => {
				console.log(`[+] Connected to Lavalink`);
			})
			.on("trackError", (node, track, data) => {
				//console.error(data);
				//var serverQueue = queue.get(node.textChannel.guild.id);
				//serverQueue.channel.send("Whoops, seems like there's been an error playing your track! Please try again later");
			})
			.on("trackEnd", node => {
				var serverQueue = queue.get(node.textChannel.guildId);
				if (serverQueue.queue.length > 0) {
					serverQueue.player.queue.add(serverQueue.queue[0]);
					serverQueue.player.play();
				}
			});
		}
	};