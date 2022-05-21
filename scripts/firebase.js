// Fix for not being able to use require and import at the same time
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const Database = require("simplest.db").JS0N;
const config = require('../config.json');

const cache = new Database({ path: './data/cache.json' });
cache.clear();
const app = initializeApp({
	credential: cert(config.firebase)
});
const db = getFirestore(app);
const defaultData = {
	language: "en",
	auto_responses: false,
};

module.exports = {
	app: app,
	getServerData: async (serverId) => {
		// Check if the server is already in cache
		if (cache.has(serverId)) {
			return cache.get(serverId);
		}
		const ref = db.collection('servers').doc(serverId);
		const doc = await ref.get();
		if (!doc.exists) {
			ref.set(defaultData);

			// Add the server to the cache
			cache.set(serverId, defaultData);

			return defaultData;
		} else {
			// Add server to cache
			cache.set(serverId, doc.data());
			return doc.data();
		}
	},
	setServerData: async (serverId, data) => {
		// Remove the server from the cache
		cache.delete(serverId);
		
		const ref = db.collection('servers').doc(serverId);
		await ref.set(data);
	},
	setServerField: async (serverId, field, value) => {
		// Remove the server from the cache
		cache.delete(serverId);

		const ref = db.collection('servers').doc(serverId);
		const doc = await ref.get();
		if (!doc.exists) {
			let newData = defaultData;
			newData[field] = value;
			await ref.set(newData);
		} else {
			await ref.update({ [field]: value });
		}
	}
};