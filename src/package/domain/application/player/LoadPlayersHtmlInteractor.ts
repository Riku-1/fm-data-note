import {ILoadPlayersHtmlUseCase} from "../../../usecase/player/ILoadPlayersHtmlUseCase";
import {Player} from "../../model/player/Player";
import {inject, injectable} from "inversify";
import * as fs from "fs";
import {JSDOM} from "jsdom";
import {PlayerAttributeKeyNameJA} from "./PlayerAttributeKeyName";
import {PlayerAttributesHistory} from "../../model/player/PlayerAttributesHistory";
import {IPlayerRepository} from "../../model/player/IPlayerRepository";
import {REPOSITORY_TYPES} from "../../../inject_types/diConfig/repisoty_types";


@injectable()
export class LoadPlayersHtmlInteractor implements ILoadPlayersHtmlUseCase {
    private _repository: IPlayerRepository

    constructor(
        @inject(REPOSITORY_TYPES.PlayerRepository) repository
    ) {
        this._repository = repository
    }

    async handle(filePath: string): Promise<Player[]> {
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

        return Promise.all(playerAttributesList.map(async (attributes) => {
            //const player = await this._repository.find(attributes[PlayerAttributeKeyNameJA.uID])
            //console.log(player)

            const attributesHistory: PlayerAttributesHistory = {
                affiliatedTeam: attributes[PlayerAttributeKeyNameJA.affiliatedTeam]
            }

            const rawbirthDate = attributes[PlayerAttributeKeyNameJA.birthDate]

            return {
                id: attributes[PlayerAttributeKeyNameJA.uID],
                name: attributes[PlayerAttributeKeyNameJA.name],
                country: attributes[PlayerAttributeKeyNameJA.country],
                attributesHistories: [attributesHistory],
                birthDate: rawbirthDate ? this.parseToDate(rawbirthDate) : undefined
            }
        }))
    }

    private parseToDate = (dateString: string): Date => {
        const birthDateStr = dateString.match(/\d{4}\/\d{1,2}\/\d{1,2}/) // yyyy-mm-dd or yyyy-m-d
        const [year, month, day] = birthDateStr[0].split('/')
        return new Date(Number(year), Number(month), Number(day))
    }
}