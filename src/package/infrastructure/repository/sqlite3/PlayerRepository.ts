import {injectable} from "inversify";
import {IPlayerRepository} from "../../../domain/model/player/IPlayerRepository";
import {Player} from "../../../domain/model/player/Player";
import {SqliteContainer} from "../../SqliteContainer";
import {PlayerFactory} from "../../../domain/model/player/PlayerFactory";
import {MyCustomDate, toYYYYMMDD} from "../../../domain/model/shared/MyCustomDate";

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

    async findByClub(clubId: number): Promise<Player[]> {
        const dbContainer = new SqliteContainer()

        const playerAttributesHistories = await dbContainer.all(`
            select * from PlayerAttributesHistories pah WHERE clubId = ${clubId} or onLoanFromClubId = ${clubId}
        `)
        dbContainer.close()

        return Promise.all(playerAttributesHistories.map(async (history) => {
            return await this.find(history.playerId)
        }))
    }


    async findByClubAt(clubId: number, belongsAt: MyCustomDate): Promise<Player[]> {
        const dbContainer = new SqliteContainer()

        const playerAttributesHistories = await dbContainer.all(`
            select * from PlayerAttributesHistories pah WHERE savedAt = ${toYYYYMMDD(belongsAt)}
                and clubId = ${clubId}
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
            INSERT INTO Players (uid, name, nation, birthDate)
            VALUES (${player.id}, "${player.name}", "${player.nation}", "${toYYYYMMDD(player.birthDate)}")
        `)

        await dbContainer.run(`
            INSERT INTO PlayerAttributesHistories (playerId, clubId, onLoanFromClubId, savedAt, homeGrownStatus)
            VALUES (
                        ${player.id},
                        "${player.attributesHistories[0].clubId}",
                        "${player.attributesHistories[0].onLoanFromClubId}",
                        "${toYYYYMMDD(player.attributesHistories[0].savedAt)}",
                        "${player.attributesHistories[0].homeGrownStatus}"
                    )
        `)

        await dbContainer.exec(`COMMIT;`)

        dbContainer.db.close()
    }
}