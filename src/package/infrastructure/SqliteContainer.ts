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

            // players
            this.db.run(`
                CREATE TABLE IF NOT EXISTS Players (
                    uid BIGINT not null,
                    name VARCHAR(255) not null,
                    country VARCHAR(10),
                    birthDate TEXT not null
                );
            `);
            this.db.run(`CREATE UNIQUE INDEX IF NOT EXISTS playersUidIndex ON Players(uid);`)

            // player_attribute_histories
            this.db.run(`
                CREATE TABLE IF NOT EXISTS PlayerAttributesHistories (
                    playerId BIGINT not null,
                    club VARCHAR(50),
                    onLoanFrom VARCHAR(50),
                    savedAt TEXT not null,
                    
                    CONSTRAINT fkPlayerId
                        FOREIGN KEY (playerId)
                        REFERENCES players(uid)
                );
            `);

            this.db.run(`CREATE UNIQUE INDEX IF NOT EXISTS playerAttributeHistoriesPlayerIdIndex ON players(uid);`)

            this.db.run('COMMIT;')
        })
        this.close();
    }

    public async get(sql): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.get(sql, (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row);
                }
            });
        });
    }

    public async all(sql): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.db.all(sql, (err, rows: []) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows);
                }
            });
        });
    }

    public async run(sql) {
        return new Promise<void>((resolve, reject) => {
            this.db.run(sql, (err) => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }


    public async exec(sql) {
        return new Promise<void>((resolve, reject) => {
            this.db.exec(sql, (err) => {
                if (err) {
                    reject(err);
                }

                resolve();
            });
        });
    }

    public close() {
        this.db.close(err => {
            if (err) {
                return console.log('Failed to close DB', err);
            }
        });
    }

}