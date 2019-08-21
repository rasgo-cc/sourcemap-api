# GreenMap API

## Environment Variables

```
COMPOSE_PROJECT_NAME="greenmap"
POSTGRES_DB=greenmap
POSTGRES_USER=postgres
POSTGRES_PASSWORD=
DB_CONNSTR=
REDIS_PASSWORD=
REDIS_URL=
GEOHASH_PRECISION=6
SENDGRID_API_KEY=
GOOGLE_AUTH_CLIENT_ID=
GOOGLE_AUTH_SECRET=
FACEBOOK_AUTH_APP_ID=
FACEBOOK_AUTH_APP_SECRET=
```

See `config.js` for other environment variables that might be used.

## Migrations & Seeding

```
npm i -g knex
npm i -g jake

knex migrate:latest
jake -f tasks/seed.js places
```

## Development

```
npm i -g eslint
npm i -g nodemon
npm i -g pino-pretty
docker-compose up pg
docker-compose up redis

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

Dump and restore DB

```
docker exec greenmap_pg_1 pg_dump -U postgres -d greenmap -v -Fc > ./tmp/db.dump

docker cp ./tmp/db.dump greenmap_pg_1:/tmp
docker exec -it greenmap_pg_1 bash
pg_restore --clean --no-acl --no-owner -U postgres -d greenmap -v /tmp/db.dump

pg_restore --clean --no-acl --no-owner -h 192.168.99.100 -U postgres -d greenmap -v .\tmp\db.dump
```
