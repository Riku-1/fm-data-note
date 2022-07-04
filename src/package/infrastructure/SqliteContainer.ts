import sqlite3 from "sqlite3";
import path from "path";
import {injectable} from "inversify";

@injectable()
export class SqliteContainer {
    public readonly db: sqlite3.Database

    public constructor() {
        const sqlite = sqlite3.verbose()
        const USER_DATA_DIR = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")
        const DB_PATH = path.join(USER_DATA_DIR, 'fm-data-note', 'fm.db')
        this.db = new sqlite.Database(DB_PATH)
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