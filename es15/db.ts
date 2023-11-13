import pgPromise from "pg-promise";

const db = pgPromise()("postgres://postgres:postgres@localhost:5432/es-node");
const setupDb = async () => {
  await db.none(`
  
  DROP TABLE IF EXISTS users;

  CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    token TEXT
  )`);
  await db.none(
    `INSERT INTO users (username, password) VALUES ('Lorenzo','Cazzato')`
  );
};

setupDb();

export { db };
