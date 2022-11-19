import { getDb } from "../db";

const db = getDb();

db.ref.serialize(() => {
  db.ref.run("CREATE TABLE store(ulid TEXT, key TEXT, value TEXT);");
});

db.close();
