require('dotenv').config();
var cron = require('node-cron');
const debug = require('debug')('teamSpeakStats');

const getStats = require('./teamSpeak');

debug('Starting');

cron.schedule('*/10 * * * *', async () => {
	try {
		await getStats();
	} catch (error) {
		debug(error);
	}
});
