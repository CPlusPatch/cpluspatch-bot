const getMeme = require("meme-fetcher").default;

module.exports.default = async (type) => {
	return new Promise(async (resolve, reject) => {
		var image = undefined;

		while (typeof image == "undefined" || typeof image.title != "string") {
			try {
				image = await getMeme({ type: type });
			}
			catch {
				continue;
			}
		}

		resolve(image);
	});
}