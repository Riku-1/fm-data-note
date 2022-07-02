import path from "path";
import Nedb from "nedb";

export class NeDBContainer {
    // HACK: Better to move to another class
    private static USER_DATA_DIR = process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share")
    private static saveDir = path.join(NeDBContainer.USER_DATA_DIR, "fm-data-note")

    private static instance: NeDBContainer

    public player: Nedb

    private constructor(playerDB: Nedb) {
        this.player = playerDB
    }

    private static async loadDataBase(): Promise<Nedb> {
        const playerDB = new Nedb({filename: path.join(NeDBContainer.saveDir, 'player.db')});
        await playerDB.loadDatabase()

        return playerDB
    }

    public static async getInstance (): Promise<NeDBContainer> {
        if (!NeDBContainer.instance) {
            const db = await this.loadDataBase()
            NeDBContainer.instance = new NeDBContainer(db)
        }

        return NeDBContainer.instance
    }
}