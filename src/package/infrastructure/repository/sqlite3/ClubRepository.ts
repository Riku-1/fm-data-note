import {IClubRepository} from "../../../domain/model/club/IClubRepository";
import {Club} from "../../../domain/model/club/Club";
import {SqliteContainer} from "../../SqliteContainer";
import {injectable} from "inversify";

@injectable()
export class ClubRepository implements IClubRepository {
    async findAll(): Promise<Club[]> {
        const dbContainer = new SqliteContainer()

        const clubs = await dbContainer.all(`
            select * from Clubs
        `)
        dbContainer.close()

        return clubs.map((club) => {
            return {
                id: club.uid,
                name: club.name,
                trivialName: club.trivialName,
                nation: club.nation,
            }
        })
    }

    async save(club: Club): Promise<void> {
        const dbContainer = new SqliteContainer()

        await dbContainer.run(`
            INSERT INTO Clubs (uid, name, trivialName, nation)
            VALUES (${club.id}, "${club.name}", "${club.trivialName}", "${club.nation}")
        `)

        dbContainer.db.close()
    }
}