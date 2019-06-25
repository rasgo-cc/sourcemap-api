# GreenMap API

## Environment Variables

```
COMPOSE_PROJECT_NAME=greenmap
POSTGRES_DB=greenmap
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<password></password>
DB_CONNSTR=<connstr>
```

See `config.js` for other environment variables that might be used.

## Migrations & Seeding

```
npm i -g knex
npm i -g jake

knex migrate:latest
jake -f tasks/places.js seed
```

## Development

```
docker-compose up postgis

yarn dev
```

Open [localhost:8080]()

## Production

```
docker-compose up
```

## Documentation

Available at `/swagger`

## Other tasks

Dump and restore

```
docker exec greenmap_pg_1 pg_dump -U postgres -d greenmap -v -Fc > ./tmp/backup_local.dump
docker exec greenmap_pg_1 pg_restore --clean --no-acl --no-owner -U postgres -d greenmap -v ./tmp/backup_local.dump
```
