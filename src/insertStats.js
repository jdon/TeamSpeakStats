const { Pool } = require('pg');
const moment = require('moment');

const connectionString = process.env.dataBaseURI;

const pool = new Pool({
	connectionString: connectionString,
});

const insertStatsQuery =
	'INSERT INTO public.logs(' +
	'timestamp,' +
	'idleTime,' +
	'connectionTime,' +
	'connectionip,' +
	'nickname,' +
	'channelid,' +
	'databaseid,' +
	'away,' +
	'isrecording,' +
	'inputmuted,' +
	'platform,' +
	'id,' +
	'totalconnectioncount,' +
	'outputonlymuted,' +
	'outputmuted,' +
	'lastconnected' +
	')' +
	'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)';

const insertStats = async client => {
	let clientInfo = await client.getInfo();
	const values = [
		moment().format(), //timestamp
		getDateString(clientInfo.client_idle_time), //idleTime
		getDateString(clientInfo.connection_connected_time), //connectionTime
		clientInfo.connection_client_ip, //connectionip
		clientInfo.client_nickname, //nickname
		clientInfo.cid, //channelid
		clientInfo.client_database_id, //databaseid
		clientInfo.client_away, //away
		clientInfo.client_is_recording, //isrecording
		clientInfo.client_input_muted, //inputmuted
		clientInfo.client_platform, //platform
		clientInfo.client_unique_identifier, //id
		clientInfo.client_totalconnections, // totalconnectionCount
		clientInfo.client_outputonly_muted, // outputonlymuted
		clientInfo.client_output_muted, //outputmuted
		moment(clientInfo.client_lastconnected * 1000).format(), //lastconnected
	];
	return pool.query(insertStatsQuery, values);
};

const getDateString = time => {
	let seconds = parseInt((time / 1000) % 60);
	let minutes = parseInt((time / (1000 * 60)) % 60);
	let hours = parseInt((time / (1000 * 60 * 60)) % 24);

	hours = hours < 10 ? '0' + hours : hours;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	seconds = seconds < 10 ? '0' + seconds : seconds;

	return hours + ':' + minutes + ':' + seconds;
};

module.exports = insertStats;
