require('dotenv').config();

const bugSnagCode = process.env.bugsnagcode;
const bugsnag = require('@bugsnag/js');
bugsnag(bugSnagCode);

const getStats = require('./teamSpeak');

const minutes = 10;
const interval = minutes * 60 * 1000;

setInterval(async () => {
	await getStats();
}, interval);
