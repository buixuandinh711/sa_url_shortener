import * as sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db/app.db");

db.run(`
    CREATE TABLE IF NOT EXISTS data(
    id TEXT,
    url TEXT
    ) STRICT
`);

function makeID(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function findOrigin(id: string): Promise<string | null> {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    db.get(`SELECT * FROM data WHERE id = ?`, [id], (err, res: any) => {
      if (err) {
        return reject(err.message);
      }
      resolve(res ? res.url : null);
    });
  });
}

function create(id: string, url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO data VALUES (?, ?)`, [id, url], (err) => {
      if (err) {
        return reject(err.message);
      }
      resolve(id);
    });
  });
}

async function shortUrl(url: string): Promise<string> {
  while (true) {
    const newID = makeID(5);
    const originUrl = await findOrigin(newID);
    if (originUrl === null) {
      await create(newID, url);
      return newID;
    }
  }
}

export { findOrigin, shortUrl };
