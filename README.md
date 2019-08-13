# GreenMap API

## Environment Variables

```
COMPOSE_PROJECT_NAME="greenmap"
POSTGRES_DB=greenmap
POSTGRES_USER=postgres
POSTGRES_PASSWORD=<pass>
DB_CONNSTR=<conn_str>
REDIS_PASSWORD=<redis_password>
REDIS_URL=<redis_url>
GEOHASH_PRECISION=6
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
