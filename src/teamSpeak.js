const insertStats = require('./insertStats');
const { TeamSpeak } = require('ts3-nodejs-library');
const host = process.env.teamSpeakHost;
const queryPort = process.env.teamSpeakQueryPort;
const serverPort = process.env.teamSpeakServerPort;
const username = process.env.teamSpeakUsername;
const password = process.env.teamSpeakPassword;
const nickname = process.env.teamSpeakNickname;

let teamspeak = null;

module.exports = async function() {
	teamspeak = await TeamSpeak.connect({
		host: host,
		username: username,
		serverport: serverPort,
		queryport: queryPort,
		password: password,
		nickname: nickname,
		readyTimeout: 5000,
	});
	try {
		let clients = await teamspeak.clientList({ client_type: 0 });
		if (clients) {
			let clientStatsPromises = clients.map(insertStats);
			await Promise.all(clientStatsPromises);
		}
		await teamspeak.quit();
	} catch (e) {
		await teamspeak.forceQuit();
		throw e;
	}
};
