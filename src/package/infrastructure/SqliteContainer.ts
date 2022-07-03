import sqlite3 from "sqlite3";
import path from "path";
import {IDBContainer} from "../domain/application/IDBContainer";
import {injectable} from "inversify";

@injectable()
export class SqliteContainer implements IDBContainer {
    public readonly db: sqlite3.Database

    public constructor() {
        const sqlite = sqlite3.verbose()
        const USER_DATA_DIR = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")
        const DB_PATH = path.join(USER_DATA_DIR, 'fm-data-note', 'fm.db')
        this.db = new sqlite.Database(DB_PATH)
    }

    public async initialize(): Promise<void> {
        // TODO: change to migration
        this.db.serialize(() => {
            this.db.run('BEGIN;')
            this.db.run(`
                CREATE TABLE IF NOT EXISTS players (
                    uid integer,
                    name VARCHAR(255),
                    country VARCHAR(10)
                );
            `);

            this.db.run(`CREATE UNIQUE INDEX IF NOT EXISTS uid_index ON players(uid);`)
            this.db.run('COMMIT;')
        })
        this.close();
    }

    private close() {
        this.db.close(err => {
            if (err) {
                return console.log('Failed to close DB', err);
            }
        });
    }
}