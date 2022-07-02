import {Player} from "../package/domain/model/player/Player";

export interface IElectronAPI {
  loadPlayersFile: () => Promise<Player[]>
  savePlayers: (players: Player[]) => Promise<void>
}

declare global {
  interface Window {
    exposedAPI: IElectronAPI
  }
}
