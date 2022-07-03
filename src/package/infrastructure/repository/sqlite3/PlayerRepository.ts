import {injectable} from "inversify";
import {IPlayerRepository} from "../../../domain/model/player/IPlayerRepository";
import {Player} from "../../../domain/model/player/Player";
import {SqliteContainer} from "../../SqliteContainer";

@injectable()
export class PlayerRepository implements IPlayerRepository {

    find(id: number): Promise<Player | null> {
        return Promise.resolve(undefined);
    }

    async save(player: Player): Promise<void> {
        const dbContainer = new SqliteContainer()

        return new Promise((resolve, reject) => {
            dbContainer.db.serialize(() => {
                dbContainer.db.run(`
                    INSERT OR IGNORE INTO players (uid, name, country)
                    VALUES (${player.id}, "${player.name}", "${player.country}")
                `, (err) => {
                    if (err) {
                        reject(err)
                        return
                    } else {
                        resolve()
                    }
                })
            })
        })
    }
}