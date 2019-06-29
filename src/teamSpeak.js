const insertStats = require('./insertStats');
const TeamSpeak3 = require('ts3-nodejs-library');
const debug = require('debug')('teamSpeakStats-wrapper');

const host = process.env.teamSpeakHost;
const queryPort = process.env.teamSpeakQueryPort;
const serverPort = process.env.teamSpeakServerPort;
const username = process.env.teamSpeakUsername;
const password = process.env.teamSpeakPassword;
const nickname = process.env.teamSpeakNickname;

module.exports = async function() {
	const ts3 = new TeamSpeak3({
		host: host,
		username: username,
		serverport: serverPort,
		queryport: queryPort,
		password: password,
		nickname: nickname,
	});

	ts3.on('ready', async () => {
		try {
			//Retrieves a List of non Query Clients
			let clients = await ts3.clientList({ client_type: 0 });

			if (!clients) {
				return;
			}

			let clientStatsPromises = clients.map(insertStats);
			await Promise.all(clientStatsPromises);

			await ts3.logout();
		} catch (e) {
			await ts3.logout();
			debug(e);
		}
	});

	ts3.on('error', e => debug('Error', e.message));
	ts3.on('close', e => debug('Connection has been closed!', e));
};
