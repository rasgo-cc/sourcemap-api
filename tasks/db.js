require("dotenv").config();
const consola = require("consola");
const BB = require("bluebird");
const pg = require("pg");
BB.promisifyAll(pg);

const dbName = process.env.POSTGRES_DB;

const client = new pg.Client(
  process.env.DB_CONNSTR.replace(dbName, "postgres")
);

async function execute(str) {
  try {
    return await client.queryAsync(str);
  } catch (err) {
    return Promise.reject(err);
  }
}

function create() {
  return execute(`CREATE DATABASE ${dbName}`);
}

function drop() {
  return execute(`DROP DATABASE ${dbName}`);
}

desc("Database");
task("drop", [], { async: true }, async () => {
  return client
    .connect()
    .then(drop)
    .then(() => {
      consola.success(`database ${dbName} dropped`);
    })
    .catch(consola.error)
    .finally(() => {
      client.end();
    });
});
task("create", [], { async: true }, async () => {
  return client
    .connect()
    .then(create)
    .then(() => {
      consola.success(`database ${dbName} created`);
    })
    .catch(consola.error)
    .finally(() => {
      client.end();
    });
});
task("reset", [], async () => {
  client
    .connect()
    .then(drop)
    .then(create)
    .then(() => {
      consola.success(`database ${dbName} reset`);
    })
    .catch(consola.error)
    .finally(() => {
      client.end();
    });
});
