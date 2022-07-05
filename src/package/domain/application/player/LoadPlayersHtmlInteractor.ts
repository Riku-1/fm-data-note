import {ILoadPlayersHtmlUseCase} from "../../../usecase/player/ILoadPlayersHtmlUseCase";
import {inject, injectable} from "inversify";
import * as fs from "fs";
import {JSDOM} from "jsdom";
import {PlayerAttributeKeyNameJA} from "./PlayerAttributeKeyName";
import {IPlayerRepository} from "../../model/player/IPlayerRepository";
import {REPOSITORY_TYPES} from "../../../inject_types/diConfig/repisoty_types";
import {CurrentPlayer} from "./CurrentPlayer";
import {IClubRepository} from "../../model/club/IClubRepository";
import {getClubFromTrivialName} from "../../model/club/Club";
import {MyCustomDate} from "../../model/shared/MyCustomDate";


@injectable()
export class LoadPlayersHtmlInteractor implements ILoadPlayersHtmlUseCase {
    private _repository: IPlayerRepository
    private _clubRepository: IClubRepository

    constructor(
        @inject(REPOSITORY_TYPES.PlayerRepository) repository,
        @inject(REPOSITORY_TYPES.ClubRepository) clubRepository,
    ) {
        this._repository = repository
        this._clubRepository = clubRepository
    }

    async handle(filePath: string): Promise<CurrentPlayer[]> {
        // read file
        const contentStr = fs.readFileSync(filePath, "utf8")
        const document = new JSDOM(contentStr).window.document
        const rows = document.querySelectorAll("table tr")

        // parse
        let keyNames = []
        const thElms = rows[0].querySelectorAll("th")
        thElms.forEach(elm => {
            keyNames.push(elm.textContent)
        })

        const playerAttributesList = []
        rows.forEach(row => {
            const playerAttributes = {}
            const tdElms = row.querySelectorAll("td")
            tdElms.forEach((tdElm, index) => {
                playerAttributes[keyNames[index]] = tdElm.textContent
            })

            if (playerAttributes[PlayerAttributeKeyNameJA.uID]) {
                // たまに空のtdがあるのでidが取得できる場合のみ正常とみなしてlistに突っ込む
                playerAttributesList.push(playerAttributes)
            }
        })

        const clubs = await this._clubRepository.findAll()

        return Promise.all(playerAttributesList.map(async (attributes) => {
            const rawBirthDate = attributes[PlayerAttributeKeyNameJA.birthDate]
            const clubTrivialName = attributes[PlayerAttributeKeyNameJA.club];
            const loanFromClubTrivialName = attributes[PlayerAttributeKeyNameJA.onLoanFrom];

            return {
                id: attributes[PlayerAttributeKeyNameJA.uID],
                name: attributes[PlayerAttributeKeyNameJA.name],
                nation: attributes[PlayerAttributeKeyNameJA.nation],
                currentClub: clubTrivialName,
                currentClubId: getClubFromTrivialName(clubTrivialName, clubs)[0]?.id ?? null,
                currentLoanFrom: loanFromClubTrivialName,
                currentLoanFromId: getClubFromTrivialName(loanFromClubTrivialName, clubs)[0]?.id ?? null,
                birthDate: this.parseToDate(rawBirthDate),
            }
        }))
    }

    private parseToDate = (dateString: string): MyCustomDate => {
        const birthDateStr = dateString.match(/\d{4}\/\d{1,2}\/\d{1,2}/) // yyyy-mm-dd or yyyy-m-d
        const [year, month, day] = birthDateStr[0].split('/')

        return {
            year: Number(year),
            month: Number(month),
            day: Number(day),
        }
    }
}