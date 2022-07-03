import {injectable} from "inversify";
import {IPlayerRepository} from "../../../domain/model/player/IPlayerRepository";
import {Player} from "../../../domain/model/player/Player";
import {SqliteContainer} from "../../SqliteContainer";
import {PlayerFactory} from "../../../domain/model/player/PlayerFactory";

@injectable()
export class PlayerRepository implements IPlayerRepository {
    private _factory = new PlayerFactory()

    async find(id: number): Promise<Player | null> {
        const dbContainer = new SqliteContainer()

        const playerRow = await dbContainer.get(`
            SELECT * FROM Players WHERE uid = ${id};
        `)

        if (!playerRow) {
            return null
        }

        const playerAttributesHistoryRows: any[] = await dbContainer.all(`
            SELECT * FROM PlayerAttributesHistories WHERE playerId = ${id} ORDER BY savedAt DESC;
        `)

        dbContainer.close()

        return this._factory.fromRepository(playerRow, playerAttributesHistoryRows)
    }


    async findByClub(club: string, belongsAt: Date): Promise<Player[]> {
        const dbContainer = new SqliteContainer()

        const nextDate = new Date()
        nextDate.setDate(belongsAt.getDate() + 1)

        const playerAttributesHistories = await dbContainer.all(`
            select * from PlayerAttributesHistories pah WHERE savedAt >= "${belongsAt.toISOString().split('T')[0]}" and savedAt < "${nextDate.toDateString().split(('T')[0])}"
        `)
        dbContainer.close()

        return Promise.all(playerAttributesHistories.map(async (history) => {
            return await this.find(history.playerId)
        }))
    }

    async save(player: Player): Promise<void> {
        const dbContainer = new SqliteContainer()

        await dbContainer.exec(`BEGIN;`)

        await dbContainer.run(`
            INSERT INTO Players (uid, name, country, birthDate)
            VALUES (${player.id}, "${player.name}", "${player.country}", "${player.birthDate.toISOString()}")
        `)

        await dbContainer.run(`
            INSERT INTO PlayerAttributesHistories (playerId, club, onLoanFrom, savedAt)
            VALUES (${player.id}, "${player.attributesHistories[0].club}", "${player.attributesHistories[0].onLoanFrom}", "${player.attributesHistories[0].savedAt.toISOString()}")
        `)

        await dbContainer.exec(`COMMIT;`)

        dbContainer.db.close()
    }
}