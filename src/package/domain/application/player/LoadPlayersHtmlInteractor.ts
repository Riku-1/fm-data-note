import {ILoadPlayersHtmlUseCase} from "../../../usecase/ILoadPlayersHtmlUseCase";
import {Player} from "../../model/player/Player";
import {injectable} from "inversify";
import * as fs from "fs";
import {JSDOM} from "jsdom";
import {PlayerAttributeKeyNameJA} from "./PlayerAttributeKeyName";

@injectable()
export class LoadPlayersHtmlInteractor implements ILoadPlayersHtmlUseCase {
    handle(filePath: string): Player[] {
        const contentStr = fs.readFileSync(filePath, "utf8")

        const dom = new JSDOM(contentStr)
        const document = dom.window.document

        const rows = document.querySelectorAll("table tr")

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

        return playerAttributesList.map(attributes => {
            return {
                name: attributes[PlayerAttributeKeyNameJA.name],
                id: attributes[PlayerAttributeKeyNameJA.uID],
            }
        })
    }
}