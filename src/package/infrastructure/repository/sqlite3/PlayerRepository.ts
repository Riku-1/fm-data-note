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
                    INSERT INTO players (uid, name, country, birth_date)
                    SELECT ${player.id}, "${player.name}", "${player.country}", "${player.birthDate.toISOString()}"
                    WHERE NOT EXISTS(SELECT 1 FROM players WHERE uid = ${player.id})
                `, (err) => {
                    if (err) {
                        console.log(err)
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