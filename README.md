# TeamSpeakStats

Adds teamspeak stats to a postgres database every 10 mins.

Requires a `.env` file in the following format:

```
teamSpeakHost=192.168.1.2
teamSpeakQueryPort=10011
teamSpeakServerPort=9987
teamSpeakUsername=QueryUser
teamSpeakPassword=fafsdfisaf2435
teamSpeakNickname=QueryUser
dataBaseURI=postgresql://dbUserNaME:dBPassword@host:port/database
DEBUG=teamSpeakStats,teamSpeakStats-wrapper
DEBUG_DEPTH=99
```

Create table query

```
create table if not exists public.logs
(
	timestamp timestamp with time zone,
	id varchar(32767),
	channelid integer,
	away boolean,
	totalconnectioncount integer,
	lastconnected timestamp with time zone,
	isrecording boolean,
	outputonlymuted boolean,
	outputmuted boolean,
	platform varchar(32767),
	connectionip inet,
	databaseid integer,
	nickname varchar(32767),
	inputmuted boolean,
	idletime time,
	connectiontime time
);
```

Insert into table

```
INSERT INTO public.logs
(
	timestamp,
	idleTime,
	connectionTime,
	connectionip,
	nickname,
	channelid,
	databaseid,
	away,
	isrecording,
	inputmuted,
	platform,
	id,
	totalconnectioncount,
	outputonlymuted,
	outputmuted,
	lastconnected
)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)'
```
