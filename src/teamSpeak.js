const insertStats = require('./insertStats');
const { TeamSpeak } = require('ts3-nodejs-library');
const host = process.env.teamSpeakHost;
const queryPort = process.env.teamSpeakQueryPort;
const serverPort = process.env.teamSpeakServerPort;
const username = process.env.teamSpeakUsername;
const password = process.env.teamSpeakPassword;
const nickname = process.env.teamSpeakNickname;

module.exports = async function() {
	return new Promise((res, rej) => {
		TeamSpeak.connect({
			host: host,
			username: username,
			serverport: serverPort,
			queryport: queryPort,
			password: password,
			nickname: nickname,
			readyTimeout: 5000,
		})
			.then(async teamspeak => {
				let clients = await teamspeak.clientList({ client_type: 0 });
				if (!clients) {
					return;
				}
				let clientStatsPromises = clients.map(insertStats);
				await Promise.all(clientStatsPromises);
				teamspeak.logout();
				res('Successfully inserted stats');
			})
			.catch(rej);
	});
};
