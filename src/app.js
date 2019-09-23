require('dotenv').config();
var cron = require('node-cron');
const debug = require('debug')('teamSpeakStats');

const bugSnagCode = process.env.bugsnagcode
let bugsnagClient;
if (bugSnagCode) {
	const bugsnag = require('@bugsnag/js')
	bugsnagClient = bugsnag(bugSnagCode)
}


const getStats = require('./teamSpeak');

debug('Starting');

cron.schedule('*/10 * * * *', async () => {
	try {
		await getStats();
	} catch (error) {
		if (bugSnagCode) {
			bugsnagClient.notify(error)
		}
		debug.log(error);
	}
});
